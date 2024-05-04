import { Pickup } from "../types/types";
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
import { formatDate, formatDateForInput } from "../utils/utils";
import { Create } from "./create";
import { DeleteButton } from "./delete-button";
import { ImageCarousel } from "../components/image-carousel";
import { LoadingImage } from "../components/image";

export function PickupDisplay({ pickup }: { pickup: Pickup }) {
  const firstImage = pickup.images.find((img) => !img.includes(".mp4"));
  return (
    <Drawer>
      <DrawerTrigger>
        <div className='flex gap-3'>
          {firstImage && (
            <LoadingImage
              containerClassName='w-12 h-12 rounded-lg overflow-hidden'
              className='w-full h-full rounded-lg object-center object-cover'
              src={firstImage}
              alt=''
              width={100}
              height={100}
            />
          )}
          <span>
            {formatDate(new Date(pickup.pickupDate))}, {pickup.source}
          </span>
        </div>
      </DrawerTrigger>
      <DrawerContent className='flex flex-col w-full items-center overflow-hidden h-[90vh]'>
        <DrawerHeader className='relative w-full max-w-md'>
          <DrawerTitle className='text-center'>Pickup</DrawerTitle>
          <Create
            className='absolute top-0 right-4'
            label='Edit'
            existingPickup={pickup}
          />
        </DrawerHeader>
        <div className='flex flex-col items-center w-full overflow-auto h-min'>
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
                ? formatDateForInput(new Date(pickup.pickupDate))
                : "None"}
            </p>

            <CopyButton text={pickup.description} />
            <p>
              <strong>Amount:</strong> ${pickup.amount ?? 0}
            </p>
            <p>
              <strong>Source:</strong> {pickup.source ?? "None"}
            </p>
            {pickup.images?.length > 0 && (
              <div className='flex items-center justify-center'>
                <ImageCarousel urls={pickup.images} />
              </div>
            )}
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
