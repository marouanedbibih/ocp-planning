import React, { use } from "react";
import { useScheduleContext } from "@/contexts/ScheduleProvider";
import ScheduleCard from "./ScheduleCard";
import { useFetchEmployeeSchedules } from "@/hooks/ScheduleHooks";
interface ScheduleListProps {
  id: number;
}
const ScheduleList: React.FC<ScheduleListProps> = ({
    id,
}) => {
  const { fetchEmployeeSchedules, data } = useFetchEmployeeSchedules();

  React.useEffect(() => {
    fetchEmployeeSchedules(id);
  }, [id]);

  return (
    <div className="flex  gap-4">
      {data &&
        data.map((schedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}
    </div>
  );
};

export default ScheduleList;
