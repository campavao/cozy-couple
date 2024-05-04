import { getInventoryItem, getPickup } from "@/app/api/apiUtils";
import { TemplatePage } from "@/app/components/template-page";
import { Create } from "../create";
import { CopyButton } from "../copy-button";
import { ImageCarousel } from "@/app/components/image-carousel";
import { formatDateForInput } from "@/app/utils/utils";

export default async function InventoryItem({
  params,
}: {
  params: { id: string };
}) {
  const pickup = await getPickup(params.id);

  return (
    <TemplatePage
      title='Pickup Item'
      rightButton={<Create label='Edit' existingPickup={pickup} />}
    >
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
    </TemplatePage>
  );
}
