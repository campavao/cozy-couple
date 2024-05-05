import Link from "next/link";
import { getInventory } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Create } from "./create";
import { Inventory } from "../types/types";
import { LoadingIcon } from "../components/image";

export default async function InventoryPage() {
  const inventoryItems = await getInventory();

  return (
    <TemplatePage title='Inventory' rightButton={<Create />}>
      <div className='flex flex-col gap-4 p-4'>
        {inventoryItems.map((item, index) => (
          <Display item={item} key={index} />
        ))}
      </div>
    </TemplatePage>
  );
}

function Display({ item }: { item: Inventory }) {
  const firstImage = item.images?.find((img) => !img.includes(".mp4"));

  return (
    <Link href={`/inventory/${item.id}`} className='flex gap-2'>
      {firstImage && (
        <LoadingIcon
          containerClassName='w-12 h-full rounded-lg overflow-hidden'
          className='w-full h-full rounded-lg object-center object-cover'
          src={firstImage}
          alt=''
          width={100}
          height={100}
        />
      )}
      <div className='flex flex-col gap-1 text-left'>
        {item.displayName}, {item?.couch?.type}
      </div>
    </Link>
  );
}
