import { getInventoryItem } from "@/app/api/apiUtils";
import { TemplatePage } from "@/app/components/template-page";
import { Create } from "../create";
import { CopyButton } from "../copy-button";
import { ImageGallery } from "@/app/components/image-gallery";
import { DeleteButton } from "../delete-button";
import { CouchDisplay } from "@/app/components/couch-display";
import { formatDateForInput } from "@/app/utils/utils";

export default async function InventoryItem({
  params,
}: {
  params: { id: string };
}) {
  const item = await getInventoryItem(params.id);

  return (
    <TemplatePage
      title='Inventory Item'
      rightButton={<Create label='Edit' existingItem={item} />}
    >
      <div className='flex flex-col gap-2 w-full py-4'>
        <p>
          <strong>Name:</strong> {item.displayName ?? "None"}
        </p>

        <CopyButton text={item.description} />
        <p>
          <strong>Amount:</strong> ${item.amount ?? 0}
        </p>
        <p>
          <strong>Blemishes:</strong> {item.blemishes}
        </p>
        <p>
          <strong>Date Listed:</strong>{" "}
          {item.dateListed != null && item.dateListed != ""
            ? formatDateForInput(new Date(item.dateListed))
            : "None"}
        </p>
        <CouchDisplay couch={item.couch} />
        {item.images?.length > 0 && (
          <div className='flex items-center justify-center'>
            <ImageGallery
              urls={item.images}
              item={{ ...item, type: "inventory" }}
            />
          </div>
        )}
        <DeleteButton id={item.id} />
      </div>
    </TemplatePage>
  );
}
