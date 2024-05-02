import { ReactNode } from "react";
import { BackButton } from "./BackButton";

export function TemplatePage({
  title,
  children,
  rightButton,
}: {
  title: string;
  children: ReactNode;
  rightButton?: ReactNode;
}) {
  return (
    <div className='w-full flex flex-col items-center md:p-20'>
      <div className='w-full flex flex-col max-w-xl gap-4'>
        <h1>{title}</h1>
        <div className='bg-white rounded-md p-4 text-darkest-blue'>
          {children}
        </div>
        <div className='flex justify-between'>
          <BackButton />
          {rightButton}
        </div>
      </div>
    </div>
  );
}
