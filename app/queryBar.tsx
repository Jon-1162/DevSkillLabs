"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Globe, MapPin, Briefcase } from "lucide-react";

export default function QueryBar() {
  const [location, setLocation] = React.useState("");
  const [category, setCategory] = React.useState("");

  return (
    <div className="flex w-full max-w-4xl gap-2 p-4 bg-white rounded-xl shadow-md items-center">
      {/* Search input */}
      <div className="flex-1">
        <Input
          placeholder="Search..."
          className="h-10"
        />
      </div>

      {/* Location dropdown */}
      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="global">
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span>Global</span>
            </div>
          </SelectItem>
          <SelectItem value="newyork">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>New York</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Category dropdown */}
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tech">
            <div className="flex items-center gap-2">
              <Briefcase size={16} />
              <span>Tech</span>
            </div>
          </SelectItem>
          <SelectItem value="finance">
            <div className="flex items-center gap-2">
              <Briefcase size={16} />
              <span>Finance</span>
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
  );
}
