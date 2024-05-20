import Spinner from "./components/Spinner";

export default function Loading() {
  return (
    <div className='w-full ml-[-1rem] md:ml-0 absolute top-8 flex flex-col items-center gap-4'>
      <p>Loading</p>
      <Spinner />
    </div>
  );
}
