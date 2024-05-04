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
import { FormEventHandler, useCallback, useState } from "react";
import { Pickup } from "../types/types";
import { SubmitButton } from "../components/SubmitButton";
import { formatDateForInput, uploadImage } from "../utils/utils";
import { useRouter } from "next/navigation";

interface Create {
  label?: string;
  className?: string;
  existingPickup?: Pickup;
}

export function Create({
  label = "Create",
  className,
  existingPickup,
}: Create) {
  const [open, setOpen] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const data = e.target as any;

      const pickup: Partial<Pickup> = {
        ...existingPickup,
        pickupDate: data.pickupDate.value,
        link: data.link.value,
        description: data.description.value,
        amount: data.amount.value,
        source: data.source.value,
      };

      const files = Array.from(data.images.files);

      if (files.length > 0) {
        const urls = await Promise.all(
          files.map((file) => uploadImage(file as File))
        );
        const previousUrls = structuredClone(existingPickup?.images ?? []);
        previousUrls.push(...urls);
        pickup.images = previousUrls;
      }

      try {
        await fetch("/api/pickups", {
          method: "POST",
          body: JSON.stringify(pickup),
        });
        setOpen(false);
        router.refresh();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    },
    [existingPickup, router]
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
              label='Link'
              name='link'
              defaultValue={existingPickup?.link}
            />
            <Input
              label='Pickup Date'
              name='pickupDate'
              type='date'
              defaultValue={
                existingPickup?.pickupDate ?? formatDateForInput(new Date())
              }
            />
            <Input
              label='Description'
              name='description'
              className='md:col-span-2'
              defaultValue={existingPickup?.description}
            />
            <Input
              label='Amount ($)'
              name='amount'
              type='number'
              defaultValue={existingPickup?.amount}
            />
            <Input
              label='Source'
              name='source'
              defaultValue='Facebook Marketplace'
            />
            <Input
              label='Images'
              name='images'
              type='file'
              accept='image/*, video/*'
              multiple
            />
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
