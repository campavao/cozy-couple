import { getDelivery, getInventoryItem } from "@/app/api/apiUtils";
import { TemplatePage } from "@/app/components/template-page";
import { Create } from "../create";
import { CopyButton } from "../copy-button";
import { formatDateForInput } from "@/app/utils/utils";
import { DeleteButton } from "../delete-button";
import { CouchDisplay } from "@/app/components/couch-display";
import { ImageGallery } from "@/app/components/image-gallery";
import { Address } from "@/app/components/today-route";

export default async function DeliveryItem({
  params,
}: {
  params: { id: string };
}) {
  const delivery = await getDelivery(params.id);

  return (
    <TemplatePage
      title='Delivery Item'
      rightButton={<Create label='Edit' existingDelivery={delivery} />}
    >
      <div className='flex flex-col gap-2 w-full py-4'>
        <Address address={delivery.address} />
        {delivery.phone && (
          <a href={`tel:${delivery.phone}`} type='tel'>
            <strong>Phone:</strong> {delivery.phone}
          </a>
        )}
        {delivery.name && (
          <p>
            <strong>Name:</strong> {delivery.name}
          </p>
        )}
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
        <CouchDisplay couch={delivery.couch} />
        {delivery.images?.length > 0 && (
          <div className='flex items-center justify-center'>
            <ImageGallery
              urls={delivery.images}
              item={{ ...delivery, type: "delivery" }}
            />
          </div>
        )}
        <DeleteButton id={delivery.id} />
      </div>
    </TemplatePage>
  );
}
