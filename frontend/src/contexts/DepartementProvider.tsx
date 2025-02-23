// Filename: MyContextProvider.tsx

"use client";

import { IDepartement, IDepartementRequest } from "@/types/departement";
import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the type for the context state
interface DepartementContextProps {
  data: IDepartement[] | null;
  setData: (data: IDepartement[] | null) => void;
  request: IDepartementRequest;
  setRequest: (request: IDepartementRequest) => void;
  initRequest: () => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
}

// Create the context
const DepartementContext = createContext<DepartementContextProps | undefined>(
  undefined
);

// Define the provider component
const DepartementProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<IDepartement[] | null>(null);
  const [request, setRequest] = useState<IDepartementRequest>({
    name: "",
  });
  const initRequest = () => {
    setRequest({
      name: "",
    });
  };

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  return (
    <DepartementContext.Provider
      value={{
        data,
        setData,
        request,
        setRequest,
        initRequest,
        searchKeyword,
        setSearchKeyword,
      }}
    >
      {children}
    </DepartementContext.Provider>
  );
};

// Custom hook to use the context
export const useDepartementContext = () => {
  const context = useContext(DepartementContext);
  if (!context) {
    throw new Error(
      "useDepartementContext must be used within a DepartementProvider"
    );
  }
  return context;
};

export { DepartementProvider };
