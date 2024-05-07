import Link from "next/link";
import { authOptions } from "./api/auth";
import { getServerSession } from "next-auth/next";
import { Login } from "./components/Login";

async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className='flex flex-col justify-center items-center h-[90%] gap-8'>
      <h1 className='font-bold text-lg'>Cozy Couple</h1>
      {session ? (
        <div className='flex flex-col gap-4 text-center'>
          <Link href='/today'>Today</Link>
          <Link href='/deliveries'>Deliveries</Link>
          <Link href='/inventory'>Inventory</Link>
          <Link href='/pickups'>Pickups</Link>
          <Link href='/analytics'>Analytics</Link>
          <Login isSignout />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
