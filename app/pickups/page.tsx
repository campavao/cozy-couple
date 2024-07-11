import { getPickups } from "../api/apiUtils";
import { TemplateItemPage, TemplatePage } from "../components/template-page";
import { Create } from "./create";
import { PickupItem } from "../types/types";
import { sortByPickupTime } from "../utils/utils";

export default async function Pickups() {
  const pickups = (await getPickups()).map<PickupItem>((p) => ({
    ...p,
    type: "pickup",
  }));

  return (
    <TemplatePage title='Pickups' rightButton={<Create />}>
      <TemplateItemPage<PickupItem>
        items={pickups}
        groupByKey='pickupDate'
        sorter={sortByPickupTime}
        getRows={(pickup) => [
          {
            type: "timewindow",
            value: `${pickup.pickupWindow.from} - ${pickup.pickupWindow.to}`,
          },
          {
            type: "address",
            value: pickup.address,
          },
          {
            type: "amount",
            value: pickup.amount,
          },
        ]}
      />
    </TemplatePage>
  );
}
