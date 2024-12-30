import { Input } from "../components/input";
import { TemplatePage } from "../components/template-page";
import { Textarea } from "../components/textarea";

import * as sg from "@sendgrid/mail";
import { RedirectType, redirect } from "next/navigation";
import { getMaybeUserId } from "../api/apiUtils";
import { upsertDocument } from "../api/firebase/upsertDocument";
import { SubmitButton } from "../components/SubmitButton";
import { constants } from "../constants";

sg.setApiKey(process.env.SENDGRID_API_KEY ?? "");

export default async function ContactForm() {
  const userId = await getMaybeUserId();
  async function onFormSubmit(formData: FormData) {
    "use server";

    const isBot = formData.get("is-bot") === "on";

    if (isBot) {
      console.log("Bot detected");
      return;
    }

    const rawFormData: Nullable<ContactForm> = {
      userId: userId ?? "Unknown",
      submitted: new Date(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("topic") as string,
      text: formData.get("info") as string,
    };

    if (isValid(rawFormData)) {
      await upsertDocument("contact", rawFormData);

      try {
        await sg.send({
          to: constants.supportEmail,
          from: constants.supportEmail,
          replyTo: rawFormData.email,
          subject: `FlipTrack Support - ${rawFormData.subject}`,
          text: `
          ${rawFormData.text}
          \n
          From, \n
          ${rawFormData.email}
          `,
        });
      } catch (err) {
        console.warn("Sendgrid failed: ", {
          error: err,
          body: (err as any)?.response?.body?.errors,
        });
      }
    }

    redirect("/contact/submitted", RedirectType.replace);
  }
  return (
    <TemplatePage isWhiteBg title='Contact us'>
      <form action={onFormSubmit} className='py-4 flex flex-col gap-4'>
        <Input label='Name' name='name' required />
        <Input label='Email' name='email' type='email' required />
        <Input label='Topic' required name='topic' />
        <input name='is-bot' type='checkbox' className='hidden' />
        <Textarea
          label='Describe your issue'
          required
          maxLength={500}
          name='info'
        />
        <SubmitButton />
      </form>
    </TemplatePage>
  );
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  text: string;
  submitted: Date;
  userId: string;
}

type Nullable<T> = T | null;

function isValid(form: Nullable<ContactForm>): form is ContactForm {
  return (
    form?.name != null &&
    form?.email != null &&
    form?.subject != null &&
    form?.text != null
  );
}
