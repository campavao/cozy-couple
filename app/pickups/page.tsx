import { groupBy } from "lodash";
import { getPickups } from "../api/apiUtils";
import { TemplatePage } from "../components/template-page";
import { Create } from "./create";
import { PickupDisplay } from "./display";
import { formatDateForInput } from "../utils/utils";

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

    return new Date(b).getTime() - new Date(a).getTime();
  });

  const byMonth = groupBy(sorted, ({ pickupDate }) =>
    pickupDate != null && pickupDate !== ""
      ? new Date(pickupDate).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Unknown"
  );

  const today = sorted.filter((item) => {
    const thisDate = new Date(item.pickupDate);
    const today = new Date();

    return (
      item.pickupDate &&
      formatDateForInput(thisDate) === formatDateForInput(today)
    );
  });

  const subHeader = today.length > 0 && (
    <div className='p-4 border-b-4 mx-[-16px] last:border-none border-darkest-blue'>
      <h2>Today</h2>
      <div className='flex flex-col gap-4 items-start'>
        {today.map((item, tIndex) => (
          <PickupDisplay pickup={item} key={tIndex + "today"} />
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
      {Object.entries(byMonth).map(([month, items], index) => (
        <div
          className='p-4 border-b-4 mx-[-16px] last:border-none border-darkest-blue'
          key={index}
        >
          <div className='flex justify-between gap-4'>
            <h2>{month}</h2>
            <p>
              $
              {items
                .map(({ amount }) => amount)
                .reduce((acc, curr) => Number(acc) + Number(curr), 0)}
            </p>
          </div>
          <div className='flex flex-col gap-4 items-start'>
            {items.map((item, dIndex) => (
              <PickupDisplay pickup={item} key={index + dIndex} />
            ))}
          </div>
        </div>
      ))}
    </TemplatePage>
  );
}
