import axiosClient from "@/api/axiosClient";
import { MyResponse } from "@/types";
import { IDepartementRequest } from "@/types/departement";

// Fetch list of departements
export const fetchListOfDepartementsAPI = async (page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/departements?page=${page}&size=${size}`);
        console.log("Departements List data: ", data);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}
// Search departements
export const searchDepartementsAPI = async (keyword: string, page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/departements/search?keyword=${keyword}&page=${page}&size=${size}`);
        console.log("Departements List data: ", data);
        return data;
    } catch (error: any) {
        console.log("Departements List error: ", error.response.data);
        throw error.response.data;
    }
}

// Fetch a single departement
export const fetchDepartementAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/departement/${id}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Create a new departement
export const createDepartementAPI = async (payload: IDepartementRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.post(`/api/v1/departement`, payload);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Update a departement
export const updateDepartementAPI = async (id: number, payload: IDepartementRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.put(`/api/v1/departement/${id}`, payload);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Delete a departement
export const deleteDepartementAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.delete(`/api/v1/departement/${id}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}


// Fetch departements for select dropdown
export const fetchDepartementsForSelectAPI = async (): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/departements/dropdown`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}