"use client";

import React from "react";
import { useParams } from "next/navigation";
import ScheduleForm from "@/components/Schedule/ScheduleForm";
import { ScheduleProvider } from "@/contexts/ScheduleProvider";
import ScheduleList from "@/components/Schedule/ScheduleList";
import EmployeeDetail from "@/components/Employee/EmployeeDetail";

const ViewEmployeePage: React.FC = () => {
  const params = useParams();
  const id = params.id;

  // Convert id to a number, ensuring it is a string and not an array
  const employeeId = typeof id === "string" ? parseInt(id, 10) : undefined;

  return (
    <div>
      <ScheduleProvider>
        {employeeId !== undefined && <ScheduleList id={employeeId} />}
        <div className="flex flex-row justify-between items-start">
          {employeeId !== undefined && <EmployeeDetail id={employeeId} />}
          {employeeId !== undefined && <ScheduleForm id={employeeId} />}
        </div>
      </ScheduleProvider>
    </div>
  );
};

export default ViewEmployeePage;
