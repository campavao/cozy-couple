import { getDelivery, getInventoryItem } from "@/app/api/apiUtils";
import { TemplatePage } from "@/app/components/template-page";
import { Create } from "../create";
import { CopyButton } from "../copy-button";
import { ImageCarousel } from "@/app/components/image-carousel";
import { formatDateForInput } from "@/app/utils/utils";
import { DeleteButton } from "../delete-button";

export default async function DeliveryItem({
  params,
}: {
  params: { id: string };
}) {
  const delivery = await getDelivery(params.id);

  return (
    <TemplatePage
      title='Delivery Item'
      rightButton={
        <div className='flex gap-4'>
          <DeleteButton id={delivery.id} />
          <Create label='Edit' existingDelivery={delivery} />
        </div>
      }
    >
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
              <strong>Delivery Window:</strong> {delivery.deliveryWindow.from} -{" "}
              {delivery.deliveryWindow.to}
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
    </TemplatePage>
  );
}
