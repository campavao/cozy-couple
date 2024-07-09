import Link from "next/link";
import { Item } from "../types/types";
import { isVideo } from "../utils/utils";
import { LoadingIcon } from "./image";

export const ItemDisplay = ({
  item,
  options,
}: {
  item: Item;
  options: {
    displayName: string;
    description: string;
    showImage?: boolean;
  };
}) => {
  const firstImage = item.images?.find((img) => !isVideo(img));

  return (
    <Link href={`/${item.type}/${item.id}`} className='flex gap-2 w-full'>
      {firstImage && (
        <LoadingIcon
          containerClassName='w-12 h-full rounded-lg overflow-hidden shrink-0'
          className='w-full h-full rounded-lg object-center object-cover'
          src={firstImage}
          alt=''
          item={item}
          loading='lazy'
        />
      )}
      <div className='flex flex-col'>
        <p className='truncate'>{options.displayName}</p>
        <div className='flex gap-1'>
          <strong>
            $
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(item.amount)}
          </strong>
          <p className='line-clamp-2'>{options.description}</p>
        </div>
      </div>
    </Link>
  );
};
