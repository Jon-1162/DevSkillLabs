import { PricingTable } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs/server'

// import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Database, Section } from 'lucide-react';
import QueryBar from "./queryBar";
import { CenteredHero } from "./components/CenteredHero";
import { Hero } from "./Hero";
import { Banner } from "./components/Banner";
import { Stats } from "fs";
import ScanStats from "./dataVisualization/Stats";
import NetworkGraph from "./dataVisualization/nodeGraph";
import TreeMapChart from "./dataVisualization/treeMap";


// switch to this landing page to this https://www.shadcntemplates.com/theme/ixartz-saas-boilerplate/

export default async function Home() {
  const { has } = await auth()

  const hasSubscription = has({ plan: 'dev_skill_labs_' })

//   const treemapData = [
//   {
//     name: 'Category A',
//     children: [
//       { name: 'Item A1', size: 100, color: '#ff6b6b' },
//       { name: 'Item A2', size: 150, color: '#4ecdc4' },
//     ],
//   },
//   {
//     name: 'Category B',
//     children: [
//       { name: 'Item B1', size: 200, color: '#45b7d1' },
//       { name: 'Item B2', size: 50, color: '#f9ca24' },
//       { name: 'Item B3', size: 75, color: '#6c5ce7' },
//     ],
//   },
// ];
  
  return (
 <main>
      <section className="py-10">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero/>
     
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








