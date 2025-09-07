"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Globe, MapPin, Briefcase } from "lucide-react";
import { useQuery } from "./context/QueryContext";


export default function QueryBar() {
  const { location, setLocation, category, setCategory, timeFrame, setTimeFrame } = useQuery();
  

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-4xl gap-2 p-4 bg-white rounded-xl shadow-md items-center">
        {/* Category dropdown */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select a role" />
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

        {/* Location dropdown */}
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Arizona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Arizona">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Arizona </span>
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
          </SelectContent>
        </Select>

        {/* Time Frame dropdown */}
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sep 2025" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9-2025">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Sep 2025 </span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Search button */}
        <Button className="h-10">
          <Search size={16} className="mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
}
