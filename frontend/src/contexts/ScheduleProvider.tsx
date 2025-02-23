"use client";

import { ISchedule, IScheduleRequest } from "@/types/schedule";
import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the type for the context state
interface ScheduleContextProps {
  data: ISchedule[] | null;
  setData: (data: ISchedule[] | null) => void;
  request: IScheduleRequest;
  setRequest: (request: IScheduleRequest) => void;
  initRequest: () => void;
}

// Create the context
const ScheduleContext = createContext<ScheduleContextProps | undefined>(
  undefined
);

// Define the provider component
const ScheduleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ISchedule[] | null>(null);
  const [request, setRequest] = useState<IScheduleRequest>({
    employeeId: 0,
    schedule: {},
  });

  const initRequest = () => {
    setRequest({
      employeeId: 0,
      schedule: {},
    });
  };


  return (
    <ScheduleContext.Provider
      value={{
        data,
        setData,
        request,
        setRequest,
        initRequest,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

// Custom hook to use the context
export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error(
      "useScheduleContext must be used within a ScheduleProvider"
    );
  }
  return context;
};

export { ScheduleProvider };
