import axiosClient from "@/api/axiosClient";
import { MyResponse } from "@/types";
import { IScheduleRequest } from "@/types/schedule";

// Fetch all schedules for an employee
export const fetchEmployeeSchedulesAPI = async (employeeId: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/employee/${employeeId}/schedules`);
        console.log("Employee Schedules data: ", data);
        return data;
    } catch (error: any) {
        console.log("Error fetching employee schedules: ", error.response.data);
        throw error.response.data;
    }
}

// Create a new schedule for an employee
export const createScheduleAPI = async (employeeId: number, payload: IScheduleRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.post(`/api/v1/employee/${employeeId}/schedules`, payload);
        console.log("Create Schedule response data: ", data);
        return data;
    } catch (error: any) {
        console.log("Error creating schedule: ", error.response.data);
        throw error.response.data;
    }
}

// Delete all schedules for an employee
export const deleteAllSchedulesAPI = async (employeeId: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.delete(`/api/v1/employee/${employeeId}/schedules`);
        console.log("Delete Schedules response data: ", data);
        return data;
    } catch (error: any) {
        console.log("Error deleting all schedules: ", error.response.data);
        throw error.response.data;
    }
}
