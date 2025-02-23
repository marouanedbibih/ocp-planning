/* eslint-disable react-hooks/exhaustive-deps */
import { useEmployeeContext } from "@/contexts/EmployeeProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import {
    createEmployeeAPI,
    deleteEmployeeAPI,
    fetchEmployeeAPI,
    fetchListOfEmployeesAPI,
    searchEmployeesAPI,
    updateEmployeeAPI
} from "@/services/EmployeeService";
import { MessageType, MyErrorResponse, MyResponse } from "@/types";
import { IEmployee, IEmployeeRequest } from "@/types/employee";
import React from "react";

// Fetch the list of employees
export const useFetchListOfEmployees = () => {
    // Import the necessary state from the Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    // Import the necessary state from the Employee Context
    const { setData } = useEmployeeContext();

    // Define the function to fetch the list of employees
    const fetchListOfEmployees = async (page: number, size: number) => {
        setLoading({ ...loading, table: true, form: false, filter: false });
        fetchListOfEmployeesAPI(page, size)
            .then((res: MyResponse) => {
                res.data
                    ? setData(res.data)
                    : setData(null);
                setPagination({
                    ...pagination,
                    currentPage: res.meta.currentPage,
                    totalPages: res.meta.totalPages,
                    totalElements: res.meta.totalElements,
                    size: res.meta.size,
                });
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, filter: false });
            });
    };

    // UseEffect to fetch the list of employees
    React.useEffect(() => {
        if (fetching.normal) {
            fetchListOfEmployees(pagination.currentPage, pagination.size);
        }
    }, [fetching.normal, pagination.currentPage, pagination.size]);

    // Return the function to be used in the component
    return { fetchListOfEmployees };
}

// Search employees
export const useSearchEmployees = () => {
    // Import the necessary state from the Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching, setFetching } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    // Import the necessary state from the Employee Context
    const { setData } = useEmployeeContext();
    const { searchKeyword, setSearchKeyword } = useEmployeeContext();

    // Define the function to search employees
    const searchEmployees = async (keyword: string, page: number, size: number) => {
        setLoading({ ...loading, table: true, form: false, filter: false });
        searchEmployeesAPI(keyword, page, size)
            .then((res: MyResponse) => {
                if (res.data) {
                    setData(res.data);
                    setPagination({
                        ...pagination,
                        currentPage: res.meta.currentPage,
                        totalPages: res.meta.totalPages,
                        totalElements: res.meta.totalElements,
                        size: res.meta.size,
                    });
                } else {
                    setData(null);
                    pagination.initPagination();
                }
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, filter: false });
            });
    };

    // UseEffect to search employees
    React.useEffect(() => {
        if (fetching.search) {
            searchEmployees(searchKeyword, pagination.currentPage, pagination.size);
        }
    }, [fetching.search, searchKeyword, pagination.currentPage, pagination.size]);

    // Return the function to be used in the component
    return { searchEmployees, setSearchKeyword, setFetching, pagination };
}

// Fetch a single employee
export const useFetchEmployee = () => {
    // Import the necessary state from the Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    // Import the necessary state from the Employee Context
    const { setRequest } = useEmployeeContext();

    // Define the function to fetch a single employee
    const fetchEmployee = async (id: number) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        fetchEmployeeAPI(id)
            .then((res: MyResponse) => {
                setRequest(res.data);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, filter: false });
            });
    };


    // Return the function to be used in the component
    return { fetchEmployee};
}

// Create a new employee
export const useCreateEmployee = () => {
    // Import the necessary state from the Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setErrors } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    // Import the necessary state from the Employee Context
    const { initRequest } = useEmployeeContext();
    // Import ReFetchData
    const { reFetchData } = useReFetchData();

    // Define the function to create a new employee
    const createEmployee = async (request: IEmployeeRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        createEmployeeAPI(request)
            .then((res: MyResponse) => {
                setDialog({ ...dialog, form: false, delete: false, filter: false });
                initRequest();
                reFetchData();
                setMessage({ message: res.message, type: MessageType.INFO });
                setAlertOpen(true);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setErrors(err.errors);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, filter: false });
            });
    }

    // Return the function to be used in the component
    return { createEmployee };
}

// Update an employee
export const useUpdateEmployee = () => {
    // Import the necessary state from the Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setErrors } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { ID, setID } = useGlobalContext();
    // Import the necessary state from the Employee Context
    const { initRequest } = useEmployeeContext();
    // Import ReFetchData
    const { reFetchData } = useReFetchData();

    // Define the function to update an employee
    const updateEmployee = async (id: number, request: IEmployeeRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        updateEmployeeAPI(id, request)
            .then((res: MyResponse) => {
                setID({ ...ID, update: null });
                setDialog({ ...dialog, form: false, delete: false, filter: false });
                initRequest();
                reFetchData();
                setMessage({ message: res.message, type: MessageType.INFO });
                setAlertOpen(true);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setErrors(err.errors);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, filter: false });
            });
    }

    // Return the function to be used in the component
    return { updateEmployee };
}

// Delete an employee
export const useDeleteEmployee = () => {
    // Import the necessary state from the Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { ID, setID } = useGlobalContext();
    // Import ReFetchData
    const { reFetchData } = useReFetchData();

    // Define the function to delete an employee
    const deleteEmployee = async (id: number) => {
        setLoading({ ...loading, table: false, form: false, filter: false });
        deleteEmployeeAPI(id)
            .then((res: MyResponse) => {
                setID({ ...ID, delete: null });
                setDialog({ ...dialog, form: false, delete: false, filter: false });
                reFetchData();
                setMessage({ message: res.message, type: MessageType.INFO });
                setAlertOpen(true);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, filter: false });
            });
    }

    // Return the function to be used in the component
    return { deleteEmployee };
}

// Refetch Data
export const useReFetchData = () => {
    // Import the necessary state
    const { fetchListOfEmployees } = useFetchListOfEmployees();
    const { searchEmployees } = useSearchEmployees();
    const { fetching } = useGlobalContext();
    const { pagination } = useGlobalContext();
    const { searchKeyword } = useEmployeeContext();

    // Define the function to refetch data
    const reFetchData = () => {
        if (fetching.normal) {
            fetchListOfEmployees(pagination.currentPage, pagination.size);
        } else if (fetching.search) {
            searchEmployees(searchKeyword, pagination.currentPage, pagination.size);
        }
    }

    // Return the function to be used in the component
    return { reFetchData };
}
