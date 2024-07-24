import { getDeliveries } from "../api/apiUtils";
import { TemplateItemPage, TemplatePage } from "../components/template-page";
import { DeliveryItem } from "../types/types";
import { sortByDeliveryTime } from "../utils/utils";
import { Create } from "./create";

export default async function Deliveries() {
  const deliveries = (await getDeliveries()).map<DeliveryItem>((d) => ({
    ...d,
    type: "delivery",
  }));

  return (
    <TemplatePage title='Deliveries' rightButton={<Create />}>
      <TemplateItemPage<DeliveryItem>
        items={deliveries}
        groupByKey='deliveryDate'
        sorter={sortByDeliveryTime}
        getRows={(delivery) => [
          {
            type: "timewindow",
            value: `${delivery.deliveryWindow.from} - ${delivery.deliveryWindow.to}`,
          },
          {
            type: "address",
            value: delivery.address,
          },
          {
            type: "person",
            value: delivery.name,
          },
        ]}
      />
    </TemplatePage>
  );
}
