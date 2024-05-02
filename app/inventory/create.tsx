"use client";
import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  Sheet,
} from "@/components/ui/sheet";
import ImageInput from "../components/image-input";
import { FormEventHandler, useCallback, useState } from "react";
import { Delivery, Inventory } from "../types/types";
import { SubmitButton } from "../components/SubmitButton";
import { formatDateForInput } from "../utils/utils";
import { useRouter } from "next/navigation";

interface Create {
  label?: string;
  className?: string;
  existingItem?: Inventory;
}

export function Create({ label = "Create", className, existingItem }: Create) {
  const [open, setOpen] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const data = e.target as any;

      const item = {
        id: existingItem?.id,
        displayName: data.displayName.value,
        description: data.description.value,
        amount: data.amount.value,
        type: data.type.value,
        dimensions: {
          length: data.length.value,
          width: data.width.value,
          height: data.height.value,
          depth: data.depth.value,
        },
      } satisfies Partial<Inventory>;

      try {
        await fetch("/api/inventory", {
          method: "POST",
          body: JSON.stringify(item),
        });
        setOpen(false);
        router.refresh();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    },
    [existingItem?.id, router]
  );

  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        setLoading(false);
      }}
    >
      <SheetTrigger asChild>
        <Button
          variant='default'
          className={className}
          onClick={() => setOpen(true)}
        >
          {label}
        </Button>
      </SheetTrigger>
      <SheetContent side='bottom' className='flex flex-col w-full items-center'>
        <SheetHeader className='w-full max-w-lg'>
          <SheetTitle>New delivery</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={onSubmit}
          className='flex flex-col max-h-[70vh] md:max-h-none'
        >
          <div className='flex flex-col gap-4 p-4 text-darkest-blue w-full max-w-lg md:grid-cols-2 md:grid md:flex-wrap overflow-y-auto'>
            <Input
              label='Name'
              name='displayName'
              defaultValue={existingItem?.displayName}
            />
            <Input label='Type' name='type' defaultValue={existingItem?.type} />
            <Input
              label='Length'
              name='length'
              type='number'
              defaultValue={existingItem?.dimensions?.length}
            />
            <Input
              label='Width'
              name='width'
              type='number'
              defaultValue={existingItem?.dimensions?.width}
            />
            <Input
              label='Height'
              name='height'
              type='number'
              defaultValue={existingItem?.dimensions?.height}
            />
            <Input
              label='Depth'
              name='depth'
              type='number'
              defaultValue={existingItem?.dimensions?.depth}
            />
            <Input
              label='Description'
              name='description'
              className='md:col-span-2'
              defaultValue={existingItem?.description}
            />
            <Input
              label='Amount ($)'
              name='amount'
              type='number'
              defaultValue={existingItem?.amount}
            />
            <Input
              label='Images'
              name='images'
              type='file'
              defaultValue={existingItem?.images}
            />
            {/* <ImageInput id='images' onChange={(name) => setImages(name)} /> */}
          </div>
          <SheetFooter className='pt-4'>
            <SubmitButton
              className='bg-primary rounded-sm p-6'
              loading={loading}
            >
              Save changes
            </SubmitButton>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, className, ...rest }: Input) {
  return (
    <label className={`flex flex-col gap-2 text-black ${className}`}>
      {label}
      <input
        className='w-full rounded-sm p-2 border-darker-blue border-2 text-md'
        type='text'
        {...rest}
      />
    </label>
  );
}

interface Select extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

function Select({ label, options, ...rest }: Select) {
  return (
    <label className='flex flex-col gap-2 text-black'>
      {label}
      <select
        className='w-full rounded-sm p-2 border-darker-blue border-2 text-md'
        type='text'
        {...rest}
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
}

const timeOptions = [
  "00:00 AM",
  "00:30 AM",
  "01:00 AM",
  "01:30 AM",
  "02:00 AM",
  "02:30 AM",
  "03:00 AM",
  "03:30 AM",
  "04:00 AM",
  "04:30 AM",
  "05:00 AM",
  "05:30 AM",
  "06:00 AM",
  "06:30 AM",
  "07:00 AM",
  "07:30 AM",
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

const sourceOptions = [
  "Facebook Marketplace",
  "OfferUp",
  "Craigslist",
  "Website",
  "Other",
];
