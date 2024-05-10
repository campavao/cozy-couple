"use server";
import { constants } from "../constants";
import { getUserId } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Button } from "@/components/ui/button";

export default async function SubscriptionPage() {
  const userId = await getUserId();

  return (
    <TemplatePage title='Subscribe'>
      <div className='p-4'>
        <h2>Manage your couch flipping business with ease!</h2>
        <p>
          Subscribe to FlipTrack and get access to powerful tools for managing
          deliveries, pickups, inventory, and route planning.
        </p>
        <br />
        <h2>What&apos;s included:</h2>
        <p>Manage deliveries and pickups</p>
        <p>Track inventory</p>
        <p>Advanced analytics</p>
        <p>Route optimization tools</p>
        <p>Priority support</p>
        <br />
        <Button>
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
