"use client";

import React from "react";
import {
  CardBody,
  Spinner,
  Typography,
  Chip,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"; // Example import, adjust as necessary

import { useDepartementContext } from "@/contexts/DepartementProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useDeleteDepartement } from "@/hooks/DepartementHooks";
import { IDepartement } from "@/types/departement";
import { SmallTextTable } from "../Text/SmallTextTable";
import Pagination from "../Pagination/Pagination";
import DeleteConfirmationDialog from "../Dialog/DeleteConfirmationDialog";

interface DepartementTableProps {}

const TABLE_HEAD = ["Departement", "Created At", "Updated At", "Actions"];

export const DepartementTable: React.FC<DepartementTableProps> = () => {
  // Basics states
  const { data } = useDepartementContext();
  const { loading } = useGlobalContext();
  const { pagination, setPagination } = useGlobalContext();
  const { ID, setID } = useGlobalContext();
  const { dialog, setDialog } = useGlobalContext();

  // Hook to delete client
  const { deleteDepartement } = useDeleteDepartement();

  // Handle update client
  const handleUpdateClient = (id: number) => {
    setID({ ...ID, update: id });
    setDialog({ ...dialog, form: true });
  };

  // Handle delete dialog
  const handleDeleteDialog = (id: number) => {
    setID({ ...ID, delete: id });
    setDialog({ ...dialog, delete: true });
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
            // @ts-ignore
            data.map((departement: IDepartement) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={departement.id}>
                  <td className={classes}>
                    <SmallTextTable text={departement.name} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={departement.createdAt} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={departement.updatedAt} />
                  </td>
                  <td className={`${classes} flex flex-row gap-2`}>
                    <Tooltip content="Edit Client">
                      <IconButton
                        color="green"
                        onClick={() => handleUpdateClient(departement.id)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Client">
                      <IconButton
                        color="red"
                        onClick={() => handleDeleteDialog(departement.id)}
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
          // Handle page change logic
          setPagination({ ...pagination, currentPage: page });
        }}
      />
      <DeleteConfirmationDialog
        open={dialog.delete}
        handleClose={() => setDialog({ ...dialog, delete: false })}
        handleConfirm={() => {
          deleteDepartement(ID.delete!);
        }}
        loading={loading.delete}
        message="Are you sure you want to delete this Departement?"
      />
    </CardBody>
  );
};
