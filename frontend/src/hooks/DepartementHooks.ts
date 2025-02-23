/* eslint-disable react-hooks/exhaustive-deps */
import { useDepartementContext } from "@/contexts/DepartementProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider"
import { createDepartementAPI, deleteDepartementAPI, fetchDepartementAPI, fetchDepartementsForSelectAPI, fetchListOfDepartementsAPI, searchDepartementsAPI, updateDepartementAPI } from "@/services/DepartementService";
import { MessageType, MyErrorResponse, MyResponse } from "@/types";
import { IDepartementRequest } from "@/types/departement";
import React from "react";

// Fetch the list of departements
export const useFetchListOfDepartements = () => {
    //Import the necessary state form the Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching, } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    // Import the necessary state from the Departement Context
    const { setData } = useDepartementContext();

    // Define the function to fetch the list of departements
    const fetchListOfDepartements = async (page: number, size: number) => {
        setLoading({ ...loading, table: true, form: false, filter: false });
        fetchListOfDepartementsAPI(page, size)
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

    // UseEffect to fetch the list of departements
    React.useEffect(() => {
        if (fetching.normal) {
            fetchListOfDepartements(pagination.currentPage, pagination.size);
        }
    }, [fetching.normal, pagination.currentPage, pagination.size]);

    // Return the function to be used in the component
    return { fetchListOfDepartements };
}

// Search departements
export const useSearchDepartements = () => {
    // Import the necessary state form the Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching, setFetching } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    // Import the necessary state from the Departement Context
    const { setData } = useDepartementContext();
    const { searchKeyword, setSearchKeyword } = useDepartementContext();

    // Define the function to search departements
    const searchDepartements = async (keyword: string, page: number, size: number) => {
        setLoading({ ...loading, table: true, form: false, filter: false });
        searchDepartementsAPI(keyword, page, size)
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

    // UseEffect to search departements
    React.useEffect(() => {
        if (fetching.search) {
            searchDepartements(searchKeyword, pagination.currentPage, pagination.size);
        }
    }, [fetching.search, searchKeyword, pagination.currentPage, pagination.size]);

    // Return the function to be used in the component
    return { searchDepartements, setSearchKeyword, setFetching, pagination };
}

// Fetch a single departement
export const useFetchDepartement = () => {
    // Import the necessary state form the Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    // Import the necessary state from the Departement Context
    const { setRequest } = useDepartementContext();

    // Define the function to fetch a single departement
    const fetchDepartement = async (id: number) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        fetchDepartementAPI(id)
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
    return { fetchDepartement };
}

// Create a new departement
export const useCreateDepartement = () => {
    // Import the necessary state form the Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setErrors } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    // Import the necessary state from the Departement Context
    const { initRequest } = useDepartementContext();
    // Import ReFetchData
    const { reFetchData } = useReFetchData();

    // Define the function to create a new departement
    const createDepartement = async (request: IDepartementRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        createDepartementAPI(request)
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
    return { createDepartement };
}

// Update a departement
export const useUpdateDepartement = () => {
    // Import the necessary state form the Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setErrors, } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { ID, setID } = useGlobalContext();
    // Import the necessary state from the Departement Context
    const { initRequest } = useDepartementContext();
    // Import ReFetchData
    const { reFetchData } = useReFetchData();

    // Define the function to update a departement
    const updateDepartement = async (id: number, request: IDepartementRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        updateDepartementAPI(id, request)
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
    return { updateDepartement };
}


// Delete a departement
export const useDeleteDepartement = () => {
    // Import the necessary state form the Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { ID, setID } = useGlobalContext();
    // Import ReFetchData
    const { reFetchData } = useReFetchData();

    // Define the function to delete a departement
    const deleteDepartement = async (id: number) => {
        setLoading({ ...loading, table: false, form: false, filter: false });
        deleteDepartementAPI(id)
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
    return { deleteDepartement };
}


// Refetch Data 
export const useReFetchData = () => {
    // Import the necessary state 
    const { fetchListOfDepartements } = useFetchListOfDepartements();
    const { searchDepartements } = useSearchDepartements();
    const { fetching } = useGlobalContext();
    const { pagination } = useGlobalContext();
    const { searchKeyword } = useDepartementContext();

    // Define the function to refetch data
    const reFetchData = () => {
        if (fetching.normal) {
            fetchListOfDepartements(pagination.currentPage, pagination.size);
        } else if (fetching.search) {
            searchDepartements(searchKeyword, pagination.currentPage, pagination.size);
        }
    }

    // Return the function to be used in the component
    return { reFetchData };

}



// Fetch departement for dropdown
export const useFetchDepartementsForSelect = () => {
    // Import the necessary state form the Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();
    // Import the necessary state from the Departement Context
    const { setDepartements } = useGlobalContext();

    // Define the function to fetch departements for select dropdown
    const fetchDepartementsForSelect = async () => {
        fetchDepartementsForSelectAPI()
            .then((res: MyResponse) => {
                setDepartements(res.data);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setAlertOpen(true);
            })
            .finally(() => {
            });
    }

    // UseEffect to fetch departements for select dropdown
    React.useEffect(() => {
        fetchDepartementsForSelect();
    }, []);

    // Return the function to be used in the component
    return { fetchDepartementsForSelect };
}