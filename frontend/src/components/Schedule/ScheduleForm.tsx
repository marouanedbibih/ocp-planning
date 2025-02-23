/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState } from "react";
import { Weekday, IScheduleTime } from "@/types/schedule";
import { useScheduleContext } from "@/contexts/ScheduleProvider";
import { Button, Card, Typography } from "@material-tailwind/react";
import { DayCheckbox } from "../Input/DayCheckbox";
import { DefaultInput } from "../Input/DefaultInput";
import { useCreateSchedule } from "@/hooks/ScheduleHooks";

interface ScheduleFormProps {
  id: number;
}

// Correctly typed initial state for schedule times
const initialScheduleTimes: Record<Weekday, IScheduleTime> = {
  [Weekday.MONDAY]: { startHour: "", endHour: "" },
  [Weekday.TUESDAY]: { startHour: "", endHour: "" },
  [Weekday.WEDNESDAY]: { startHour: "", endHour: "" },
  [Weekday.THURSDAY]: { startHour: "", endHour: "" },
  [Weekday.FRIDAY]: { startHour: "", endHour: "" },
  [Weekday.SATURDAY]: { startHour: "", endHour: "" },
  [Weekday.SUNDAY]: { startHour: "", endHour: "" },
};

const ScheduleForm: React.FC<ScheduleFormProps> = ({ id }) => {
  const { request, setRequest } = useScheduleContext();
  const [selectedDays, setSelectedDays] = useState<Set<Weekday>>(new Set());
  const [scheduleTimes, setScheduleTimes] =
    useState<Record<Weekday, IScheduleTime>>(initialScheduleTimes);

  // Handle checkbox change for selecting days
  const handleDaySelection = (day: Weekday) => {
    const newSelectedDays = new Set(selectedDays);
    if (selectedDays.has(day)) {
      newSelectedDays.delete(day);
    } else {
      newSelectedDays.add(day);
    }
    setSelectedDays(newSelectedDays);
  };

  // Handle input change for start and end times
  const handleTimeChange = (
    day: Weekday,
    field: "startHour" | "endHour",
    value: string
  ) => {
    setScheduleTimes((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  // Hooks to create schedule
  const { createSchedule } = useCreateSchedule();
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const selectedSchedule: Record<Weekday, IScheduleTime> = {};

    selectedDays.forEach((day) => {
      // Add seconds to time if needed
      const startTime = scheduleTimes[day].startHour;
      const endTime = scheduleTimes[day].endHour;

      selectedSchedule[day] = {
        startHour: startTime.endsWith(":00") ? startTime : `${startTime}:00`,
        endHour: endTime.endsWith(":00") ? endTime : `${endTime}:00`,
      };
    });

    setRequest({ ...request, schedule: selectedSchedule });

    console.log("Schedule submitted: ", {
      ...request,
      schedule: selectedSchedule,
    });

    // Create schedule
    createSchedule(id, { ...request, schedule: selectedSchedule });
  };

  return (
    <div className="flex flex-col gap-4 w-1/2  justify-end items-end">
      <div className=" flex flex-1 justify-start items-start"></div>
      {Object.values(Weekday).map((day) => (
        <Card
          className="mx-auto w-full max-w-[24rem] h-auto min-h-[60px] p-4 m-0 gap-2 "
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          key={day}
        >
          <DayCheckbox
            key={day}
            day={day}
            selectedDays={selectedDays}
            handleDaySelection={handleDaySelection}
          />
          {selectedDays.has(day) && (
            <div className="flex flex-col">
              <DefaultInput
                label=""
                placeholder="HH:MM:SS"
                value={scheduleTimes[day]?.startHour || ""}
                onChange={(e) =>
                  handleTimeChange(day, "startHour", e.target.value)
                }
                type="time"
                smallMessage="Select start time"
              />
              <DefaultInput
                label="End Time"
                placeholder="HH:MM"
                value={scheduleTimes[day]?.endHour || ""}
                onChange={(e) =>
                  handleTimeChange(day, "endHour", e.target.value)
                }
                type="time"
                smallMessage="Select end time"
              />
            </div>
          )}
        </Card>
      ))}
      <Button
        variant="gradient"
        fullWidth
        onClick={handleSubmit}
        color="green"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="max-w-[24rem] mx-auto m-0"
      >
        Submit
      </Button>
    </div>
  );
};

export default ScheduleForm;
