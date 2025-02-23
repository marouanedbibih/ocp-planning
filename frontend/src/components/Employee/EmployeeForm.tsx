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
  Checkbox,
} from "@material-tailwind/react";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useEmployeeContext } from "@/contexts/EmployeeProvider";
import {
  useCreateEmployee,
  useFetchEmployee,
  useUpdateEmployee,
} from "@/hooks/EmployeeHooks"; // Update with actual path
import { DefaultInput } from "../Input/DefaultInput";
import { useFetchDepartementsForSelect } from "@/hooks/DepartementHooks";
import DefaultSelect from "../Input/DefaultSelect";

interface EmployeeFormProps {}

export const EmployeeForm: React.FC<EmployeeFormProps> = () => {
  // Basics States
  const { dialog, setDialog } = useGlobalContext();
  const { loading } = useGlobalContext();
  const { ID } = useGlobalContext();
  const { errors, setErrors, initErrors } = useGlobalContext();
  // Employee Editing States
  const { request, setRequest } = useEmployeeContext();

  // Hook to fetch employee by ID
  const { fetchEmployee } = useFetchEmployee();
  // Hook to create employee
  const { createEmployee } = useCreateEmployee();
  // Hook to update employee
  const { updateEmployee } = useUpdateEmployee();

  // Dialog Handler
  const handler = () => {
    setDialog({ ...dialog, form: false });
  };

  // Handle change function
  const handleChange = (
    key: string,
    value: string | number | boolean | React.ChangeEvent<HTMLInputElement>
  ) => {
    // Depending on the type of value, set the request state
    if (key === "departementId") {
      value = parseInt(value as string);
    }

    // Update the employee request state
    setRequest({ ...request, [key]: value });
    // Clear the error for this field if any
    setErrors(errors.filter((error) => error.key !== key));
  };

  // Function to get the error message for a specific field
  const getError = (key: string) => {
    const input = errors.find((error) => error.key === key);
    return input ? input.message : "";
  };

  const handleCheckboxChange = (event: any) => {
    setRequest({ ...request, isSecretary: event.target.checked });
    handleChange("isSecretary", event.target.checked); // Update your form or state as needed
  };

  // Handle Submit function
  const handleSubmit = async () => {
    console.log("Employee Request", request);
    if (ID.update) {
      // Update the employee
      updateEmployee(ID.update, request);
    } else {
      // Create the employee
      createEmployee(request);
    }
  };

  // UseEffect to fetch the employee by ID
  React.useEffect(() => {
    if (ID.update) {
      fetchEmployee(ID.update);
    }
  }, [ID.update]);

  // Departements state
  const { departements } = useGlobalContext();
  // Hook to fetch departements
  const { fetchDepartementsForSelect } = useFetchDepartementsForSelect();
  // Fetch the departements
  React.useEffect(() => {
    fetchDepartementsForSelect();
  }, []);

  // Get the depatement id form the local storage
  const { getDepartementIDFromLocalStorage } = useGlobalContext();
  const departementID = getDepartementIDFromLocalStorage();

  // Get Role from local storage
  const { getRoleFromLocalStorage } = useGlobalContext();
  const role = getRoleFromLocalStorage();

  return (
    <>
      <Dialog
        size="md"
        open={dialog.form}
        handler={handler}
        className="bg-transparent shadow-none"
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
                  {ID.update ? "Update Employee" : "Create Employee"}
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
                    ? "Update the Employee details"
                    : "Fill in the Employee details"}
                </Typography>
                {/* Username */}
                <DefaultInput
                  label="Employee Username"
                  placeholder="Enter the Employee Username"
                  value={request.username}
                  error={getError("username")}
                  smallMessage="Your Employee username will be unique"
                  onChange={(e) => handleChange("username", e.target.value)}
                />
                {/* Name */}
                <DefaultInput
                  label="Employee Name"
                  placeholder="Enter the Employee Name"
                  value={request.name}
                  error={getError("name")}
                  smallMessage="Your Employee name will be unique"
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                {/* Email */}
                <DefaultInput
                  label="Employee Email"
                  placeholder="Enter the Employee Email"
                  value={request.email}
                  error={getError("email")}
                  smallMessage="Provide a valid email address"
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                {/* Phone */}
                <DefaultInput
                  label="Employee Phone"
                  placeholder="Enter the Employee Phone"
                  value={request.phone}
                  error={getError("phone")}
                  smallMessage="Provide a valid phone number"
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                {/* Password */}
                <DefaultInput
                  label="Employee Password"
                  placeholder="Enter the Employee Password"
                  value={request.password}
                  error={getError("password")}
                  smallMessage="Provide the Employee password"
                  onChange={(e) => handleChange("password", e.target.value)}
                  type="password"
                />
                {/* Job */}
                <DefaultInput
                  label="Employee Job"
                  placeholder="Enter the Employee Job"
                  value={request.job}
                  error={getError("job")}
                  smallMessage="Provide the Employee job"
                  onChange={(e) => handleChange("job", e.target.value)}
                />
                {/* Departement */}
                {role === "ADMIN" && (
                  <DefaultSelect
                    label="Employee Departement"
                    value={request.departementId.toString()}
                    onChange={(val) => handleChange("departementId", val)}
                    options={departements}
                    loading={false}
                    error={getError("departement_id")}
                    smallMessage="Select the Employee departement"
                    className="w-full"
                    menuClassName="w-full"
                  />
                )}
                {role === "ADMIN" && (
                  <div className="flex flex-1 justify-start items-center gap-4">
                    <Checkbox
                      id="isSecretaryCheckbox"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      checked={request.isSecretary}
                      onChange={handleCheckboxChange}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined} // other props as needed
                    />
                    <Typography
                      color="blue-gray"
                      className="font-medium"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Is Secretary
                    </Typography>
                  </div>
                )}
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
                  color="green"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {ID.update ? "Update Employee" : "Create Employee"}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
};
