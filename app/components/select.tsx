interface Select extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly string[];
}

export function Select({ label, options, ...rest }: Select) {
  return (
    <label className='flex flex-col gap-2 text-black'>
      {label}
      <select
        className='w-full rounded-sm p-2 border-darker-blue border-2 text-md'
        type='text'
        {...rest}
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
}
