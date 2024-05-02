import { Button } from "@/components/ui/button";

import { Delivery } from "../types/types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function DeliveryDisplay({ delivery }: { delivery: Delivery }) {
  return (
    <Drawer>
      <DrawerTrigger>
        {delivery.name}, {delivery.address}
      </DrawerTrigger>
      <DrawerContent className='flex flex-col w-full items-center'>
        <DrawerHeader>
          <DrawerTitle>Delivery</DrawerTitle>
        </DrawerHeader>
        <div className='flex flex-col items-center w-full'>
          <div className='flex flex-col gap-2 w-full max-w-md p-6'>
            <p>
              <strong>Address:</strong> {delivery.address}
            </p>
            <a href={`tel:+${delivery.phone}`} type='tel'>
              <strong>Phone:</strong> {delivery.phone ?? "None"}
            </a>
            <p>
              <strong>Name:</strong> {delivery.name ?? "None"}
            </p>
            <p>
              <strong>Delivery Date:</strong> {delivery.deliveryDate ?? "None"}
            </p>
            <p>{delivery.description}</p>
            <p>
              <strong>Amount:</strong> ${delivery.amount ?? 0}
            </p>
            <p>
              <strong>Source:</strong> {delivery.source ?? "None"}
            </p>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant='secondary'>close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
