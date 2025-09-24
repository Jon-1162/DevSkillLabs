"use client";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

type QueryContextType = {
  location: string;
  setLocation: (loc: string) => void;
  category: string;
  setCategory: (cat: string) => void;
  timeFrame: string;
  setTimeFrame: (time: string) => void;
  fanng: string;
  setFanng: (company: string)=> void;
};

const restrictedLocations = ["None"];
const restrictedCategories = ["None"];
const realFanngs = ["Meta", "Amazon", "Nvidia", "Netflix", "Google", "All US Companies (default)"];

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [location, _setLocation] = useState("California");
  const [category, _setCategory] = useState("Software_Engineer");
  const [timeFrame, setTimeFrame] = useState("9-2025");
  const [fanng, _setFanng] = useState("All US Companies (default)");
  const router = useRouter();

  const setLocation = (lct: string) => {
    if (restrictedLocations.includes(lct)) {
      router.push("/pricing");
      return;
    }
    _setLocation(lct);
  };

  const setCategory = (cat: string) => {
    if (restrictedCategories.includes(cat)) {
      router.push("/pricing");
      return;
    }
    _setCategory(cat);
  };

  const setFanng = (fag: string) => {
    if (!realFanngs.includes(fag)) {
      router.push("/pricing");
      return;
    }
    _setFanng(fag);
  };

  return (
    <QueryContext.Provider
      value={{ location, setLocation, category, setCategory, timeFrame, setTimeFrame, fanng, setFanng }}
    >
      {children}
    </QueryContext.Provider>
  );
}

export function useQuery() {
  const ctx = useContext(QueryContext);
  if (!ctx) throw new Error("useQuery must be used inside QueryProvider");
  return ctx;
}
