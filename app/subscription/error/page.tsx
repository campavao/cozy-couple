import { TemplatePage } from "@/app/components/template-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <TemplatePage title='Subscription unsuccessful'>
      <div className='flex flex-col items-center gap-4 p-4'>
        <div>
          There was an error processing your payment. Please wait a minute and
          try again.
        </div>
        <Button>
          <Link href='/subscription'>Go back</Link>
        </Button>
      </div>
    </TemplatePage>
  );
}
