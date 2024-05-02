import { Inventory } from "../types/types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CopyButton } from "./copy-button";
import { Create } from "./create";
import { DeleteButton } from "./delete-button";

export function InventoryItemDisplay({ item }: { item: Inventory }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <div>{item.displayName}</div>
      </DrawerTrigger>
      <DrawerContent className='flex flex-col w-full items-center'>
        <DrawerHeader className='relative w-full max-w-md'>
          <DrawerTitle className='text-center'>Inventory Item</DrawerTitle>
          <Create
            className='absolute top-0 right-4'
            label='Edit'
            existingItem={item}
          />
        </DrawerHeader>
        <div className='flex flex-col items-center w-full'>
          <div className='flex flex-col gap-2 w-full max-w-md p-6'>
            <p>
              <strong>Name:</strong> {item.displayName ?? "None"}
            </p>
            <p>
              <strong>Type:</strong> {item.type ?? "None"}
            </p>
            <CopyButton text={item.description} />
            <p>
              <strong>Amount:</strong> ${item.amount ?? 0}
            </p>
            <p>
              <strong>Dimensions:</strong>{" "}
              <div>
                <span>{item.dimensions.length}&quot; L x </span>
                <span>{item.dimensions.width}&quot; W x </span>
                <span>{item.dimensions.height}&quot; H x </span>
                <span>{item.dimensions.depth}&quot; D</span>
              </div>
            </p>
          </div>
        </div>
        <DrawerFooter>
          <DeleteButton id={item.id} />
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
