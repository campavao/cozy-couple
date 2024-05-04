import Link from "next/link";
import { getInventory } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Create } from "./create";
import { InventoryItemDisplay } from "./display";

export default async function Inventory() {
  const inventoryItems = await getInventory();

  return (
    <TemplatePage title='Inventory' rightButton={<Create />}>
      <div className='flex flex-col gap-4 p-4'>
        {inventoryItems.map((item, index) => (
          <Link
            className='inline-block w-full'
            href={`/inventory/${item.id}`}
            key={index}
          >
            {item.displayName}, {item.type}
          </Link>
        ))}
      </div>
    </TemplatePage>
  );
}
