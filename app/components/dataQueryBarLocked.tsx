"use client";

import React, { useEffect, useState } from "react";
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
import { useClerk } from "@clerk/nextjs";

export default function QueryBarLocked() {
  // TODO make this a util function call
  const { openSignIn } = useClerk();
  const requireSignIn = () => {
    openSignIn({ afterSignInUrl: "/" });
  };
  const {
    location,
    setLocation,
    category,
    setCategory,
    timeFrame,
    setTimeFrame,
    fanng,
    setFanng,
    experience,
    setExperience
  } = useQuery();

  const [searchBarCategory, setSearchBarCategory] = useState("Software_Engineer");
  const [searchBarLocation, setSearchBarLocation] = useState("United_States");
  const [searchBarFanng, setSearchBarFanng] = useState("All US Companies (default)");
  const [searchBarTimeFrame, setSearchBarTimeFrame] = useState("10-2025");
  const [searchBarExp, setSearchBarExp] = useState("Mid");

  const fanngSelectBool = searchBarFanng !== "All US Companies (default)";
  const oldDataCheck: boolean = searchBarTimeFrame == "9-2025"

  if (fanngSelectBool) {
    requireSignIn();
    setSearchBarFanng("All US Companies (default)");
  }

  const handleClickSearch = () => {
    // console.log("Debug | HandleClickSearch")
    setCategory(searchBarCategory);
    setExperience(searchBarExp)
    setLocation(searchBarLocation);
    setFanng("All US Companies (default)");
    setTimeFrame(searchBarTimeFrame);
  };

  return (
    <div className="flex justify-center px-4 lg:py-20 ">
      <div className="w-full ">
        {/* Header */}
        <div className="text-center  mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Analyze Job Market Data
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm  md:text-base lg:text-xl">
            Want more options? Send me a suggestion with the chat icon 👀↘️
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm  md:text-base lg:text-xl bold">
            <b>Want to see company specific data? Make a free account.</b>
          </p>
        </div>

        {/* Query Form */}
        <div className="w-full flex flex-col gap-5 justify-center mt-14 items-center">
          <div className="bg-white/80 dark:bg-gray-900/80 lg:w-5/6  w-full  border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-evenly items-center md:items-center text-center gap-6 w-full">
              {/* Role Selection */}
              <div className="w-48 flex flex-col items-center">
                <Select
                  value={searchBarCategory}
                  onValueChange={setSearchBarCategory}
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
              {/* Experience */}
              <div className="w-48 flex flex-col items-center">
                <Select
                  value={searchBarExp}
                  onValueChange={setSearchBarExp}
                  disabled={fanngSelectBool}
                >
                  <SelectTrigger className="h-10 border-2 hover:border-indigo-300">
                    <SelectValue placeholder="Entry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Intern">Intern</SelectItem>
                    <SelectItem value="Entry">Entry</SelectItem>
                    <SelectItem value="Mid">Mid</SelectItem>
                  </SelectContent>
                </Select>
                <label className=" text-xs mt-1 flex items-center justify-center gap-2 font-medium text-gray-500 dark:text-gray-300 mb-2">
                  Experience
                </label>
              </div>
              {/* Location Selection */}
              <div className="w-48 flex flex-col items-center">
                <Select
                  value={searchBarLocation}
                  onValueChange={setSearchBarLocation}
                  disabled={fanngSelectBool}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 focus:border-indigo-500 transition-colors">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United_States">
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
                    <SelectItem value="New_York">
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
                    <SelectItem value="North_Carolina">
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
              <div className="w-48 flex flex-col items-center">
                <Select
                  value={searchBarFanng}
                  onValueChange={setSearchBarFanng}
                >
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
                    <SelectItem value="Meta">
                      <div className="flex items-center gap-2">
                        <LockKeyhole size={16} />
                        <span>Meta</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Amazon">
                      <div className="flex items-center gap-2">
                        <LockKeyhole size={16} />
                        <span>Amazon</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Netflix">
                      <div className="flex items-center gap-2">
                        <LockKeyhole size={16} />
                        <span>Netflix</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Nvidia">
                      <div className="flex items-center gap-2">
                        <LockKeyhole size={16} />
                        <span>Nvidia</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Google">
                      <div className="flex items-center gap-2">
                        <LockKeyhole size={16} />
                        <span>Google</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <label className="relative group text-xs mt-1 flex items-center justify-center gap-2 font-medium text-gray-500 dark:text-gray-300 cursor-help">
                  FAANG Companies*
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 hidden group-hover:flex w-max max-w-xs text-[10px] bg-gray-800 text-white dark:bg-gray-700 px-2 py-1 rounded-md shadow-lg">
                    *default includes a general market sample for a given location, not just all FAANG companies
                  </span>
                </label>
              </div>
              {/* Time Frame Selection */}
              <div className="w-48 flex flex-col items-center">
                <Select
                  value={searchBarTimeFrame}
                  onValueChange={setSearchBarTimeFrame}
                >
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
                    <SelectItem value="10-2025">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>October 2025</span>
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
            <p className="text-sm text-gray-500">{oldDataCheck ? "Hi 👋, data from Sep 2025 is older so only has 'Mid' experience data available.": ""}</p>
          </div>
          <div className="flex justify-center w-fit items-center">
            <Button
              variant="default"
              className="h-12 px-10 bg-primary text-white w-[220px]  font-semibold hover:bg-primary/90"
              // TODO put new search bar hooks in here instead
              disabled={!category || !location || !timeFrame}
              onClick={handleClickSearch}
            >
              <Search size={18} className="mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
