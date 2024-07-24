import { getInventory } from "../api/apiUtils";
import { TemplateItemPage, TemplatePage } from "../components/template-page";
import { Create } from "./create";
import { InventoryItem } from "../types/types";

export default async function InventoryPage() {
  const inventoryItems = (await getInventory()).map<InventoryItem>((i) => ({
    ...i,
    type: "inventory",
  }));

  return (
    <TemplatePage title='Inventory' rightButton={<Create />}>
      <TemplateItemPage<InventoryItem>
        items={inventoryItems}
        groupByKey='dateListed'
        sorter={() => 1}
        getRows={(item) => [
          {
            type: "couch",
            value: item.displayName,
          },
          {
            type: "amount",
            value: item.amount,
          },
        ]}
      />
    </TemplatePage>
  );
}
