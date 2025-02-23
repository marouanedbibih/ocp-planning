import axiosClient from "@/api/axiosClient";
import { MyResponse } from "@/types";
import { IEmployeeRequest } from "@/types/employee";

// Fetch list of employees
export const fetchListOfEmployeesAPI = async (page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/employees?page=${page}&size=${size}`);
        console.log("Employees List data: ", data);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Search employees
export const searchEmployeesAPI = async (keyword: string, page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/employees/search?keyword=${keyword}&page=${page}&size=${size}`);
        console.log("Employees List data: ", data);
        return data;
    } catch (error: any) {
        console.log("Employees List error: ", error.response.data);
        throw error.response.data;
    }
}

// Fetch a single employee
export const fetchEmployeeAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/employee/${id}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Create a new employee
export const createEmployeeAPI = async (payload: IEmployeeRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.post(`/api/v1/employee`, payload);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Update an employee
export const updateEmployeeAPI = async (id: number, payload: IEmployeeRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.put(`/api/v1/employee/${id}`, payload);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Delete an employee
export const deleteEmployeeAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.delete(`/api/v1/employee/${id}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}
