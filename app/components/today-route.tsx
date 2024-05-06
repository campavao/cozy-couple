"use client";
import { useMemo } from "react";
import { Delivery, Pickup } from "../types/types";
import { isiOS } from "../utils/utils";

export function TodayRoute<T extends Delivery | Pickup>({
  items,
}: {
  items: T[];
}) {
  const routeUrl = useMemo(() => {
    if (isiOS()) {
      const addresses = items.map((item) => `&daddr=${item.address}`);
      return `maps://?dirflg=d${addresses}`;
    } else {
      const addresses = items.map((item) => `/${item.address}`);
      return `https://www.google.com/maps/dir/Current+Location${addresses}`;
    }
  }, [items]);

  return <a href={routeUrl}>Route</a>;
}

export function Address({ address }: { address: string }) {
  const addressUrl = useMemo(() => {
    if (isiOS()) {
      return `maps://?q${address}`;
    } else {
      return `https://www.google.com/maps/dir/Current+Location/${address}`;
    }
  }, [address]);
  return (
    <p>
      <strong>Address:</strong> <a href={addressUrl}>{address}</a>
    </p>
  );
}
