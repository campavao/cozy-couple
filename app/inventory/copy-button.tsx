"use client";

import { ReactEventHandler, useCallback } from "react";
import copy from "copy-to-clipboard";

export function CopyButton({ text }: { text: string }) {
  const onClick: ReactEventHandler<HTMLButtonElement> = useCallback(() => {
    copy(text);
  }, [text]);

  return (
    <button onClick={onClick} type='button' className='text-left'>
      {text}
    </button>
  );
}
