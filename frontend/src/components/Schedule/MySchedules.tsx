import React, { use } from "react";
import { useScheduleContext } from "@/contexts/ScheduleProvider";
import ScheduleCard from "./ScheduleCard";
import { useFetchEmployeeSchedules, useFetchMySchedules } from "@/hooks/ScheduleHooks";
interface ScheduleListProps {
}
const MySchedules: React.FC<ScheduleListProps> = ({
}) => {

  const { fetchMySchedules, data } = useFetchMySchedules();

  React.useEffect(() => {
    fetchMySchedules();
  }, []);

  return (
    <div className="flex  gap-4">
      {data &&
        data.map((schedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}
    </div>
  );
};

export default MySchedules;
