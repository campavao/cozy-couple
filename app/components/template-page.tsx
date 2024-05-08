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
        <div className='flex items-center justify-between'>
          <BackButton />
          <h1>{title}</h1>
          <div>{rightButton}</div>
        </div>
        {subHeader && (
          <div className='bg-white rounded-lg px-4 text-darkest-blue'>
            {subHeader}
          </div>
        )}
        <div className='bg-white rounded-lg px-4 text-darkest-blue'>
          {children}
        </div>
      </div>
    </div>
  );
}
