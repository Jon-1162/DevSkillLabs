"use client";
import React, { createContext, useContext, useState } from "react";

type QueryContextType = {
  location: string;
  setLocation: (loc: string) => void;
  category: string;
  setCategory: (cat: string) => void;
  timeFrame: string;
  setTimeFrame: (time: string) => void;
};

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [timeFrame, setTimeFrame] = useState("");

  return (
    <QueryContext.Provider
      value={{ location, setLocation, category, setCategory, timeFrame, setTimeFrame }}
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
