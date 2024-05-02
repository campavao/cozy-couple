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
import { CopyButton } from "./copy-button";
import { formatDate } from "../utils/utils";
import { Create } from "./create";
import { DeleteButton } from "./delete-button";

export function DeliveryDisplay({ delivery }: { delivery: Delivery }) {
  let display = `${delivery.name}, ${delivery.address}`;
  if (delivery.deliveryDate != null && delivery.deliveryDate != "") {
    display = `${formatDate(new Date(delivery.deliveryDate))}, ${
      delivery.name
    }`;
  }
  return (
    <Drawer>
      <DrawerTrigger>
        <div>
          <div className='flex gap-2'>
            <span className='underline'>
              {formatDate(new Date(delivery.deliveryDate))}
            </span>
            <span>
              {delivery.deliveryWindow &&
                `${delivery.deliveryWindow.from} - ${delivery.deliveryWindow.to}`}
            </span>
          </div>
          <div className='flex gap-4'>
            {delivery.address}, {delivery.name}
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className='flex flex-col w-full items-center'>
        <DrawerHeader className='relative w-full max-w-md'>
          <DrawerTitle className='text-center'>Delivery</DrawerTitle>
          <Create
            className='absolute top-0 right-4'
            label='Edit'
            existingDelivery={delivery}
          />
        </DrawerHeader>
        <div className='flex flex-col items-center w-full'>
          <div className='flex flex-col gap-2 w-full max-w-md p-6'>
            <p>
              <strong>Address:</strong> <CopyButton text={delivery.address} />
            </p>
            <a href={`tel:${delivery.phone}`} type='tel'>
              <strong>Phone:</strong> {delivery.phone ?? "None"}
            </a>
            <p>
              <strong>Name:</strong> {delivery.name ?? "None"}
            </p>
            <p>
              <strong>Delivery Date:</strong>{" "}
              {delivery.deliveryDate != null && delivery.deliveryDate != ""
                ? formatDate(new Date(delivery.deliveryDate))
                : "None"}
            </p>
            {delivery.deliveryWindow && (
              <p>
                <strong>Delivery Window:</strong> {delivery.deliveryWindow.from}{" "}
                - {delivery.deliveryWindow.to}
              </p>
            )}
            <CopyButton text={delivery.description} />
            <p>
              <strong>Amount:</strong> ${delivery.amount ?? 0}
            </p>
            <p>
              <strong>Source:</strong> {delivery.source ?? "None"}
            </p>
          </div>
        </div>
        <DrawerFooter>
          <DeleteButton id={delivery.id} />
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
