"use server";
import { constants } from "../constants";
import { getMaybeUserId } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { Login } from "../components/Login";

export default async function SubscriptionPage() {
  const userId = await getMaybeUserId();

  return (
    <TemplatePage title='Subscribe'>
      <div className='p-4 flex flex-col gap-4'>
        <h2>Manage your couch flipping business with ease!</h2>
        <p>
          Subscribe to FlipTrack and get access to powerful tools for managing
          deliveries, pickups, inventory, and route planning.
        </p>
        <br />
        <h2>What&apos;s included:</h2>
        <div className='self-center text-center rounded-lg p-4 shadow-flat shadow-lighter-blue'>
          <strong className='text-[32px]'>$20 / month</strong>
          <ul>
            <li className='flex items-center gap-2'>
              <CheckIcon color='green' size={18} /> Manage deliveries and
              pickups
            </li>
            <li className='flex items-center gap-2'>
              <CheckIcon color='green' size={18} /> Track inventory
            </li>
            <li className='flex items-center gap-2'>
              <CheckIcon color='green' size={18} /> Advanced analytics
            </li>
            <li className='flex items-center gap-2'>
              <CheckIcon color='green' size={18} /> Route optimization tools
            </li>
            <li className='flex items-center gap-2'>
              <CheckIcon color='green' size={18} /> Priority support
            </li>
            <li className='flex items-center gap-2'>
              <CheckIcon color='green' size={18} /> 7-day free trial
            </li>
          </ul>
        </div>
        <br />

        {userId ? (
          <Button className='self-center'>
            <a
              className='text-center w-full'
              href={`${constants.checkout}?client_reference_id=${userId}`}
            >
              Checkout
            </a>
          </Button>
        ) : (
          <Login className='self-center' signInText='Login to purchase' />
        )}
      </div>
    </TemplatePage>
  );
}
