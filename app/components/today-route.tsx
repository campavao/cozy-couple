"use client";
import { useEffect, useMemo, useState } from "react";
import { Delivery, Pickup } from "../types/types";
import { RouteIcon } from "lucide-react";

export function TodayRoute<T extends Delivery | Pickup>({
  items,
}: {
  items: T[];
}) {
  const [routeUrl, setRouteUrl] = useState<string>();
  useEffect(() => {
    if (isiOS()) {
      const addresses = items.map((item) => `&daddr=${item.address}`);
      setRouteUrl(`maps://?dirflg=d${addresses}`);
    } else {
      const addresses = items.map((item) => `/${item.address}`);
      setRouteUrl(
        `https://www.google.com/maps/dir/Current+Location${addresses}`
      );
    }
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <a href={routeUrl} target='_blank' rel='noopener noreferrer'>
      <RouteIcon />
    </a>
  );
}

function isiOS() {
  if (!navigator) {
    return false;
  }

  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

export function Address({ address }: { address: string }) {
  const [routeUrl, setRouteUrl] = useState<string>();
  useEffect(() => {
    if (navigator) {
      if (isiOS()) {
        setRouteUrl(`maps://?q${address}`);
      } else {
        setRouteUrl(
          `https://www.google.com/maps/dir/Current+Location/${address}`
        );
      }
    }
  }, [address]);

  return (
    <p>
      <strong>Address:</strong> <a href={routeUrl}>{address}</a>
    </p>
  );
}
