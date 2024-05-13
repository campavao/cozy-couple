import { Input } from "../components/input";
import { TemplatePage } from "../components/template-page";
import { Textarea } from "../components/textarea";

import * as sg from "@sendgrid/mail";
import { constants } from "../constants";
import { SubmitButton } from "../components/SubmitButton";
import { upsertDocument } from "../api/firebase/upsertDocument";
import { getUserId } from "../api/apiUtils";
import { RedirectType, redirect } from "next/navigation";

sg.setApiKey(process.env.SENDGRID_API_KEY ?? "");

export default async function ContactForm() {
  const userId = await getUserId();
  async function onFormSubmit(formData: FormData) {
    "use server";

    const rawFormData: Nullable<ContactForm> = {
      userId,
      submitted: new Date(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("topic") as string,
      text: formData.get("info") as string,
    };

    await upsertDocument("contact", rawFormData);

    if (isValid(rawFormData)) {
      try {
        await sg.send({
          to: constants.supportEmail,
          from: constants.supportEmail,
          subject: `${rawFormData.email} - ${rawFormData.subject}`,
          text: rawFormData.text,
        });
      } catch (err) {
        console.warn("Sendgrid failed: ", err);
      }
    }

    redirect("/contact/submitted", RedirectType.replace);
  }
  return (
    <TemplatePage title='Contact us'>
      <form action={onFormSubmit} className='py-4 flex flex-col gap-4'>
        <Input label='Name' name='name' required />
        <Input label='Email' name='email' type='email' required />
        <Input label='Topic' required name='topic' />
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
