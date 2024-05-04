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
import { formatDateForInput } from "../utils/utils";
import { Create } from "./create";
import { DeleteButton } from "./delete-button";
import { ImageCarousel } from "../components/image-carousel";
import { LoadingImage } from "../components/image";

export function DeliveryDisplay({ delivery }: { delivery: Delivery }) {
  const firstImage = delivery.images?.find((img) => !img.includes(".mp4"));

  return (
    <Drawer>
      <DrawerTrigger className='w-full'>
        <div className='flex gap-2'>
          {firstImage && (
            <LoadingImage
              containerClassName='w-12 h-full rounded-lg overflow-hidden'
              className='w-full h-full rounded-lg object-center object-cover'
              src={firstImage}
              alt=''
              width={100}
              height={100}
            />
          )}
          <div className='flex flex-col gap-1 text-left'>
            <div className='flex md:flex-row flex-col underline'>
              {delivery.deliveryWindow.from} - {delivery.deliveryWindow.to}
            </div>
            <div>
              {delivery.address}, {delivery.name}
            </div>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className='flex flex-col w-full items-center overflow-hidden h-[90vh]'>
        <DrawerHeader className='relative w-full max-w-md'>
          <DrawerTitle className='text-center'>Delivery</DrawerTitle>
          <Create
            className='absolute top-0 right-4'
            label='Edit'
            existingDelivery={delivery}
          />
        </DrawerHeader>
        <div className='flex flex-col items-center w-full overflow-auto h-min'>
          <div className='flex flex-col gap-2 w-full max-w-md p-6'>
            <p>
              <strong>Address:</strong>{" "}
              <a href={`maps://?q=${delivery.address}`}>{delivery.address}</a>
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
                ? formatDateForInput(new Date(delivery.deliveryDate))
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
            {delivery.images?.length > 0 && (
              <div className='flex items-center justify-center'>
                <ImageCarousel urls={delivery.images} />
              </div>
            )}
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
