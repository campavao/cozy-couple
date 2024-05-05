
interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
  }

  export function Input({ label, className, ...rest }: Input) {
    return (
      <label className={`flex flex-col gap-2 text-black ${className}`}>
        {label}
        <input
          className='w-full rounded-sm p-2 border-darker-blue border-2 text-md'
          type='text'
          {...rest}
        />
      </label>
    );
  }
