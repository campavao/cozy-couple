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
import { Inventory } from "../types/types";
import { SubmitButton } from "../components/SubmitButton";
import { useRouter } from "next/navigation";
import { CouchForm, getCouchValues } from "../components/couch-form";
import { Input } from "../components/input";
import { uploadImage } from "../utils/imageUtils";
import { v4 as uuid } from "uuid";
import { formatDateForInput } from "../utils/utils";
import { PlusIcon, EditIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Create {
  label?: string;
  className?: string;
  existingItem?: Inventory;
}

export function Create({ label = "Create", className, existingItem }: Create) {
  const [open, setOpen] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();
  const toaster = useToast();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const data = e.target as any;
      const id = existingItem?.id ?? uuid();

      const item: Partial<Inventory> = {
        ...existingItem,
        id,
        displayName: data.displayName.value,
        description: data.description.value,
        amount: data.amount.value,
        blemishes: data.blemishes.value,
        dateListed: data.dateListed.value,
        couch: getCouchValues(data),
      } satisfies Partial<Inventory>;

      const files = Array.from(data.images.files);

      if (files.length > 0) {
        const rawUrls = await Promise.allSettled(
          files.map((file) => uploadImage(file as File, id))
        );

        const urls = rawUrls
          .map((url) => (url.status === "fulfilled" ? url.value : undefined))
          .filter((url): url is string => url != null);

        const previousUrls = structuredClone(item?.images ?? []);
        const uniqueUrls = new Set([...previousUrls, ...urls]);
        item.images = Array.from(uniqueUrls);

        if (urls.length !== files.length) {
          toaster.toast({
            variant: "destructive",
            title: "Image/video failed to upload",
            description: "Cannot upload images/videos larger than 20mb",
          });
        }
      }

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
    [existingItem, router, toaster]
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
          <SheetTitle>{existingItem ? "Edit" : "New"} inventory</SheetTitle>
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
              label='Name'
              name='displayName'
              defaultValue={existingItem?.displayName}
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
              label='Blemishes'
              name='blemishes'
              defaultValue={existingItem?.blemishes}
            />
            <Input
              label='Date Listed'
              name='dateListed'
              type='date'
              defaultValue={
                existingItem?.dateListed ?? formatDateForInput(new Date())
              }
            />
            <CouchForm couch={existingItem?.couch} />
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
