import { getDeliveries } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Create } from "./create";
import { DeliveryDisplay } from "./display";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";

export default async function Deliveries() {
  const deliveries = await getDeliveries();

  const sorted = sortBy(deliveries, ({ deliveryDate }) =>
    deliveryDate != null ? new Date(deliveryDate) : false
  );

  const byMonth = groupBy(sorted, ({ deliveryDate }) =>
    deliveryDate != null ? new Date(deliveryDate).getMonth() : "Unknown"
  );

  return (
    <TemplatePage title='Deliveries' rightButton={<Create />}>
      {Object.entries(byMonth).map(([month, deliveryItems], index) => (
        <div className='pb-4' key={index}>
          <div className='flex justify-between gap-4'>
            <h2>
              {month !== "Unknown"
                ? new Date(month).toLocaleString("default", { month: "long" })
                : month}
            </h2>
            <p>
              $
              {deliveryItems
                .map(({ amount }) => amount)
                .reduce((acc, curr) => Number(acc) + Number(curr), 0)}
            </p>
          </div>
          <div className='flex flex-col gap-4 items-start'>
            {deliveryItems.map((delivery, dIndex) => (
              <DeliveryDisplay delivery={delivery} key={index + dIndex} />
            ))}
          </div>
        </div>
      ))}
    </TemplatePage>
  );
}
