import Spinner from "./components/Spinner";

export default function Loading() {
  return (
    <div className='w-full absolute top-8 flex flex-col items-center gap-4'>
      <p>Loading</p>
      <Spinner />
    </div>
  );
}
