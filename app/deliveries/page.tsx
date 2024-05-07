import Link from "next/link";
import { getDeliveries } from "../api/apiUtils";
import { LoadingIcon } from "../components/image";
import { TemplatePage } from "../components/template-page";
import { Delivery } from "../types/types";
import {
  formatDate,
  getTotal,
  pluralize,
  sortByDeliveryTime,
} from "../utils/utils";
import { Create } from "./create";
import groupBy from "lodash/groupBy";
import { isToday, parseISO } from "date-fns";
import { TodayRoute } from "../components/today-route";
import { isVideo } from "../utils/imageUtils";

export default async function Deliveries() {
  const deliveries = await getDeliveries();

  const sorted = deliveries.sort((itemA, itemB) => {
    const a = itemA.deliveryDate;
    const b = itemB.deliveryDate;

    if (!a) {
      return 1;
    }
    if (!b) {
      return -1;
    }

    return parseISO(b).getTime() - parseISO(a).getTime();
  });

  const byDate = groupBy(sorted, ({ deliveryDate }) => deliveryDate);

  const byMonth = groupBy(Object.entries(byDate), ([date, _]) =>
    date !== "Unknown"
      ? parseISO(date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Unknown"
  );

  const today = sorted
    .filter((item) => isToday(parseISO(item.deliveryDate)))
    .sort(sortByDeliveryTime);

  const subHeader = today.length > 0 && (
    <div className='p-4 border-b-4 mx-[-16px] last:border-none border-darkest-blue'>
      <div className='flex justify-between'>
        <h2>Today</h2>
        <TodayRoute items={today} />
      </div>
      <div className='flex flex-col gap-4 items-start'>
        {today.map((delivery, tIndex) => (
          <Display delivery={delivery} key={tIndex + "today"} />
        ))}
      </div>
    </div>
  );

  return (
    <TemplatePage
      title='Deliveries'
      rightButton={<Create />}
      subHeader={subHeader}
    >
      {Object.entries(byMonth).map(([month, dateValues], index) => {
        const total = getTotal<Delivery>(dateValues, "amount");
        const itemCount = dateValues.flatMap(([_, dels]) => dels).length;

        return (
          <div
            className='p-4 border-b-4 mx-[-16px] last:border-none border-darkest-blue'
            key={index}
          >
            <div className='flex justify-between gap-4 mb-4'>
              <h2 className='border-b-2 border-b-lightest-blue'>{month}</h2>
              <p>
                {itemCount} {pluralize("item", itemCount)} - ${total}
              </p>
            </div>
            <div className='flex flex-col gap-6 items-start'>
              {dateValues.map(([date, deliveryItems], index) => (
                <div key={date + index}>
                  <h3 className='font-bold'>{formatDate(new Date(date))}</h3>
                  <div className='flex flex-col gap-4'>
                    {deliveryItems
                      .sort(sortByDeliveryTime)
                      .map((delivery, dIndex) => (
                        <Display delivery={delivery} key={index + dIndex} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </TemplatePage>
  );
}

function Display({ delivery }: { delivery: Delivery }) {
  const firstImage = delivery.images?.find((img) => !isVideo(img));

  return (
    <Link href={`/deliveries/${delivery.id}`} className='flex gap-2'>
      {firstImage && (
        <LoadingIcon
          containerClassName='w-12 h-full rounded-lg overflow-hidden'
          className='w-full h-full rounded-lg object-center object-cover'
          src={firstImage}
          alt=''
          width={100}
          height={100}
          item={{
            ...delivery,
            type: "delivery",
          }}
        />
      )}
      <div className='flex flex-col gap-1 text-left'>
        <div className='flex md:flex-row flex-col underline'>
          {delivery.deliveryWindow.from} - {delivery.deliveryWindow.to}
        </div>
        <div>
          {delivery.address}, {delivery.name}
        </div>
      </div>
    </Link>
  );
}
