import Link from "next/link";
import { authOptions } from "./api/auth";
import { getServerSession } from "next-auth/next";
import { Login } from "./components/Login";
import { isUserSubscribed } from "./api/apiUtils";
import { redirect } from "next/navigation";

async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/home");
  }

  const isSubscribed = await isUserSubscribed();

  if (!isSubscribed && process.env.SUBSCRIBE_STATUS === "force") {
    redirect("/subscription");
  }

  return (
    <div className='flex flex-col justify-center items-center h-[90%] gap-8'>
      <h1 className='font-bold text-[24px] md:text-[60px]'>FlipTrack</h1>
      <div className='flex flex-col gap-4 text-center'>
        <Link href='/today'>Today</Link>
        <Link href='/deliveries'>Deliveries</Link>
        <Link href='/inventory'>Inventory</Link>
        <Link href='/pickups'>Pickups</Link>
        <Link href='/analytics'>Analytics</Link>
        <Link href='/contact'>Contact</Link>
        {!isSubscribed && <Link href='/subscription'>Subscribe</Link>}
        <Login isSignout />
      </div>
    </div>
  );
}

export default Home;
