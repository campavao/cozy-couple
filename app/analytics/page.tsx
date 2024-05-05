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
import { Delivery, Pickup } from "../types/types";

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
    <TemplatePage title='Analytics' isWide>
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
            title='Pickup Loss'
            descriptor='$'
            value={getTotal(pickupsThisMonth, "amount")}
            previousValue={getTotal(pickupsLastMonth, "amount")}
          />
        </div>
        <div className='grid md:grid-cols-2 gap-4'>
          <ChartCard
            title='Deliveries'
            list={deliveries}
            groupKey='deliveryDate'
            callback={(items) => items.length}
          />
          <ChartCard
            title='Profit'
            list={deliveries}
            groupKey='deliveryDate'
            callback={(items) => getTotal<Delivery>(items, "amount")}
          />
          <ChartCard
            title='Pickups'
            list={pickups}
            groupKey='pickupDate'
            callback={(items) => items.length}
          />
          <ChartCard
            title='Loss'
            list={pickups}
            groupKey='pickupDate'
            callback={(items) => getTotal<Pickup>(items, "amount")}
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
        {change}% from last month
      </sub>
    </div>
  );
}

function ChartCard<T extends object>(props: {
  title: string;
  list: T[];
  groupKey: keyof T;
  callback: (items: T[]) => number;
}) {
  const { title, list, groupKey, callback } = props;

  const byDate = groupBy(list, (item) => item[groupKey]);

  const byMonth = groupBy(Object.entries(byDate), ([date, _]) =>
    date !== "Unknown"
      ? parseISO(date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Unknown"
  );

  const monthOverMonthData = Object.entries(byMonth).map(([month, items]) => {
    const flatItems = items.flatMap(([_, item]) => item).flat() as T[];
    return {
      month,
      total: callback(flatItems),
    };
  });

  return (
    <div className='rounded-lg border p-4 border-lightest-blue'>
      <h2 className='pb-4'>{title}</h2>
      <Chart data={monthOverMonthData} xKey='month' yKey='total' />
    </div>
  );
}
