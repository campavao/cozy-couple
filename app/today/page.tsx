import Link from "next/link";
import { getTodaysItems } from "../api/apiUtils";
import { LoadingIcon } from "../components/image";
import { TemplatePage } from "../components/template-page";
import { Delivery, Pickup } from "../types/types";
import { TodayRoute } from "../components/today-route";
import { parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { isVideo } from "../utils/utils";

export default async function TodayPage() {
  const todaysItems = await getTodaysItems();

  const list: TodayItem[] = [
    ...todaysItems.deliveries.map(
      (del) => ({ ...del, type: "delivery" } as DeliveryItem)
    ),
    ...todaysItems.pickups.map(
      (del) => ({ ...del, type: "pickup" } as PickupItem)
    ),
  ].sort(sortByTime);

  return (
    <TemplatePage title='Today' rightButton={<TodayRoute items={list} />}>
      {list.length === 0 && <div className='p-4'>Nothing today</div>}
      {list.length > 0 && (
        <div className='flex flex-col gap-4 items-start py-4'>
          {list.map((item) => (
            <Display item={item} key={item.id} />
          ))}
        </div>
      )}
    </TemplatePage>
  );
}

interface DeliveryItem extends Delivery {
  type: "delivery";
}

interface PickupItem extends Pickup {
  type: "pickup";
}

type TodayItem = DeliveryItem | PickupItem;

function Display({ item }: { item: TodayItem }) {
  const firstImage = item.images?.find((img) => !isVideo(img));
  const base = item.type === "delivery" ? "deliveries" : "pickups";
  const window =
    item.type === "delivery" ? item.deliveryWindow : item.pickupWindow;

  return (
    <Link href={`/${base}/${item.id}`} className='flex gap-2'>
      {firstImage && (
        <LoadingIcon
          containerClassName='w-12 h-12 rounded-lg overflow-hidden'
          className='w-full h-full rounded-lg object-center object-cover'
          src={firstImage}
          alt=''
          width={100}
          height={100}
          item={item}
        />
      )}
      <div className='flex flex-col gap-1 text-left'>
        <div className='flex md:flex-row flex-col underline'>
          {window.from} - {window.to}
        </div>
        <div className='flex gap-2'>
          <Badge variant='outline' className='uppercase'>
            {item.type}
          </Badge>
          {item.address}
        </div>
      </div>
    </Link>
  );
}

const sortByTime = (itemA: TodayItem, itemB: TodayItem) => {
  const a = itemA.type === "delivery" ? itemA.deliveryDate : itemA.pickupDate;
  const b = itemB.type === "delivery" ? itemB.deliveryDate : itemB.pickupDate;

  if (!a) {
    return 1;
  }
  if (!b) {
    return -1;
  }

  const dateA = setHourAndMinute(parseISO(a), itemA);
  const dateB = setHourAndMinute(parseISO(b), itemB);

  return dateA.getTime() - dateB.getTime();
};

const setHourAndMinute = (date: Date, item: TodayItem) => {
  const window =
    item.type === "delivery" ? item.deliveryWindow : item.pickupWindow;

  if (window.from) {
    const [hourString, minuteWithAmPm] = window.from.split(":");
    let hour = Number(hourString);
    const [minute, amOrPm] = minuteWithAmPm.split(" ");
    if (amOrPm === "PM" && hour !== 12) {
      hour += 12;
    }

    date.setUTCHours(hour);
    date.setUTCMinutes(Number(minute));
  }

  return date;
};
