import { useScheduleContext } from "@/contexts/ScheduleProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { createScheduleAPI, deleteAllSchedulesAPI, fetchEmployeeSchedulesAPI, fetchMySchedulesAPI } from "@/services/ScheduleService";
import { MessageType, MyErrorResponse, MyResponse } from "@/types";
import { IScheduleRequest } from "@/types/schedule";

// Fetch all schedules for an employee
export const useFetchEmployeeSchedules = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setData, data } = useScheduleContext();

    const fetchEmployeeSchedules = async (employeeId: number) => {
        setLoading({ ...loading, table: true });
        fetchEmployeeSchedulesAPI(employeeId)
            .then((res: MyResponse) => {
                setData(res.data);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false });
            });
    };

    return { fetchEmployeeSchedules, data };
}

// Create a new schedule
export const useCreateSchedule = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { initRequest } = useScheduleContext();

    // ReFetch all schedules for an employee
    const { reFetchEmployeeSchedules } = useReFetchEmployeeSchedules();



    const createSchedule = async (employeeId: number, request: IScheduleRequest) => {
        setLoading({ ...loading, form: true });
        createScheduleAPI(employeeId, request)
            .then((res: MyResponse) => {
                initRequest();
                setMessage({ message: res.message, type: MessageType.INFO });
                setAlertOpen(true);
                reFetchEmployeeSchedules(employeeId);
                initRequest();
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
            })
            .finally(() => {
                setLoading({ ...loading, form: false });
            });
    };

    return { createSchedule };
}

// Delete all schedules for an employee
export const useDeleteAllSchedules = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { initRequest } = useScheduleContext();

    const deleteAllSchedules = async (employeeId: number) => {
        setLoading({ ...loading, form: true });
        deleteAllSchedulesAPI(employeeId)
            .then((res: MyResponse) => {
                initRequest();
                setMessage({ message: res.message, type: MessageType.INFO });
                setAlertOpen(true);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
            })
            .finally(() => {
                setLoading({ ...loading, form: false });
            });
    };

    return { deleteAllSchedules };
}

// reFetch all schedules for an employee
export const useReFetchEmployeeSchedules = () => {
    const { fetchEmployeeSchedules } = useFetchEmployeeSchedules();
    const { setLoading, loading } = useGlobalContext();

    const reFetchEmployeeSchedules = (employeeId: number) => {
        setLoading({ ...loading, table: true });
        fetchEmployeeSchedules(employeeId);
    };

    return { reFetchEmployeeSchedules };
}


// Get all schedules owned by the current user
export const useFetchMySchedules = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setData, data } = useScheduleContext();

    const fetchMySchedules = async () => {
        setLoading({ ...loading, table: true });
        fetchMySchedulesAPI()
            .then((res: MyResponse) => {
                setData(res.data);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false });
            });
    };

    return { fetchMySchedules, data };
}
