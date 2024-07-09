import { getInventory } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Create } from "./create";
import { Inventory } from "../types/types";
import { formatAmount, formatDate, getTotal, pluralize } from "../utils/utils";
import { parseISO } from "date-fns";
import { groupBy } from "lodash";
import { ItemDisplay } from "../components/ItemDisplay";

export default async function InventoryPage() {
  const inventoryItems = await getInventory();

  const sorted = inventoryItems.sort((itemA, itemB) => {
    const a = itemA.dateListed;
    const b = itemB.dateListed;

    if (!a) {
      return 1;
    }
    if (!b) {
      return -1;
    }

    return parseISO(b).getTime() - parseISO(a).getTime();
  });

  const byDate = groupBy(sorted, ({ dateListed }) => dateListed ?? "Unknown");

  const byMonth = groupBy(Object.entries(byDate), ([date, _]) =>
    date != null && date !== "Unknown"
      ? parseISO(date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Unknown"
  );

  return (
    <TemplatePage title='Inventory' rightButton={<Create />}>
      {Object.entries(byMonth).map(([month, dateValues], index) => {
        const total = getTotal<Inventory>(dateValues, "amount");
        const itemCount = dateValues.flatMap(([_, dels]) => dels).length;

        return (
          <div
            className='p-4 border-b-4 mx-[-16px] last:border-none border-darkest-blue'
            key={index}
          >
            <div className='flex justify-between gap-4 mb-4'>
              <h2 className='border-b-2 border-b-lightest-blue'>{month}</h2>
              <div className='flex flex-col gap-2 items-end'>
                <p>
                  {itemCount} {pluralize("item", itemCount)} - $
                  {formatAmount(total)}
                </p>
                <sub>Avg. ${formatAmount(total / itemCount)}</sub>
              </div>
            </div>
            <div className='flex flex-col gap-6 items-start w-full'>
              {dateValues.map(([date, items], index) => {
                const key = `${date}-${index}`;
                return (
                  <div key={key} className='w-full'>
                    <h3 className='font-bold'>
                      {date !== "Unknown" ? formatDate(new Date(date)) : date}
                    </h3>
                    <div className='flex flex-col gap-4 w-full overflow-hidden'>
                      {items.map((item, dIndex) => (
                        <ItemDisplay
                          item={{ ...item, type: "inventory" }}
                          key={`${key}-${dIndex}`}
                          options={{
                            displayName: item.displayName,
                            description:
                              item?.blemishes !== ""
                                ? item.blemishes
                                : item?.couch?.type ?? "Unknown",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </TemplatePage>
  );
}
