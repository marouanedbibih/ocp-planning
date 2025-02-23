"use client";

import React from "react";
import {
  CardBody,
  Spinner,
  Typography,
  Tooltip,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon,EyeIcon } from "@heroicons/react/24/outline";

import { useEmployeeContext } from "@/contexts/EmployeeProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useDeleteEmployee } from "@/hooks/EmployeeHooks";
import { IEmployee } from "@/types/employee";
import { SmallTextTable } from "../Text/SmallTextTable";
import Pagination from "../Pagination/Pagination";
import DeleteConfirmationDialog from "../Dialog/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";

interface EmployeeTableProps {}

const TABLE_HEAD = [
  "Username",
  "Name",
  "Email",
  "Phone",
  "Job",
  "Department",
  "Secretary",
  "Actions",
];

export const EmployeeTable: React.FC<EmployeeTableProps> = () => {
  // Basics states
  const { data } = useEmployeeContext();
  const { loading } = useGlobalContext();
  const { pagination, setPagination } = useGlobalContext();
  const { ID, setID } = useGlobalContext();
  const { dialog, setDialog } = useGlobalContext();

  // Hook to delete employee
  const { deleteEmployee } = useDeleteEmployee();

  // Handle update employee
  const handleUpdateEmployee = (id: number) => {
    setID({ ...ID, update: id });
    setDialog({ ...dialog, form: true });
  };

  // Handle delete dialog
  const handleDeleteDialog = (id: number) => {
    setID({ ...ID, delete: id });
    setDialog({ ...dialog, delete: true });
  };

  // Get secretary color
  const getSecretaryColor = (status: boolean) => {
    return status ? "green" : "red";
  };

  const router = useRouter(); // Initialize router hook
  // OnView
  const onView = (id: number) => {
    router.push(`/employee/${id}`); // Redirect to employee details page
    setID({ ...ID, fetch: id });
  };

  return (
    <CardBody
      className="px-0"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading.table ? (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                <div className="w-full flex flex-1 justify-center items-center">
                  <Spinner
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
              </td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map((employee: IEmployee) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={employee.employeeId}>
                  <td className={classes}>
                    <SmallTextTable text={employee.username} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={employee.name} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={employee.email} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={employee.phone} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={employee.job} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={employee.departementName} />
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        value={employee.isSecretary ? "Yes" : "No"}
                        color={getSecretaryColor(employee.isSecretary)}
                      />
                    </div>
                  </td>
                  <td className={`${classes} flex flex-row gap-2`}>
                    <Tooltip content="View Employee">
                      <IconButton
                        color="blue"
                        onClick={() => onView(employee.employeeId)} // Call onView to redirect
                      placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Edit Employee">
                      <IconButton
                        color="green"
                        onClick={() =>
                          handleUpdateEmployee(employee.employeeId)
                        }
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Employee">
                      <IconButton
                        color="red"
                        onClick={() => handleDeleteDialog(employee.employeeId)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        onPageChange={(page) => {
          setPagination({ ...pagination, currentPage: page });
        }}
      />
      <DeleteConfirmationDialog
        open={dialog.delete}
        handleClose={() => setDialog({ ...dialog, delete: false })}
        handleConfirm={() => {
          deleteEmployee(ID.delete!);
        }}
        loading={loading.delete}
        message="Are you sure you want to delete this Employee?"
      />
    </CardBody>
  );
};
