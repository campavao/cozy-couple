import Link from "next/link";
import { Footer } from "../components/Footer";
import { TemplatePage } from "../components/template-page";
import { isUserSubscribed } from "../api/apiUtils";
import { constants } from "../constants";
import { Login } from "../components/Login";

export default async function Profile() {
  const isSubscribed = await isUserSubscribed();

  return (
    <TemplatePage isWhiteBg title='Profile'>
      <div className='w-full flex flex-col gap-4 justify-center items-center pt-4'>
        {isSubscribed == null ? (
          <Link href='/subscription'>Subscribe</Link>
        ) : (
          <>
            {!isSubscribed && (
              <div className='text-red-500'>
                We had an error processing your payment, please update payment
                details to continue using FlipTrack.
              </div>
            )}
            <a href={constants.manageSubscription}>Manage subscription</a>
          </>
        )}
        <Login isSignout />
      </div>
      <Footer />
    </TemplatePage>
  );
}
