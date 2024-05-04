import { getDeliveries } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Delivery } from "../types/types";
import {
  formatDate,
  formatDateForInput,
  sortByDeliveryTime,
} from "../utils/utils";
import { Create } from "./create";
import { DeliveryDisplay } from "./display";
import groupBy from "lodash/groupBy";

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

    return new Date(b).getTime() - new Date(a).getTime();
  });

  const byDate = groupBy(sorted, ({ deliveryDate }) =>
    deliveryDate != null && deliveryDate !== ""
      ? new Date(deliveryDate).toLocaleString("default", {
          dateStyle: "long",
        })
      : "Unknown"
  );

  const byMonth = groupBy(Object.entries(byDate), ([date, _]) =>
    date !== "Unknown"
      ? new Date(date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Unknown"
  );

  const today = sorted
    .filter((item) => {
      const thisDate = new Date(item.deliveryDate);
      const today = new Date();

      return (
        item.deliveryDate &&
        formatDateForInput(thisDate) === formatDateForInput(today)
      );
    })
    .sort(sortByDeliveryTime);

  const routeUrl = today.map((item) => `&daddr=${item.address}`);

  const subHeader = today.length > 0 && (
    <div className='p-4 border-b-4 mx-[-16px] last:border-none border-darkest-blue'>
      <div className='flex justify-between'>
        <h2>Today</h2>
        <a href={`maps://?dirflg=d${routeUrl}`}>Route</a>
      </div>
      <div className='flex flex-col gap-4 items-start'>
        {today.map((delivery, tIndex) => (
          <DeliveryDisplay delivery={delivery} key={tIndex + "today"} />
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
        const total = dateValues
          .flatMap(([_, item]) => item.map((i) => i.amount))
          .reduce((acc, curr) => Number(acc) + Number(curr), 0);

        return (
          <div
            className='p-4 border-b-4 mx-[-16px] last:border-none border-darkest-blue'
            key={index}
          >
            <div className='flex justify-between gap-4 mb-4'>
              <h2 className='border-b-2 border-b-lightest-blue'>{month}</h2>
              <p>${total}</p>
            </div>
            <div className='flex flex-col gap-6 items-start'>
              {dateValues.map(([date, deliveryItems], index) => (
                <div key={date + index}>
                  <h3 className='font-bold'>{formatDate(new Date(date))}</h3>
                  <div className='flex flex-col gap-4'>
                    {deliveryItems
                      .sort(sortByDeliveryTime)
                      .map((delivery, dIndex) => (
                        <DeliveryDisplay
                          delivery={delivery}
                          key={index + dIndex}
                        />
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
