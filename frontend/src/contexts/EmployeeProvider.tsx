// Filename: EmployeeProvider.tsx

"use client";

import { IEmployee, IEmployeeRequest } from "@/types/employee";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { useGlobalContext } from "./GlobalProvider";

// Define the type for the context state
interface EmployeeContextProps {
  data: IEmployee[] | null;
  setData: (data: IEmployee[] | null) => void;
  request: IEmployeeRequest;
  setRequest: (request: IEmployeeRequest) => void;
  initRequest: () => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;

  employee: IEmployee | null;
  setEmployee: (employee: IEmployee | null) => void;
}

// Create the context
const EmployeeContext = createContext<EmployeeContextProps | undefined>(
  undefined
);

// Define the provider component
const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // get departement id form local storage using the GlobalProvider
  const { getDepartementIDFromLocalStorage } = useGlobalContext();
  const [departementID, setDepatementID] = useState<number | null>(null);

  // get departement id from local storage
  // Use effect to get departement id from local storage and update the request
  React.useEffect(() => {
    const storedDepartementID = getDepartementIDFromLocalStorage();
    if (storedDepartementID) {
      setDepatementID(storedDepartementID);
      // Update request state with the fetched departementID
      setRequest((prevRequest) => ({
        ...prevRequest,
        departementId: storedDepartementID,
      }));
    }
  }, [getDepartementIDFromLocalStorage]);

  // Define the state
  const [data, setData] = useState<IEmployee[] | null>(null);
  const [request, setRequest] = useState<IEmployeeRequest>({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    job: "",
    departementId: departementID ? departementID : 1,
    isSecretary: false,
  });

  const initRequest = () => {
    setRequest({
      username: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      job: "",
      departementId: 1,
      isSecretary: false,
    });
  };

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [employee, setEmployee] = useState<IEmployee | null>(null);

  return (
    <EmployeeContext.Provider
      value={{
        data,
        setData,
        request,
        setRequest,
        initRequest,
        searchKeyword,
        setSearchKeyword,
        employee,
        setEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

// Custom hook to use the context
export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  }
  return context;
};

export { EmployeeProvider };
