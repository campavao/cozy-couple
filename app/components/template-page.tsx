import { ReactNode } from "react";
import { BackButton } from "./BackButton";

export function TemplatePage({
  title,
  subHeader,
  children,
  rightButton,
  isWide,
}: {
  title: string;
  subHeader?: ReactNode;
  children: ReactNode;
  rightButton?: ReactNode;
  isWide?: boolean;
}) {
  return (
    <div className='w-full flex flex-col items-center'>
      <div
        className={`w-full flex flex-col  gap-4 ${
          isWide ? "max-w-none" : "max-w-xl"
        }`}
      >
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
