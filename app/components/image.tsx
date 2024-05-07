"use client";
import { useCallback, useState } from "react";
import Spinner from "./Spinner";
import Image from "next/image";
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { SubmitButton } from "./SubmitButton";
import { Item } from "../types/types";
import { getUrlBase } from "../utils/utils";
import omit from "lodash/omit";

interface LoadingImage extends ImageProps {
  containerClassName?: string;
  src: string;
  item: Item;
}

const regex = /%2F([^?]+)/;

export function LoadingImage({
  containerClassName = "relative w-full h-full",
  item,
  ...props
}: LoadingImage) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  const id = props.src.match(regex)?.[1];

  const onDelete = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (id == null) {
        return;
      }

      setDeleteLoading(true);

      try {
        await fetch(`/api/images/${id}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error(err);
      } finally {
        const urlBase = getUrlBase(item);
        const updatedItem = {
          ...omit(item, "type"),
          images: item.images.filter((src) => src !== props.src),
        };

        await fetch(`/api/${urlBase}`, {
          method: "POST",
          body: JSON.stringify(updatedItem),
        });

        setIsOpen(false);
        setDeleteLoading(false);
        router.refresh();
      }
    },
    [id, item, router, props.src]
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger className={containerClassName}>
        {loading && <Spinner className='absolute top-1/2 left-1/2' />}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image {...props} onLoad={() => setLoading(false)} priority />
      </DialogTrigger>
      <DialogContent className='max-h-[90%] flex flex-col justify-center items-center'>
        <a
          href={props.src}
          className='inline-block relative min-h-[300px]'
          target='_blank'
          rel='noopener noreferrer'
        >
          {loading && <Spinner className='absolute top-1/2 left-1/2' />}
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            {...props}
            className='md:max-h-none max-h-[500px] object-contain'
            onLoad={() => setLoading(false)}
          />
        </a>
        <DialogFooter>
          <SubmitButton
            loading={deleteLoading}
            variant='destructive'
            onClick={onDelete}
          >
            Delete
          </SubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function LoadingIcon({ containerClassName, ...props }: LoadingImage) {
  const [loading, setLoading] = useState(true);

  return (
    <div className='relative w-[50px] h-[50px] rounded-xl'>
      {loading && <Spinner className='absolute w-[25px] h-[25px] top-1/2' />}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        alt=''
        style={{
          objectFit: "cover",
          height: "50px",
          visibility: loading ? "hidden" : "visible",
        }}
        className='rounded-xl'
        src={props.src}
        width={50}
        height={50}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
