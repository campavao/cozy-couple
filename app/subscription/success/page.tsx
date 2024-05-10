import { TemplatePage } from "@/app/components/template-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <TemplatePage title='Subscription successful!'>
      <div className='flex flex-col items-center gap-4 p-4'>
        <div>You&apos;re payment was successful!</div>
        <Button>
          <Link href='/'>Add a delivery to get started</Link>
        </Button>
      </div>
    </TemplatePage>
  );
}
