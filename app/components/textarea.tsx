interface Textarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, className, ...rest }: Textarea) {
  return (
    <label className={`flex flex-col gap-2 text-black ${className}`}>
      {label}
      <textarea
        className='w-full rounded-sm p-2 border-darker-blue border-2 text-md'
        {...rest}
      />
    </label>
  );
}
