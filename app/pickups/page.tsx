import { getPickups } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Create } from "./create";
import { PickupDisplay } from "./display";

export default async function Pickups() {
  const pickups = await getPickups();

  return (
    <TemplatePage title='Pickups' rightButton={<Create />}>
      {pickups.map((item, index) => (
        <PickupDisplay pickup={item} key={index} />
      ))}
    </TemplatePage>
  );
}
