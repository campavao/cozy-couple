"use client";
import { useState } from "react";
import Spinner from "./Spinner";
import Image from "next/image";
import { ImageProps } from "next/dist/shared/lib/get-img-props";

interface LoadingImage extends ImageProps {
  containerClassName?: string;
}

export function LoadingImage({
  containerClassName = "relative w-full h-full",
  ...props
}: LoadingImage) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={containerClassName}>
      {loading && <Spinner className='absolute top-1/2 left-1/2' />}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...props} onLoad={() => setLoading(false)} />
    </div>
  );
}
