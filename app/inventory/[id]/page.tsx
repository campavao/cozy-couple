import { getInventoryItem } from "@/app/api/apiUtils";
import { TemplatePage } from "@/app/components/template-page";
import { Create } from "../create";
import { CopyButton } from "../copy-button";
import { ImageCarousel } from "@/app/components/image-carousel";
import { DeleteButton } from "../delete-button";
import { CouchDisplay } from "@/app/components/couch-display";

export default async function InventoryItem({
  params,
}: {
  params: { id: string };
}) {
  const item = await getInventoryItem(params.id);

  return (
    <TemplatePage
      title='Inventory Item'
      rightButton={
        <div className='flex gap-4'>
          <DeleteButton id={item.id} />
          <Create label='Edit' existingItem={item} />
        </div>
      }
    >
      <div className='flex flex-col gap-2 w-full py-4'>
        <p>
          <strong>Name:</strong> {item.displayName ?? "None"}
        </p>

        <CopyButton text={item.description} />
        <p>
          <strong>Amount:</strong> ${item.amount ?? 0}
        </p>
        <CouchDisplay couch={item.couch} />
        {item.images?.length > 0 && (
          <div className='flex items-center justify-center'>
            <ImageCarousel urls={item.images} />
          </div>
        )}
      </div>
    </TemplatePage>
  );
}
