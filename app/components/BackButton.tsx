import Link from "next/link";

export function BackButton() {
  return (
    <Link className='mt-4 inline-block' href='/'>
      Back
    </Link>
  );
}
