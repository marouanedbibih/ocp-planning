"use client";

import { DepartementForm } from "@/components/Departement/DepartementForm";
import DepartementHeader from "@/components/Departement/DepartementHeader";
import { DepartementTable } from "@/components/Departement/DepartementTable";
import { Card } from "@material-tailwind/react";
import React from "react";

const DepartementPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto gap-4 ">
      <Card
        className="w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DepartementHeader />
        <DepartementTable />
        <DepartementForm />
      </Card>
    </div>
  );
};

export default DepartementPage;
