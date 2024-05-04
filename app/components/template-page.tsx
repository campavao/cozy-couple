import { ReactNode } from "react";
import { BackButton } from "./BackButton";

export function TemplatePage({
  title,
  subHeader,
  children,
  rightButton,
}: {
  title: string;
  subHeader?: ReactNode;
  children: ReactNode;
  rightButton?: ReactNode;
}) {
  return (
    <div className='w-full flex flex-col items-center md:p-20'>
      <div className='w-full flex flex-col max-w-xl gap-4'>
        <h1>{title}</h1>
        {subHeader && (
          <div className='bg-white rounded-md px-4 text-darkest-blue'>
            {subHeader}
          </div>
        )}
        <div className='bg-white rounded-md px-4 text-darkest-blue'>
          {children}
        </div>
        <div className='flex items-center justify-between'>
          <BackButton />
          {rightButton}
        </div>
      </div>
    </div>
  );
}
