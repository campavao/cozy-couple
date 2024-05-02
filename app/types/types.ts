interface Common {
  id: string;
  amount: number;
  description: string;
  images: string[];
  userId: string;
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

interface Dimensions {
  length: number;
  width: number;
  height: number;
  depth: number;
}

export interface Inventory extends Common {
  displayName: string;
  dimensions: Dimensions;
  type: string;
}

export interface Pickup extends Common {
  link: string;
  pickupDate: string;
  source: string;
}

export type UserId = string;
