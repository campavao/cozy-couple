"use client";
import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Sheet,
} from "@/components/ui/sheet";
import ImageInput from "../components/image-input";
import { FormEventHandler, useCallback, useRef, useState } from "react";
import { Delivery } from "../types/types";
import { SubmitButton } from "../components/SubmitButton";
import { revalidatePath } from "next/cache";

export function Create() {
  const [open, setOpen] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = e.target as any;
    const delivery = {
      address: data.address.value,
      phone: data.phone.value,
      name: data.nameOfPerson.value,
      deliveryDate: data.deliveryDate.value,
      description: data.description.value,
      amount: data.amount.value,
      source: data.source.value,
    } satisfies Partial<Delivery>;

    try {
      await fetch("/api/delivery", {
        method: "POST",
        body: JSON.stringify(delivery),
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }

    console.log(data.address.value);
  }, []);

  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        setLoading(false);
      }}
    >
      <SheetTrigger asChild>
        <Button variant='default' onClick={() => setOpen(true)}>
          Create
        </Button>
      </SheetTrigger>
      <SheetContent side='bottom' className='flex flex-col w-full items-center'>
        <SheetHeader className='w-full max-w-lg'>
          <SheetTitle>New delivery</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={onSubmit}
          className='flex flex-col gap-4 p-4 text-darkest-blue w-full max-w-lg'
        >
          <Input label='Address' name='address' type='address' />
          <Input label='Phone' name='phone' type='tel' />
          <Input label='Name' name='nameOfPerson' />
          <Input label='Delivery Date' name='deliveryDate' type='date' />
          <Input label='Description' name='description' />
          <Input label='Amount ($)' name='amount' type='number' />
          <Input label='Source' name='source' />
          <Input label='Images' name='images' type='file' />
          {/* <ImageInput id='images' onChange={(name) => setImages(name)} /> */}
          <SheetFooter>
            <SubmitButton loading={loading}>Save changes</SubmitButton>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, ...rest }: Input) {
  return (
    <label className='text-black'>
      {label}
      <input
        className='w-full rounded-sm p-2 border-darker-blue border-2'
        type='text'
        {...rest}
      />
    </label>
  );
}
