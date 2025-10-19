/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { getJobData } from "../services/getJobData";




type QueryContextType = {
  location: string;
  setLocation: (loc: string) => void;
  category: string;
  setCategory: (cat: string) => void;
  timeFrame: string;
  setTimeFrame: (time: string) => void;
  fanng: string;
  setFanng: (company: string) => void;
  jobData: any;
  setJobData: (jobData: any) => void;
};

const restrictedLocations = ["None"];
const restrictedCategories = ["None"];
const realFanngs = ["Meta", "Amazon", "Nvidia", "Netflix", "Google", "All US Companies (default)"];

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [location, _setLocation] = useState("United_States");
  const [category, _setCategory] = useState("Software_Engineer");
  const [timeFrame, setTimeFrame] = useState("9-2025");
  const [fanng, _setFanng] = useState("All US Companies (default)");
  const [jobData, setJobData] = useState(import(`../data/Software_EngineerUnited_States9-2025.json`));


  const router = useRouter();
  const { openSignIn } = useClerk();

  const requireSignIn = () => {
    openSignIn({ afterSignInUrl: "/" });
  };

  const setLocation = (lct: string) => {
    if (restrictedLocations.includes(lct)) {
      requireSignIn();
      return;
    }
    _setLocation(lct);
  };

  const setCategory = (cat: string) => {
    if (restrictedCategories.includes(cat)) {
      requireSignIn();
      return;
    }
    _setCategory(cat);
  };

  const setFanng = (fag: string) => {
    if (!realFanngs.includes(fag)) {
      requireSignIn();
      return;
    }
    _setFanng(fag);
  };


  return (
    <QueryContext.Provider
      value={{
        location,
        setLocation,
        category,
        setCategory,
        timeFrame,
        setTimeFrame,
        fanng,
        setFanng,
        jobData,
        setJobData,
      }}
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
