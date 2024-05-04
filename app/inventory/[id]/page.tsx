import { getInventoryItem } from "@/app/api/apiUtils";
import { TemplatePage } from "@/app/components/template-page";
import { Create } from "../create";
import { CopyButton } from "../copy-button";
import { ImageCarousel } from "@/app/components/image-carousel";

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
      <div className='flex flex-col items-center w-full overflow-auto h-min'>
        <div className='flex flex-col gap-2 w-full max-w-md p-6'>
          <p>
            <strong>Name:</strong> {item.displayName ?? "None"}
          </p>
          <p>
            <strong>Type:</strong> {item.type ?? "None"}
          </p>
          <CopyButton text={item.description} />
          <p>
            <strong>Amount:</strong> ${item.amount ?? 0}
          </p>
          <div>
            <strong>Dimensions:</strong>{" "}
            <p>
              <span>{item.dimensions.length}&quot; L x </span>
              <span>{item.dimensions.width}&quot; W x </span>
              <span>{item.dimensions.height}&quot; H x </span>
              <span>{item.dimensions.depth}&quot; D</span>
            </p>
          </div>
          {item.images?.length > 0 && (
            <div className='flex items-center justify-center'>
              <ImageCarousel urls={item.images} />
            </div>
          )}
        </div>
      </div>
    </TemplatePage>
  );
}
