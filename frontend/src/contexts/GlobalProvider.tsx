"use client";

import { DynamicAlert } from "@/components/Alert/DynamicAlert";
import {
  IDialog,
  IFetching,
  IID,
  ILoading,
  IMessage,
  IPagination,
  MessageType,
  MyError,
} from "@/types";
import { IDepartement } from "@/types/departement";
import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the type for the context state
interface GlobalContextProps {
  // Alert state
  alertOpen: boolean;
  setAlertOpen: (open: boolean) => void;
  // Message state
  message: IMessage;
  setMessage: (message: IMessage) => void;
  // Loading state
  loading: ILoading;
  setLoading: (loading: ILoading) => void;
  // Fetching state
  fetching: IFetching;
  setFetching: (fetching: IFetching) => void;
  // Dialog state
  dialog: IDialog;
  setDialog: (dialog: IDialog) => void;
  // Pagination state
  pagination: IPagination;
  setPagination: (pagination: IPagination) => void;
  // ID state
  ID: IID;
  setID: (id: IID) => void;
  // Errors state
  errors: MyError[];
  setErrors: (errors: MyError[]) => void;
  initErrors: () => void;

  // Token state
  token: string | null;
  setTokenInLocalStorage: (token: string) => void;
  getTokenFromLocalStorage: () => string | null;
  removeTokenFromLocalStorage: () => void;

  // Role state
  role: string | null;
  setRoleInLocalStorage: (role: string) => void;
  getRoleFromLocalStorage: () => string | null;
  removeRoleFromLocalStorage: () => void;

  // Departement ID state
  departementID: number | null;
  setDepartementIDInLocalStorage: (id: number) => void;
  getDepartementIDFromLocalStorage: () => number | null;
  removeDepartementIDFromLocalStorage: () => void;

  // Department dropdown state
  departements: IDepartement[];
  setDepartements: (departments: IDepartement[]) => void;
}

// Create the context
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// Define the provider component
const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Alert state
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  // Message state
  const [message, setMessage] = useState<IMessage>({
    message: "",
    type: MessageType.INIT,
  });
  // Loading state
  const [loading, setLoading] = useState<ILoading>({
    table: false,
    form: false,
    filter: false,
    delete: false,
  });
  // Fetching state
  const [fetching, setFetching] = useState<IFetching>({
    normal: true,
    search: false,
    filter: false,
  });
  // Dialog state
  const [dialog, setDialog] = useState<IDialog>({
    form: false,
    delete: false,
    filter: false,
  });
  // Pagination state
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
    size: 5,
    initPagination: () => {
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalElements: 0,
        size: 5,
        initPagination: pagination.initPagination,
      });
    },
  });
  // ID state
  const [ID, setID] = useState<IID>({
    delete: null,
    update: null,
    fetch: null,
  });
  // Errors state
  const [errors, setErrors] = useState<MyError[]>([]);
  const initErrors = () => {
    setErrors([]);
  };

  const [token, setToken] = useState<string | null>(null);

  // Function to set the token and save it to localStorage
  const setTokenInLocalStorage = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // Function to get the token from localStorage
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  // Function to remove the token from localStorage
  const removeTokenFromLocalStorage = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // On component mount, check localStorage for an existing token
  React.useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Role state
  const [role, setRole] = useState<string | null>(null);

  // Function to set the role and save it to localStorage
  const setRoleInLocalStorage = (newRole: string) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  // Function to get the role from localStorage
  const getRoleFromLocalStorage = () => {
    return localStorage.getItem("role");
  };

  // Function to remove the role from localStorage
  const removeRoleFromLocalStorage = () => {
    setRole(null);
    localStorage.removeItem("role");
  };
  // On component mount, check localStorage for an existing role
  React.useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  // Department dropdown state
  const [departements, setDepartements] = useState<IDepartement[]>([]);

  // Departement ID state
  const [departementID, setDepartementID] = useState<number | null>(null);

  // Function to set the departement ID and save it to localStorage
  const setDepartementIDInLocalStorage = (id: number) => {
    setDepartementID(id);
    localStorage.setItem("departementID", id.toString());
  };

  // Function to get the departement ID from localStorage
  const getDepartementIDFromLocalStorage = () => {
    return parseInt(localStorage.getItem("departementID") ?? "");
  };

  // Function to remove the departement ID from localStorage
  const removeDepartementIDFromLocalStorage = () => {
    setDepartementID(null);
    localStorage.removeItem("departementID");
  };

  return (
    <GlobalContext.Provider
      value={{
        // Alert state
        alertOpen,
        setAlertOpen,
        // Message state
        message,
        setMessage,
        // Loading state
        loading,
        setLoading,
        // Fetching state
        fetching,
        setFetching,
        // Dialog state
        dialog,
        setDialog,
        // Pagination state
        pagination,
        setPagination,
        // ID state
        ID,
        setID,
        // Errors state
        errors,
        setErrors,
        initErrors,
        // Token state
        token,
        setTokenInLocalStorage,
        getTokenFromLocalStorage,
        removeRoleFromLocalStorage,
        // Role state
        role,
        setRoleInLocalStorage,
        getRoleFromLocalStorage,
        removeTokenFromLocalStorage,
        // Department dropdown state
        departements,
        setDepartements,
        // Departement ID state
        departementID,
        setDepartementIDInLocalStorage,
        getDepartementIDFromLocalStorage,
        removeDepartementIDFromLocalStorage,
      }}
    >
      {children}

      {message && message.type !== MessageType.INIT && (
        <DynamicAlert
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          title={message.type?.toString()}
          message={message.message ?? ""}
          type={message.type}
        />
      )}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export { GlobalProvider };
