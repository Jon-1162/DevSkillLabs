// CLERK!!!
// import { PricingTable } from "@clerk/nextjs";
// import { useAuth } from "@clerk/nextjs";
// import { auth } from '@clerk/nextjs/server'


import { ArrowRight, CreditCard, Database, Section } from 'lucide-react';
import QueryBar from "./queryBar";

import { Hero } from "./Hero";

import ScanStats from "./dataVisualization/Stats";



// switch to this landing page to this https://www.shadcntemplates.com/theme/ixartz-saas-boilerplate/

export default async function Home() {
  // CLERK!!!
  // const { has } = await auth()

  // CLERK!!!
  // const hasSubscription = has({ plan: 'dev_skill_labs_' })


  
  return (
 <main>
      <section className="py-10">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero/>
          <div>Re-select the date drop down when you fill out a query.</div>
     
        </div>
      </section>
      {/* This needs to be centered */}
      <QueryBar />
      
      <div className="flex justify-center">
        <ScanStats/> 
                      {/* {hasSubscription ? (
                        <ScanStats/>                        
                      ) : (
                        <div>
                        <h1>Basic Stats.</h1>
                        <p>You have no subscription. Consider upgrading to a paid plan.</p>
                        <PricingTable />
                        </div>
                      )} */}
      </div>
      {/* TODO force this to bottom */}
      <div>footer</div>
    </main>
  );
}








