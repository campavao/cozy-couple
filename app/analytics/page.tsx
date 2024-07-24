import {
  addMonths,
  endOfDay,
  isSameMonth,
  isThisMonth,
  parseISO,
} from "date-fns";
import { getDeliveries, getPickups } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { getTotal } from "../utils/utils";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Chart } from "./chart";
import { groupBy } from "lodash";
import {
  Couch,
  DAYS_OF_THE_WEEK,
  Delivery,
  Item,
  Pickup,
} from "../types/types";

export default async function Analytics() {
  const deliveries = await getDeliveries();
  const pickups = await getPickups();

  const today = endOfDay(new Date());
  const lastMonth = addMonths(today, -1);

  const deliveriesThisMonth = deliveries.filter((delivery) =>
    isThisMonth(delivery.deliveryDate)
  );
  const deliveriesLastMonth = deliveries.filter((delivery) =>
    isSameMonth(delivery.deliveryDate, lastMonth)
  );

  const pickupsThisMonth = pickups.filter((pickup) =>
    isThisMonth(pickup.pickupDate)
  );
  const pickupsLastMonth = pickups.filter((pickup) =>
    isSameMonth(pickup.pickupDate, lastMonth)
  );

  const byDate = groupBy(deliveries, ({ deliveryDate }) => deliveryDate);

  const byMonth = groupBy(Object.entries(byDate), ([date, _]) =>
    date !== "Unknown"
      ? parseISO(date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Unknown"
  );

  const monthOverMonthData = Object.entries(byMonth).map(
    ([month, deliveries]) => {
      return {
        month,
        amount: getTotal<Delivery>(
          deliveries.flatMap(([_, deliveries]) => deliveries),
          "amount"
        ),
      };
    }
  );

  return (
    <TemplatePage isWhiteBg title='Analytics' isWide>
      <div className='flex flex-col gap-4 py-4'>
        <div className='grid md:grid-cols-4 gap-4'>
          <TotalCard
            title='Deliveries'
            descriptor={deliveriesThisMonth.length > 0 ? "+" : ""}
            value={deliveriesThisMonth.length}
            previousValue={deliveriesLastMonth.length}
          />
          <TotalCard
            title='Delivery Profit'
            descriptor='$'
            value={getTotal(deliveriesThisMonth, "amount")}
            previousValue={getTotal(deliveriesLastMonth, "amount")}
          />
          <TotalCard
            title='Pickups'
            descriptor={pickupsThisMonth.length > 0 ? "+" : ""}
            value={pickupsThisMonth.length}
            previousValue={pickupsLastMonth.length}
          />
          <TotalCard
            title='Pickup Cost'
            descriptor='$'
            value={getTotal(pickupsThisMonth, "amount")}
            previousValue={getTotal(pickupsLastMonth, "amount")}
          />
        </div>
        <div className='grid md:grid-cols-2 gap-4'>
          <DateCard
            title='Deliveries'
            list={deliveries}
            groupKey='deliveryDate'
            callback={(items) => items.length}
          />
          <DateCard
            title='Profit'
            list={deliveries}
            groupKey='deliveryDate'
            callback={(items) => getTotal<Delivery>(items, "amount")}
            format='$'
          />
          <DateCard
            title='Pickups'
            list={pickups}
            groupKey='pickupDate'
            callback={(items) => items.length}
          />
          <DateCard
            title='Cost'
            list={pickups}
            groupKey='pickupDate'
            callback={(items) => getTotal<Pickup>(items, "amount")}
            format='$'
          />
          <div className='md:col-span-2'>
            <DateCard
              title='Total Sales by Day of Week'
              list={deliveries}
              groupKey='deliveryDate'
              callback={(items) => items.length}
              monthFormat={{
                weekday: "long",
              }}
              sorter={DAYS_OF_THE_WEEK}
            />
          </div>
          <SimpleCard
            title='Channel'
            list={deliveries}
            groupKey='source'
            callback={(items) => items.length}
          />
          <h2 className='md:col-span-2'>Couch Sales</h2>
          <CouchCard
            title='Color'
            list={deliveries}
            groupKey='color'
            callback={(items) => items.length}
          />
          <CouchCard
            title='Type'
            list={deliveries}
            groupKey='type'
            callback={(items) => items.length}
          />
          <CouchCard
            title='Brand'
            list={deliveries}
            groupKey='brand'
            callback={(items) => items.length}
          />

          <h2 className='md:col-span-2'>Couch Profit</h2>
          <CouchCard
            title='Color'
            list={deliveries}
            groupKey='color'
            callback={(items) => getTotal<Delivery>(items, "amount")}
            format='$'
          />
          <CouchCard
            title='Type'
            list={deliveries}
            groupKey='type'
            callback={(items) => getTotal<Delivery>(items, "amount")}
            format='$'
          />
          <CouchCard
            title='Brand'
            list={deliveries}
            groupKey='brand'
            callback={(items) => getTotal<Delivery>(items, "amount")}
            format='$'
          />
        </div>
      </div>
    </TemplatePage>
  );
}

function TotalCard(props: {
  title: string;
  descriptor: string;
  value: number;
  previousValue: number;
}) {
  const { title, descriptor, value, previousValue } = props;
  const change =
    previousValue === 0
      ? value * 100
      : ((value - previousValue) / previousValue) * 100;

  return (
    <div className='rounded-lg border p-4 border-lightest-blue'>
      <h3 className='font-light'>{title}</h3>
      <p className='text-xl font-extrabold'>
        {descriptor}
        {value}
      </p>
      <sub className={change > 0 ? "text-green-900" : "text-red-900"}>
        {change.toFixed(2)}% from last month
      </sub>
    </div>
  );
}

type SimpleListItem = {
  value: string;
  total: number;
};

function SimpleCard<T extends object>(props: {
  title: string;
  list: T[];
  groupKey: keyof T;
  callback: (items: T[]) => number;
}) {
  const { title, list, groupKey, callback } = props;

  const byGroupKey = groupBy(list, (item) => item[groupKey]);

  const data = Object.entries(byGroupKey).map(([value, item]) => ({
    value: value,
    total: callback(item),
  }));

  return (
    <div className='rounded-lg border p-4 border-lightest-blue'>
      <h3 className='pb-4'>{title}</h3>
      <Chart<SimpleListItem> data={data} xKey='value' yKey='total' />
    </div>
  );
}

function DateCard<T extends object>(props: {
  title: string;
  list: T[];
  groupKey: keyof T;
  callback: (items: T[]) => number;
  format?: string;
  monthFormat?: Intl.DateTimeFormatOptions;
  sorter?: string[];
}) {
  const {
    title,
    list,
    groupKey,
    callback,
    format,
    monthFormat = {
      month: "long",
      year: "numeric",
    },
    sorter,
  } = props;

  const byDate = groupBy(list, (item) => item[groupKey]);

  const byMonth = groupBy(Object.entries(byDate), ([date, _]) =>
    date !== "Unknown"
      ? parseISO(date).toLocaleString("default", monthFormat)
      : "Unknown"
  );

  const monthOverMonthData = Object.entries(byMonth)
    .map(([month, items]) => {
      const flatItems = items.flatMap(([_, item]) => item).flat() as T[];
      return {
        month,
        total: callback(flatItems),
      };
    })
    .sort((a, b) =>
      sorter == null ? 1 : sorter.indexOf(a.month) - sorter.indexOf(b.month)
    );

  return (
    <div className='rounded-lg border p-4 border-lightest-blue'>
      <h3 className='pb-4'>{title}</h3>
      <Chart
        data={monthOverMonthData}
        xKey='month'
        yKey='total'
        format={format}
      />
    </div>
  );
}

function CouchCard<T extends Delivery>(props: {
  title: string;
  list: T[];
  groupKey: keyof Couch;
  callback: (items: T[]) => number;
  format?: string;
}) {
  const { title, list, groupKey, callback, format } = props;

  const byCouchDetail = groupBy(list, (item) =>
    item.couch?.[groupKey]?.length > 0 ? item.couch[groupKey] : "Unknown"
  );

  const data = Object.entries(byCouchDetail).map(([detailName, couch]) => ({
    detail: detailName,
    total: callback(couch),
  }));

  return (
    <div className='rounded-lg border p-4 border-lightest-blue'>
      <h3 className='pb-4'>{title}</h3>
      <Chart data={data} xKey='detail' yKey='total' format={format} />
    </div>
  );
}
