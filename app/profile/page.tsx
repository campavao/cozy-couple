import Link from "next/link";
import { Footer } from "../components/Footer";
import { TemplatePage } from "../components/template-page";
import { redirect } from "next/navigation";
import { isUserSubscribed } from "../api/apiUtils";
import { constants } from "../constants";
import { Login } from "../components/Login";

export default async function Profile() {
  const isSubscribed = await isUserSubscribed();

  if (!isSubscribed && process.env.SUBSCRIBE_STATUS === "force") {
    redirect("/subscription");
  }

  return (
    <TemplatePage title='Profile'>
      <div className='w-full flex flex-col gap-4 justify-center items-center pt-4'>
        {!isSubscribed ? (
          <Link href='/subscription'>Subscribe</Link>
        ) : (
          <a href={constants.manageSubscription}>Manage subscription</a>
        )}
        <Login isSignout />
      </div>
      <Footer />
    </TemplatePage>
  );
}
