import Link from "next/link";
import { authOptions } from "./api/auth";
import { getServerSession } from "next-auth/next";
import { Login } from "./components/Login";
import { Button } from "@/components/ui/button";
import { isUserSubscribed } from "./api/apiUtils";

async function Home() {
  const session = await getServerSession(authOptions);
  const isSubscribed = await isUserSubscribed();

  return (
    <div className='flex flex-col justify-center items-center h-[90%] gap-8'>
      <h1 className='font-bold text-lg'>FlipTrack</h1>
      {session ? (
        <div className='flex flex-col gap-4 text-center'>
          <Link href='/today'>Today</Link>
          <Link href='/deliveries'>Deliveries</Link>
          <Link href='/inventory'>Inventory</Link>
          <Link href='/pickups'>Pickups</Link>
          <Link href='/analytics'>Analytics</Link>
          {!isSubscribed && <Link href='/subscription'>Subscribe</Link>}
          <Login isSignout />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
