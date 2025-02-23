import { Typography, Input } from "@material-tailwind/react";
import * as React from "react";

export interface IDefaultInputProps {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  smallMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const DefaultInput: React.FC<IDefaultInputProps> = ({
  label,
  placeholder,
  value,
  error,
  smallMessage,
  onChange,
  type = "text",
}) => {
  return (
    <div className="mb-2">
      <Input
      label={label}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        size="lg"
        error={Boolean(error)}
        className={` ${error ? "border-red-500 placeholder-red-500 " : ""}`}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
        type={type}
      />
      {error ? (
        <Typography
          variant="small"
          className="flex justify-start font-bold text-red-500 mt-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {error}
        </Typography>
      ) : (
        <Typography
          variant="small"
          className="flex justify-start font-bold text-blue-gray-500 mt-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {smallMessage}
        </Typography>
      )}
    </div>
  );
};
