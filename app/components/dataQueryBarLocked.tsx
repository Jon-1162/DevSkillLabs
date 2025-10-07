"use client";

import React, { createContext, useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Calendar, MapPin, Briefcase, LockKeyhole } from "lucide-react";
import { useQuery } from "../context/QueryContext";
// TODO add filter to node graph to only see frameworks/dbs/languages/ect
export default function QueryBarLocked() {
  const {
    location,
    setLocation,
    category,
    setCategory,
    timeFrame,
    setTimeFrame,
    fanng,
    setFanng,
  } = useQuery();

  const fanngSelectBool = fanng !== "All US Companies (default)";

  return (
    <div className="flex justify-center px-4 lg:py-20 ">
      <div className="w-full ">
        {/* Header */}
        <div className="text-center  mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Analyze Job Market Data
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm  md:text-base lg:text-xl">
            Select your criteria to explore skill demand patterns
          </p>
        </div>

        {/* Query Form */}
        <div className="w-full flex flex-col gap-5 justify-center mt-14 items-center">
          <div className="bg-white/80 dark:bg-gray-900/80 lg:w-5/6  w-full  border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
              {/* Role Selection */}
              <div className="">
                <Select
                  value={category}
                  onValueChange={setCategory}
                  disabled={fanngSelectBool}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 focus:border-indigo-500 transition-colors">
                    <SelectValue placeholder="Select job role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software_Engineer">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span>Software Engineer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Frontend_Developer">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span>Frontend Developer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Backend_Developer">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span>Backend Developer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Full_Stack_Developer">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span>Full Stack Developer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Data_Scientist">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span>Data Scientist</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Machine_Learning_Engineer">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span>Machine Learning Engineer</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <label className=" text-xs mt-1 flex items-center justify-center gap-2 font-medium text-gray-500 dark:text-gray-300 mb-2">
                  Job Role
                </label>
              </div>

              {/* Location Selection */}
              <div className="">
                <Select
                  value={location}
                  onValueChange={setLocation}
                  disabled={fanngSelectBool}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 focus:border-indigo-500 transition-colors">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>USA</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="California">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>California</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Texas">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Texas</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="New York">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>New York</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Florida">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Florida</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Virginia">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Virginia</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Washington">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Washington</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Illinois">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Illinois</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Massachusetts">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Massachusetts</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Pennsylvania">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Pennsylvania</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Georgia">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Georgia</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="North Carolina">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>North Carolina</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <label className=" text-xs mt-1 flex items-center justify-center gap-2 font-medium text-gray-500 dark:text-gray-300 mb-2">
                  Location
                </label>
              </div>

              {/* FANNG Selection */}
              <div className="">
                <Select value={fanng} onValueChange={setFanng}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 focus:border-indigo-500 transition-colors">
                    <SelectValue placeholder="All US Companies (default)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All US Companies (default)">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span>All US Companies (default)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Locked">
                      <div className="flex items-center gap-2">
                        <LockKeyhole size={16} />
                        <span>Meta</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Locked">
                      <div className="flex items-center gap-2">
                        <LockKeyhole size={16} />
                        <span>Amazon</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Locked">
                      <div className="flex items-center gap-2">
                        <LockKeyhole size={16} />
                        <span>Netflix</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Locked">
                      <div className="flex items-center gap-2">
                        <LockKeyhole size={16} />
                        <span>Nvidia</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Locked">
                      <div className="flex items-center gap-2">
                        <LockKeyhole size={16} />
                        <span>Google</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <label className="text-xs mt-1 flex items-center justify-center gap-2 font-medium text-gray-500 dark:text-gray-300">
                  FAANG Company
                </label>
                <p className="text-[9px] text-gray-400 dark:text-gray-500 text-center">
                  Default: includes all companies in the market, not just FANNG
                </p>
              </div>

              {/* Time Frame Selection */}
              <div className="">
                <Select value={timeFrame} onValueChange={setTimeFrame}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 focus:border-indigo-500 transition-colors">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9-2025">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>September 2025</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <label className=" text-xs mt-1 flex items-center justify-center gap-2 font-medium text-gray-500 dark:text-gray-300 mb-2">
                  Time Period
                </label>
              </div>

              {/* Search Button */}
            </div>
          </div>
          <div className=" flex justify-center w-fit items-center">
            {/* <Button variant="default"
            className="h-12 px-10 bg-primary text-white w-[220px]  font-semibold hover:bg-primary/90"
            disabled={!category || !location || !timeFrame}
          >
            <Search size={18} className="mr-2" />
            Search
          </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
