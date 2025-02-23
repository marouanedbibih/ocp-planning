/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useDepartementContext } from "@/contexts/DepartementProvider";
import {
  useCreateDepartement,
  useFetchDepartement,
  useUpdateDepartement,
} from "@/hooks/DepartementHooks";
import { DefaultInput } from "../Input/DefaultInput";

interface DepartementFormProps {}
export const DepartementForm: React.FC<DepartementFormProps> = ({}) => {
  // Basics States
  const { dialog, setDialog } = useGlobalContext();
  const { loading } = useGlobalContext();
  const { ID } = useGlobalContext();
  const { errors, setErrors, initErrors } = useGlobalContext();
  // Client Editing States
  const { request, setRequest } = useDepartementContext();

  // Hook to fetch departement by ID
  const { fetchDepartement } = useFetchDepartement();
  // Hook to create departement
  const { createDepartement } = useCreateDepartement();
  // Hook to update departement
  const { updateDepartement } = useUpdateDepartement();

  // Dialog Handler
  const handler = () => {
    setDialog({ ...dialog, form: false });
  };

  // Handle change function
  const handleChange = (
    key: string,
    value: string | number | boolean | React.ChangeEvent<HTMLInputElement>
  ) => {
    // Update the Client request state
    setRequest({ ...request, [key]: value });
    // Clear the error for this field if any
    setErrors(errors.filter((error) => error.key !== key));
  };

  // Function to get the error message for a specific field
  const getError = (key: string) => {
    const input = errors.find((error) => error.key === key);
    return input ? input.message : "";
  };

  // Handle Submit function
  const handleSubmit = async () => {
    console.log("Client Request", request);
    if (ID.update) {
      // Update the client
      updateDepartement(ID.update, request);
    } else {
      // Create the client
      createDepartement(request);
    }
  };

  // UseEffect to fetch the departement by ID
  React.useEffect(() => {
    if (ID.update) {
      fetchDepartement(ID.update);
    }
  }, [ID.update]);

  return (
    <>
      <Dialog
        size="md"
        open={dialog.form}
        handler={handler}
        className="bg-transparent shadow-none "
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Card
          className="mx-auto w-full max-w-[24rem] h-auto min-h-[200px]"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {loading.form ? (
            <div className="w-full h-60 flex flex-1 justify-center items-center">
              <Spinner
                className="h-8 w-8"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
          ) : (
            <div>
              <CardBody
                className="flex flex-col gap-4"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Typography
                  variant="h4"
                  color="blue-gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {ID.update ? "Update Departement" : "Create Departement"}
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {ID.update
                    ? "Update the Departement details"
                    : "Fill in the Departement details"}
                </Typography>
                <DefaultInput
                  label="Departement Name"
                  placeholder="Enter the Departement Name"
                  value={request.name}
                  error={getError("name")}
                  smallMessage="Your Departement name will be unique"
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </CardBody>
              <CardFooter
                className="pt-0"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Button
                  variant="gradient"
                  fullWidth
                  onClick={handleSubmit}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  color="green"
                >
                  {ID.update ? "Update Departement" : "Create Departement"}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
};
