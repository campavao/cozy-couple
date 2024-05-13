import { BackButton } from "@/app/components/BackButton";
import { TemplatePage } from "@/app/components/template-page";
import { constants } from "@/app/constants";
import Link from "next/link";

export default function SubmittedPage() {
  return (
    <TemplatePage title='Thanks for submitting'>
      <div className='py-4 flex flex-col gap-4'>
        <p className='text-xl'>
          Please allow me some time to look into your issue and respond.
        </p>
        <p className='text-lg'>
          If you need to send along any images or videos of your issue, feel
          free to email me directly at{" "}
          <a className='underline' href={`mail:${constants.supportEmail}`}>
            {constants.supportEmail}
          </a>
          .
        </p>
        <Link className='font-bold text-center' href='/'>
          Go back home
        </Link>
      </div>
    </TemplatePage>
  );
}
