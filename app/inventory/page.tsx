import Link from "next/link";
import { getInventory } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Create } from "./create";
import { Inventory } from "../types/types";
import { LoadingIcon } from "../components/image";
import { formatDate, isVideo, pluralize } from "../utils/utils";
import { parseISO } from "date-fns";
import { groupBy } from "lodash";

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
        const itemCount = dateValues.flatMap(([_, dels]) => dels).length;

        return (
          <div
            className='p-4 border-b-4 mx-[-16px] last:border-none border-darkest-blue'
            key={index}
          >
            <div className='flex justify-between gap-4 mb-4'>
              <h2 className='border-b-2 border-b-lightest-blue'>{month}</h2>
              <p>
                {itemCount} {pluralize("item", itemCount)}
              </p>
            </div>
            <div className='flex flex-col gap-6 items-start'>
              {dateValues.map(([date, items], index) => {
                const key = `${date}-${index}`;
                return (
                  <div key={key}>
                    <h3 className='font-bold'>
                      {date !== "Unknown" ? formatDate(new Date(date)) : date}
                    </h3>
                    <div className='flex flex-col gap-4'>
                      {items.map((item, dIndex) => (
                        <Display item={item} key={`${key}-${dIndex}`} />
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

function Display({ item }: { item: Inventory }) {
  const firstImage = item.images?.find((img) => !isVideo(img));

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
          item={{
            ...item,
            type: "inventory",
          }}
        />
      )}
      <div className='flex flex-col gap-1 text-left'>
        {item.displayName}, {item?.couch?.type}
      </div>
    </Link>
  );
}
