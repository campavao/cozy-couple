"use client";
import { useState } from "react";
import Spinner from "./Spinner";
import Image from "next/image";
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

interface LoadingImage extends ImageProps {
  containerClassName?: string;
  src: string;
}

export function LoadingImage({
  containerClassName = "relative w-full h-full",
  ...props
}: LoadingImage) {
  const [loading, setLoading] = useState(true);

  return (
    <Dialog>
      <DialogTrigger className={containerClassName}>
        {loading && <Spinner className='absolute top-1/2 left-1/2' />}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image {...props} onLoad={() => setLoading(false)} />
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
