export interface IEmployeeRequest {
    username: string;
    name: string;
    email: string;
    phone: string; // Optional field
    password: string;
    job: string;
    departementId: number;
    isSecretary: boolean;
}

export interface IEmployee {
    userId: number;
    username: string;
    name: string;
    email: string;
    phone: string; // Optional field
    password?: string | null; // Optional field
    createdAt?: string; // Use string if the date format is ISO 8601
    updatedAt?: string | null; // Optional field
    role?: 'ADMIN' | 'EMPLOYEE' | 'SECRETARY'; // Enum type based on role options
    employeeId: number;
    job: string;
    departementId?: number;
    departementName: string;
    isSecretary: boolean;
}