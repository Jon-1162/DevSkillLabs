import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
export default function Hero() {
  return (
    <section className="px-3  md:h-[50vh] lg:h-[60vh] relative top-0 flex justify-center items-center z-[-1]">
      <BackgroundRippleEffect />
      <div className="mx-auto w-full md:w-[90%] lg:w-[80%] xl:w-[70%] text-center z-10 mt-8 ">
        <h1 className="lg:text-7xl md:text-5xl  text-3xl pt-20  lg:pt-20 font-bold leading-7 md:leading-11 lg:leading-16 lg:tracking-tight mb-5">
          <span className="bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Use data from real job postings to learn what you need to get hired as a Dev.
          </span>
        </h1>

        <p className="mx-auto text-sm md:text-base md:w-[60%] lg:w-[58%] lg:text-2xl text-gray-600">
          The most data driven resource to understand the market demands for software engineering.
        </p>
      </div>
    </section>
  );
}
