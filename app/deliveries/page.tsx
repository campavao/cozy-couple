import { getDeliveries } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Create } from "./create";
import { DeliveryDisplay } from "./display";

export default async function Deliveries() {
  const deliveries = await getDeliveries();
  return (
    <TemplatePage title='Deliveries' rightButton={<Create />}>
      <div className='flex flex-col gap-4 items-start'>
        {deliveries.map((delivery, index) => (
          <DeliveryDisplay delivery={delivery} key={index} />
        ))}
      </div>
    </TemplatePage>
  );
}
