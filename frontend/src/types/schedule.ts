// Enum for weekdays
export enum Weekday {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY",
}

// Interface for the schedule time details
export interface IScheduleTime {
    startHour: string; // Format: "HH:mm:ss"
    endHour: string;   // Format: "HH:mm:ss"
}

// Interface for the schedule request payload
export interface IScheduleRequest {
    employeeId: number;                // ID of the employee
    schedule: {
        [day in Weekday]?: IScheduleTime; // Using the Weekday enum as keys
    };
}

// Interface for the schedule DTO used in the response
export interface ISchedule {
    id: number;                   // Unique ID of the schedule entry
    weekday: Weekday;             // Using Weekday enum for consistency
    scheduleTime: IScheduleTime;   // Schedule time details
}


