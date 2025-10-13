"use client";

import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { CircleChevronDown } from "lucide-react";
export default function Hero() {
  const scrollToSection = () => {
    const section = document.getElementById("query-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="px-3  md:h-[50vh] lg:h-[60vh] relative top-0 flex justify-center items-center ">
      <BackgroundRippleEffect />
      <div className="mx-auto w-full md:w-[90%] lg:w-[80%] xl:w-[70%] text-center z-5 mt-8 ">
        <h1 className="lg:text-6xl md:text-5xl  text-3xl pt-20  lg:pt-20 font-bold leading-7 md:leading-11 lg:leading-16 lg:tracking-tight mb-5">
          <span className="bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            The data-driven look at what skills are actually in demand for developers.
          </span>
        </h1>

        <p className="mx-auto text-sm md:text-base md:w-[60%] lg:w-[58%] lg:text-2xl text-gray-600">
          Have a Look 🙂
        </p>

        <button
          onClick={scrollToSection}
          className="text-gray-600 hover:text-indigo-600 transition-transform duration-300 animate-bounce mt-10"
          aria-label="Scroll to query section"
        >
          <CircleChevronDown size={40} />
        </button>
      </div>
    </section>
  );
}
