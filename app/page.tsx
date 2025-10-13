"use client";

// CLERK!!!
import { useUser, PricingTable } from "@clerk/nextjs";

import { auth } from '@clerk/nextjs/server'

import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ScanStats from "./dataVisualization/Stats";
import Header from "./components/Header";
import QueryBarUnLocked from "./components/dataQueryBarUnLocked";
import QueryBarLocked from "./components/dataQueryBarLocked";

// switch to this landing page to this https://www.shadcntemplates.com/theme/ixartz-saas-boilerplate/

export default function Home() {
  // CLERK!!!
  const hasClerkKeys =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.CLERK_SECRET_KEY;

  // let hasSubscription = false;

  // To reenable this code the function must be async OR just import this code as a util
  // if (hasClerkKeys) {
  //   try {
  //     const { has } = await auth();
  //     hasSubscription = has({ plan: "dev_skill_labs_" });
  //   } catch (error) {
  //     console.warn("Clerk auth error:", error);
  //     hasSubscription = false;
  //   }
  // }

  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div>
      <Header />
      <main className="relative 2xl:max-w-[1440px] mx-auto">
        <div className="absolute top-[340px] md:top-[550px] lg:top-[720px] xl:top-[650px] left-0 w-full border border-gray-300 z-0"></div>

        {/* Hero Section */}
        <div className="w-full">
          <div className="py-8">
            <Hero />
          </div>

          {/* Query Bar Section */}
          <section id="query-section" className="space-y-10 w-[95%] md:w-[85%] mx-auto border-gray-300 border-r border-l z-30">
            <div className="py-8">
              {isSignedIn ? <QueryBarUnLocked /> : <QueryBarLocked />}
            </div>
            <div className="pt-8 pb-20 xl:pb-36">
              <ScanStats />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
