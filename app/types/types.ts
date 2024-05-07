interface Common {
  id: string;
  amount: number;
  description: string;
  images: string[];
  userId: string;
  couch: Couch;
}

export interface Delivery extends Common {
  address: string;
  phone: string;
  name: string;
  deliveryDate: string;
  deliveryWindow: {
    from: string;
    to: string;
  };
  source: string;
}

export interface DeliveryUpload extends Delivery {
  files: File[];
}

export interface Inventory extends Common {
  displayName: string;
}

export interface Pickup extends Common {
  address: string;
  link: string;
  pickupDate: string;
  pickupWindow: {
    from: string;
    to: string;
  };
  source: string;
}

export type UserId = string;

export interface Couch {
  color: string;
  brand: string;
  type: CouchType;
  dimensions: string;
}

export const COUNT_TYPES = [
  "L Sectional",
  "U Sectional",
  "Couch Set",
  "3 Seater",
  "Love Seat",
  "Patio Set",
] as const;

type CouchType = typeof COUNT_TYPES;

interface DeliveryItem extends Delivery {
  type: "delivery";
}

interface PickupItem extends Pickup {
  type: "pickup";
}

interface InventoryItem extends Inventory {
  type: "inventory";
}

export type Item = DeliveryItem | PickupItem | InventoryItem;
