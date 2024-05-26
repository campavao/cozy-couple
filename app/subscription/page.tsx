"use server";
import { constants } from "../constants";
import { getUserId } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

export default async function SubscriptionPage() {
  const userId = await getUserId();

  return (
    <TemplatePage title='Subscribe'>
      <div className='p-4 flex flex-col'>
        <h2>Manage your couch flipping business with ease!</h2>
        <p>
          Subscribe to FlipTrack and get access to powerful tools for managing
          deliveries, pickups, inventory, and route planning.
        </p>
        <br />
        <h2>What&apos;s included:</h2>
        <ul>
          <li className='flex items-center gap-2'>
            <CheckIcon color='green' size={18} /> Manage deliveries and pickups
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
        </ul>
        <br />
        <Button className='self-center'>
          <a
            className='text-center w-full'
            href={`${constants.checkout}?client_reference_id=${userId}`}
          >
            Checkout
          </a>
        </Button>
      </div>
    </TemplatePage>
  );
}
