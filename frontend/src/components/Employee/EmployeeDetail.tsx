/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Spinner,
  Chip,
} from "@material-tailwind/react";
import { useFetchEmployee } from "@/hooks/EmployeeHooks";
import { useEmployeeContext } from "@/contexts/EmployeeProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { fetchEmployeeAPI } from "@/services/EmployeeService";
import { MyResponse } from "@/types";
interface EmployeeDetailProps {
  id: number;
}
const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ id }) => {
  const { loading } = useGlobalContext();
  const { employee, setEmployee } = useEmployeeContext();

  // Fetch employee data
  const fetchEmployeeData = async (id: number) => {
    fetchEmployeeAPI(id)
      .then((res: MyResponse) => {
        setEmployee(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    fetchEmployeeData(id);
  }, [id]);

  if (loading.form) {
    return (
      <div className="w-full flex justify-center items-center">
        <Spinner
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    );
  }

  return (
    <Card
      className="max-w-4xl mx-auto  flex flex-1 justify-start items-start"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {employee ? (
          <>
            <Typography
              variant="h5"
              className="mb-4"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Employee Details
            </Typography>
            <Typography
              variant="h6"
              className="mb-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Username: {employee.username}
            </Typography>
            <Typography
              variant="h6"
              className="mb-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Name: {employee.name}
            </Typography>
            <Typography
              variant="h6"
              className="mb-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Email: {employee.email}
            </Typography>
            <Typography
              variant="h6"
              className="mb-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Phone: {employee.phone}
            </Typography>
            <Typography
              variant="h6"
              className="mb-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Job: {employee.job}
            </Typography>
            <Typography
              variant="h6"
              className="mb-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Department: {employee.departementName}
            </Typography>
            <div className="flex flex-1 justify-start items-start gap-4">
              <Typography
                variant="h6"
                className="mb-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Secretary:
              </Typography>
              <Chip
                variant="ghost"
                value={employee.isSecretary ? "Yes" : "No"}
                color={employee.isSecretary ? "green" : "red"}
                className="w-12"
              />
            </div>
          </>
        ) : (
          <Typography
            variant="h6"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            No employee data available
          </Typography>
        )}
      </CardBody>
    </Card>
  );
};

export default EmployeeDetail;
