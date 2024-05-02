import { Delivery, Pickup } from "../types/types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CopyButton } from "./copy-button";
import { formatDate } from "../utils/utils";
import { Create } from "./create";
import { DeleteButton } from "./delete-button";

export function PickupDisplay({ pickup }: { pickup: Pickup }) {
  return (
    <Drawer>
      <DrawerTrigger>
        {formatDate(new Date(pickup.pickupDate))}, {pickup.source}
      </DrawerTrigger>
      <DrawerContent className='flex flex-col w-full items-center'>
        <DrawerHeader className='relative w-full max-w-md'>
          <DrawerTitle className='text-center'>Delivery</DrawerTitle>
          <Create
            className='absolute top-0 right-4'
            label='Edit'
            existingPickup={pickup}
          />
        </DrawerHeader>
        <div className='flex flex-col items-center w-full'>
          <div className='flex flex-col gap-2 w-full max-w-md p-6'>
            <a
              href={"https://" + pickup.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              <strong>Link:</strong> {pickup.link ?? "None"}
            </a>
            <p>
              <strong>Pickup Date:</strong>{" "}
              {pickup.pickupDate != null && pickup.pickupDate != ""
                ? formatDate(new Date(pickup.pickupDate))
                : "None"}
            </p>

            <CopyButton text={pickup.description} />
            <p>
              <strong>Amount:</strong> ${pickup.amount ?? 0}
            </p>
            <p>
              <strong>Source:</strong> {pickup.source ?? "None"}
            </p>
          </div>
        </div>
        <DrawerFooter>
          <DeleteButton id={pickup.id} />
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
