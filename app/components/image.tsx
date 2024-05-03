"use client";
import { useState } from "react";
import Spinner from "./Spinner";
import Image from "next/image";
import { ImageProps } from "next/dist/shared/lib/get-img-props";

export function LoadingImage(props: ImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className='relative w-full h-full'>
      {loading && <Spinner className='absolute top-1/2 left-1/2' />}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...props} onLoad={() => setLoading(false)} />
    </div>
  );
}
