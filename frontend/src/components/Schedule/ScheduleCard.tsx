import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { ISchedule } from "@/types/schedule";

interface ScheduleCardProps {
  schedule: ISchedule;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule }) => {
  const { weekday, scheduleTime } = schedule;
  const { startHour, endHour } = scheduleTime;

  return (
    <Card
      className="w-full max-w-[24rem] mx-auto p-4 mb-4"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <Typography
        variant="h5"
        color="blue-gray"
        className="mb-2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {weekday}
      </Typography>
      <Typography
        variant="paragraph"
        color="gray"
        className="mb-1"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Start Time: {startHour}
      </Typography>
      <Typography
        variant="paragraph"
        color="gray"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        End Time: {endHour}
      </Typography>
    </Card>
  );
};

export default ScheduleCard;
