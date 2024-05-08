import { getPickup } from "@/app/api/apiUtils";
import { TemplatePage } from "@/app/components/template-page";
import { Create } from "../create";
import { CopyButton } from "../copy-button";
import { ImageGallery } from "@/app/components/image-gallery";
import { formatDateForInput } from "@/app/utils/utils";
import { DeleteButton } from "../delete-button";
import { CouchDisplay } from "@/app/components/couch-display";
import { Address } from "@/app/components/today-route";

export default async function InventoryItem({
  params,
}: {
  params: { id: string };
}) {
  const pickup = await getPickup(params.id);
  const link = pickup.link?.includes("http")
    ? pickup.link
    : "https://" + pickup.link;

  return (
    <TemplatePage
      title='Pickup Item'
      rightButton={<Create label='Edit' existingPickup={pickup} />}
    >
      <div className='flex flex-col gap-2 w-full py-4'>
        <Address address={pickup.address} />

        {pickup.link && (
          <a href={link} target='_blank' rel='noopener noreferrer'>
            <strong>Link:</strong> {pickup.link ?? "None"}
          </a>
        )}
        <p>
          <strong>Pickup Date:</strong>{" "}
          {pickup.pickupDate != null && pickup.pickupDate != ""
            ? formatDateForInput(new Date(pickup.pickupDate))
            : "None"}
        </p>

        {pickup.pickupWindow && (
          <p>
            <strong>Pickup Window:</strong> {pickup.pickupWindow.from} -{" "}
            {pickup.pickupWindow.to}
          </p>
        )}

        <CopyButton text={pickup.description} />
        <p>
          <strong>Amount:</strong> ${pickup.amount ?? 0}
        </p>
        {pickup.source && (
          <p>
            <strong>Source:</strong> {pickup.source}
          </p>
        )}
        {pickup.paymentMethod && (
          <p>
            <strong>Payment Method:</strong> {pickup.paymentMethod}
          </p>
        )}
        <CouchDisplay couch={pickup.couch} />
        {pickup.images?.length > 0 && (
          <div className='flex items-center justify-center'>
            <ImageGallery
              urls={pickup.images}
              item={{ ...pickup, type: "pickup" }}
            />
          </div>
        )}
        <DeleteButton id={pickup.id} />
      </div>
    </TemplatePage>
  );
}
