import { ReactNode } from "react";
import { BackButton } from "./BackButton";
import { parseISO } from "date-fns";
import groupBy from "lodash/groupBy";
import { Item } from "../types/types";
import { formatAmount, formatDate, getTotal, pluralize } from "../utils/utils";
import { DisplayRow, ItemDisplay } from "./ItemDisplay";

export function TemplatePage({
  title,
  subHeader,
  children,
  rightButton,
  isWide,
  isWhiteBg,
}: {
  title: string;
  subHeader?: ReactNode;
  children: ReactNode;
  rightButton?: ReactNode;
  isWide?: boolean;
  isWhiteBg?: boolean;
}) {
  return (
    <div className='w-full flex flex-col items-center pb-20'>
      <div
        className={`w-full flex flex-col  gap-4 ${
          isWide ? "max-w-none" : "max-w-xl"
        }`}
      >
        <div className='flex items-center justify-between'>
          <BackButton />
          <h1>{title}</h1>
          <div>{rightButton}</div>
        </div>
        {subHeader && (
          <div className='bg-white rounded-lg px-4 text-darkest-blue'>
            {subHeader}
          </div>
        )}
        <div
          className={
            (isWhiteBg ? "bg-white text-darkest-blue" : "text-white") +
            " rounded-lg px-4"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function TemplateItemPage<T extends Item>({
  items,
  groupByKey,
  sorter,
  getRows,
}: {
  items: T[];
  groupByKey: keyof T;
  sorter: (a: T, b: T) => number;
  getRows: (row: T) => DisplayRow[];
}) {
  const sorted = items.sort((itemA, itemB) => {
    const a = itemA[groupByKey];
    const b = itemB[groupByKey];

    if (!a || typeof a !== "string") {
      return 1;
    }

    if (!b || typeof b !== "string") {
      return -1;
    }

    return parseISO(b).getTime() - parseISO(a).getTime();
  });

  const byDate = groupBy(sorted, (item) => item[groupByKey]);

  const byMonth = groupBy(Object.entries(byDate), ([date, _]) =>
    date !== "Unknown"
      ? parseISO(date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Unknown"
  );

  return Object.entries(byMonth).map(([month, dateValues], index) => {
    const total = getTotal<T>(dateValues, "amount");
    const itemCount = dateValues.flatMap(([_, dels]) => dels).length;

    return (
      <div className='p-4 mx-[-16px] relative' key={index}>
        <div className='flex justify-between gap-4 mb-4 pb-4 pt-2 sticky top-0 mx-[-30px] px-[30px] bg-white text-darkest-blue shadow-flat z-10 h-[60px] sm:rounded-sm'>
          <h2 className='self-end text-xl'>{month}</h2>
          <div className='flex flex-col gap-2 items-end'>
            <p>
              {itemCount} {pluralize("item", itemCount)} - $
              {formatAmount(total)}
            </p>
            <sub>Avg. ${formatAmount(total / itemCount)}</sub>
          </div>
        </div>
        <div className='flex flex-col gap-6 items-start w-full'>
          {dateValues.map(([date, datedItems], index) => (
            <div key={date + index} className='flex flex-col gap-2 w-full'>
              <h3>{formatDate(new Date(date))}</h3>
              <div className='flex flex-col gap-4 w-full'>
                {datedItems.sort(sorter).map((datedItem, dIndex) => (
                  <ItemDisplay
                    item={datedItem}
                    key={`${index}-${dIndex}`}
                    rows={getRows(datedItem)}
                    description={datedItem.description}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  });
}
