import React from "react";
import {
  AdjustmentsVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { CardHeader, Typography, Button, Card } from "@material-tailwind/react";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useDepartementContext } from "@/contexts/DepartementProvider";
import { SearchDepartement } from "./SearchDepartement";


interface DepartementHeaderProps {}

const DepartementHeader: React.FC<DepartementHeaderProps> = () => {
  // Form dialog state
  const { dialog, setDialog } = useGlobalContext();
  // Init Client Request
  const { initRequest } = useDepartementContext();

  // Handle open form function
  const handleOpenForm = () => {
    initRequest();
    setDialog({ ...dialog, form: true });
  };
  return (
    <CardHeader
      floated={false}
      shadow={false}
      className="rounded-none"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div className="flex w-full shrink-0 gap-2 md:w-max justify-end flex-1">
          <SearchDepartement />
          <Button
            className="flex items-center gap-3"
            size="sm"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            color="green"
            onClick={handleOpenForm}
          >
            <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> New Departement
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default DepartementHeader;
