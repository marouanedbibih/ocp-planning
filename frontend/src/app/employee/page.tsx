"use client";

import { EmployeeForm } from "@/components/Employee/EmployeeForm";
import EmployeeHeader from "@/components/Employee/EmployeeHeader";
import { EmployeeTable } from "@/components/Employee/EmployeeTable";
import { Card } from "@material-tailwind/react";
import React from "react";

const EmployeePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto gap-4 ">
      <Card
        className="w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <EmployeeHeader />
        <EmployeeTable />
        <EmployeeForm />
      </Card>
    </div>
  );
};

export default EmployeePage;
