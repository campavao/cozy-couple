import {
  CarIcon,
  Clock4Icon,
  DollarSignIcon,
  InfoIcon,
  LucideIcon,
  SofaIcon,
  UserRoundSearchIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import placeholder from "../public/sofa-placeholder.jpg";
import { Item } from "../types/types";
import { formatAmount, isVideo } from "../utils/utils";
import { LoadingIcon } from "./image";

export const ItemDisplay = ({
  item,
  rows,
  description,
}: {
  item: Item;
  rows: DisplayRow[];
  description: string;
}) => {
  const firstImage = item.images?.find((img) => !isVideo(img));
  const base =
    item.type === "delivery"
      ? "deliveries"
      : item.type === "pickup"
      ? "pickups"
      : item.type;

  return (
    <Link
      href={`/${base}/${item.id}`}
      className='flex flex-col gap-2 w-full p-2 rounded-lg bg-slate-100 text-black overflow-x-hidden'
    >
      <div className='flex gap-2 w-full items-start'>
        {firstImage ? (
          <LoadingIcon
            containerClassName='w-12 h-full rounded-lg overflow-hidden shrink-0 shadow-flat'
            className='w-full h-full rounded-lg object-center object-cover'
            src={firstImage}
            alt=''
            item={item}
            loading='lazy'
            width={48}
            height={40}
            unoptimized
          />
        ) : (
          <Image
            src={placeholder}
            alt=''
            width={48}
            height={40}
            className='rounded-lg shadow-flat'
            loading='lazy'
            unoptimized
          />
        )}
        <div className='flex flex-col'>
          {rows.map((row, index) => (
            <ItemDisplayRow key={`${item.id}-${row.type}-${index}`} row={row} />
          ))}
        </div>
      </div>
      {description && (
        <DisplayRowBase
          icon={InfoIcon}
          text={description}
          textClassName='line-clamp-3'
        />
      )}
    </Link>
  );
};

const ItemDisplayRow = ({ row }: { row: DisplayRow }) => {
  const Icon = useMemo(() => {
    switch (row.type) {
      case "address":
        return CarIcon;
      case "amount":
        return DollarSignIcon;
      case "person":
        return UserRoundSearchIcon;
      case "timewindow":
        return Clock4Icon;
      case "info":
        return InfoIcon;
      case "couch":
        return SofaIcon;
    }
  }, [row.type]);

  const text = row.type !== "amount" ? row.value : formatAmount(row.value);

  return (
    <div className='w-full flex gap-2 items-center'>
      <DisplayRowBase icon={Icon} text={text} />
    </div>
  );
};

const DisplayRowBase = ({
  icon: Icon,
  text,
  className,
  textClassName,
}: {
  icon: LucideIcon;
  text: string;
  className?: string;
  textClassName?: string;
}) =>
  text && (
    <div className={`${className} w-full flex gap-2 items-center`}>
      <Icon width={16} height={16} />
      <div className={`${textClassName} text-sm w-full break-words truncate`}>
        {text}
      </div>
    </div>
  );

type MoneyRow = {
  type: "amount";
  value: number;
};

interface StringRow {
  type: "address" | "person" | "timewindow" | "info" | "couch";
  value: string;
}

export type DisplayRow = MoneyRow | StringRow;
