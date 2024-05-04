import Link from "next/link";
import { getInventory } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Create } from "./create";
import { InventoryItemDisplay } from "./display";

export default async function Inventory() {
  const inventoryItems = await getInventory();

  return (
    <TemplatePage title='Inventory' rightButton={<Create />}>
      {inventoryItems.map((item, index) => (
        // <InventoryItemDisplay item={item} key={index} />
        <Link href={`/inventory/${item.id}`} key={index}>
          {item.displayName}, {item.type}
        </Link>
      ))}
    </TemplatePage>
  );
}
