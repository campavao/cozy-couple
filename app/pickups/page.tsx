import { groupBy } from "lodash";
import { getPickups } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Create } from "./create";
import {
  formatDate,
  formatDateForInput,
  getTotal,
  pluralize,
} from "../utils/utils";
import { Pickup } from "../types/types";
import { LoadingIcon } from "../components/image";
import Link from "next/link";
import { isToday, parseISO } from "date-fns";
import { TodayRoute } from "../components/today-route";
import { isVideo } from "../utils/imageUtils";

export default async function Pickups() {
  const pickups = await getPickups();

  const sorted = pickups.sort((itemA, itemB) => {
    const a = itemA.pickupDate;
    const b = itemB.pickupDate;

    if (!a) {
      return 1;
    }
    if (!b) {
      return -1;
    }

    return parseISO(b).getTime() - parseISO(a).getTime();
  });

  const byDate = groupBy(sorted, ({ pickupDate }) => pickupDate);

  const byMonth = groupBy(Object.entries(byDate), ([date, _]) =>
    date !== "Unknown"
      ? parseISO(date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Unknown"
  );

  const today = sorted.filter((item) => isToday(parseISO(item.pickupDate)));

  const subHeader = today.length > 0 && (
    <div className='p-4 border-b-4 mx-[-16px] last:border-none border-darkest-blue'>
      <div className='flex justify-between'>
        <h2>Today</h2>
        <TodayRoute items={today} />
      </div>
      <div className='flex flex-col gap-4 items-start'>
        {today.map((item, tIndex) => (
          <Display pickup={item} key={tIndex + "today"} />
        ))}
      </div>
    </div>
  );

  return (
    <TemplatePage
      title='Pickups'
      rightButton={<Create />}
      subHeader={subHeader}
    >
      {Object.entries(byMonth).map(([month, dateValues], index) => {
        const total = getTotal<Pickup>(dateValues, "amount");
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
              {dateValues.map(([date, items], index) => (
                <div key={date + index}>
                  <h3 className='font-bold'>{formatDate(new Date(date))}</h3>
                  <div className='flex flex-col gap-4'>
                    {items.map((item, dIndex) => (
                      <Display pickup={item} key={index + dIndex} />
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

function Display({ pickup }: { pickup: Pickup }) {
  const firstImage = pickup.images.find((img) => !isVideo(img));

  return (
    <Link href={`/pickups/${pickup.id}`} className='flex gap-3'>
      {firstImage && (
        <LoadingIcon
          containerClassName='w-12 h-12 rounded-lg overflow-hidden'
          className='w-full h-full rounded-lg object-center object-cover'
          src={firstImage}
          alt=''
          width={100}
          height={100}
          item={{
            ...pickup,
            type: "pickup",
          }}
        />
      )}
      <span>{pickup.address}</span>
    </Link>
  );
}
