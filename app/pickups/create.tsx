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
import { PAYMENT_METHOD_TYPES, Pickup } from "../types/types";
import { SubmitButton } from "../components/SubmitButton";
import { formatDateForInput } from "../utils/utils";
import { useRouter } from "next/navigation";
import { Input } from "../components/input";
import { Select } from "../components/select";
import { CouchForm, getCouchValues } from "../components/couch-form";
import { uploadImage } from "../utils/imageUtils";
import { v4 as uuid } from "uuid";
import { EditIcon, PlusIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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
  const toaster = useToast();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const data = e.target as any;
      const id = existingPickup?.id ?? uuid();

      const pickup: Partial<Pickup> = {
        ...existingPickup,
        id,
        address: data.address.value,
        pickupDate: data.pickupDate.value,
        pickupWindow: {
          from: data.pickupWindowFrom.value,
          to: data.pickupWindowTo.value,
        },
        link: data.link.value,
        description: data.description.value,
        amount: data.amount.value,
        source: data.source.value,
        paymentMethod: data.paymentMethod.value,
        couch: getCouchValues(data),
        updatedAt: new Date(),
        createdAt:
          existingPickup?.id != null
            ? existingPickup?.createdAt ?? new Date()
            : new Date(),
      };

      const files = Array.from(data.images.files);

      if (files.length > 0) {
        const rawUrls = await Promise.allSettled(
          files.map((file) => uploadImage(file as File, id))
        );

        const urls = rawUrls
          .map((url) => (url.status === "fulfilled" ? url.value : undefined))
          .filter((url): url is string => url != null);

        const previousUrls = structuredClone(existingPickup?.images ?? []);
        const uniqueUrls = new Set([...previousUrls, ...urls]);
        pickup.images = Array.from(uniqueUrls);

        if (urls.length !== files.length) {
          toaster.toast({
            variant: "destructive",
            title: "Image/video failed to upload",
            description: "Cannot upload images/videos larger than 20mb",
          });
        }
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
    [existingPickup, router, toaster]
  );

  const Icon = label === "Create" ? PlusIcon : EditIcon;

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
          variant='link'
          className='p-0'
          title={label}
          onClick={() => setOpen(true)}
        >
          <Icon color='white' />
        </Button>
      </SheetTrigger>
      <SheetContent side='bottom' className='flex flex-col w-full items-center'>
        <SheetHeader className='w-full max-w-lg'>
          <SheetTitle>{existingPickup ? "Edit" : "New"} pickup</SheetTitle>
        </SheetHeader>
        <form onSubmit={onSubmit} className='flex flex-col max-h-[70vh]'>
          <div className='flex flex-col gap-4 p-4 text-darkest-blue w-full max-w-lg md:grid-cols-2 md:grid md:flex-wrap overflow-y-auto'>
            <Input
              label='Images'
              name='images'
              type='file'
              accept='image/*, video/*'
              multiple
            />
            <Input
              label='Address'
              name='address'
              type='address'
              defaultValue={existingPickup?.address}
            />
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
            <Select
              label='Pickup Window Start Time'
              name='pickupWindowFrom'
              defaultValue={existingPickup?.pickupWindow?.from ?? "10:00 AM"}
              options={timeOptions}
            />
            <Select
              label='Pickup Window End Time'
              name='pickupWindowTo'
              defaultValue={existingPickup?.pickupWindow?.to ?? "03:00 PM"}
              options={timeOptions}
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
              defaultValue={existingPickup?.source}
            />
            <Select
              label='Payment Method'
              name='paymentMethod'
              options={PAYMENT_METHOD_TYPES}
              defaultValue={existingPickup?.paymentMethod}
            />
            <CouchForm couch={existingPickup?.couch} />
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
