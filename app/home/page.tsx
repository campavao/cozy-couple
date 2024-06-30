import { BoxesIcon, LineChart, RouteIcon, TruckIcon } from "lucide-react";
import { ReactNode } from "react";
import { Login } from "../components/Login";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth";
import { Footer } from "../components/Footer";
import Image from "next/image";
import adamImg from "../adam.jpg";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='flex flex-col gap-4 items-center'>
        <h1 className='text-[80px] md:text-[120px]'>FlipTrack</h1>
        <p className='text-[20px]'>Couch reselling made easy</p>
        <Login variant='secondary' signInText='Get Started for Free' />
      </div>
      <div className='flex flex-col md:flex-row gap-8'>
        <IconCard
          icon={<TruckIcon size={90} />}
          title='Organize Deliveries and Pickups'
          description='Keep track of all your deliveries and pickups in one place. No more missed appointments or lost items.'
        />
        <IconCard
          icon={<BoxesIcon size={90} />}
          title='Inventory Management'
          description='Easily manage your couch inventory with detailed listings.'
        />
        <IconCard
          icon={<LineChart size={90} />}
          title='Profit Analytics'
          description='Monitor your profit margins with insightful analytics that show your earnings month over month.'
        />
        <IconCard
          icon={<RouteIcon size={90} />}
          title='Automatic Route Planning'
          description='Optimize your daily routes based on pickup and delivery time windows, saving you time and fuel.'
        />
      </div>
      <div className='border w-20'></div>
      <div className='flex flex-col gap-8'>
        <h2 className='text-xl'>How it works</h2>
        <HowItWorksCard
          image={undefined}
          title='Step 1: Sign up for FlipTrack'
          description='Quick and easy registration process.'
        />
        <HowItWorksCard
          image={undefined}
          title='Step 2: Enter Your Deliveries and Pickups'
          description='Input all your delivery and pickup details into the app.'
        />
        <HowItWorksCard
          image={undefined}
          title='Step 3: Manage Your Inventory'
          description='Add couches to your inventory with videos and photos.'
        />
        <HowItWorksCard
          image={undefined}
          title='Step 4: Track Profits and Optimize Routes'
          description='View your profit analytics and let FlipTrack plan your most efficient routes.'
        />
      </div>
      <div className='border w-20'></div>

      <div className='flex flex-col items-center gap-4'>
        <h2>Testimonials</h2>
        <div>
          <div className='flex items-center border border-white rounded-md p-4 flex-col sm:flex-row sm:w-[500px] sm:gap-4'>
            <Image
              className='rounded-full shadow-flat'
              src={adamImg}
              alt=''
              width={150}
              height={150}
            />
            <blockquote className='flex flex-col justify-evenly h-[150px]'>
              &quot;It&apos;s made my business so much more efficient. It&apos;s
              completely streamlined all of my logistics.&quot;
              <br />
              <span>
                <strong>Adam Ascensao</strong> Cozy Couple
              </span>
            </blockquote>
          </div>
        </div>
      </div>
      <div className='border w-20'></div>
      <div className='bg-lightest-blue text-darkest-blue rounded-md p-4 flex flex-col items-center gap-4'>
        <h2>Sign up for FlipTrack today and start saving time and money!</h2>
        <Login signInText='Sign up' />
      </div>
    </div>
  );
}

function IconCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className='flex flex-col w-72 md:w-48 items-center text-center rounded-lg border-lightest-blue border-2 shadow-md shadow-darker-blue hover:shadow-lg'>
      <div className='flex items-center h-48'>{icon}</div>
      <div className='flex flex-col gap-4 bg-lightest-blue text-darkest-blue p-4 h-full'>
        <strong className='md:h-12'>{title}</strong>
        <div>{description}</div>
      </div>
    </div>
  );
}

function HowItWorksCard({
  image,
  title,
  description,
}: {
  image: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className='flex flex-col gap-2'>
      {image}
      <strong>{title}</strong>
      <div>{description}</div>
    </div>
  );
}

