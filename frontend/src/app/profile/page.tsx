"use client";

import ScheduleCard from "@/components/Schedule/ScheduleCard";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { ScheduleProvider } from "@/contexts/ScheduleProvider";
import { useFetchMySchedules } from "@/hooks/ScheduleHooks";
import React from "react";

const ProfilePage: React.FC = () => {
  const { getRoleFromLocalStorage } = useGlobalContext(); // Access context
  const [loading, setLoading] = React.useState(true);
  const [role, setRole] = React.useState<string | null>(null);
  const { fetchMySchedules, data } = useFetchMySchedules();

  React.useEffect(() => {
    // Fetch token and role from localStorage on the client side
    const fetchedRole = getRoleFromLocalStorage();
    setRole(fetchedRole);
    setLoading(false);
    fetchMySchedules();
  }, []);
  return (
    <div className="flex flex-col justify-center items-start mx-auto gap-4 ">
      {role === "ADMIN" ? (
        <div>
          <h2>Admin</h2>
          <p>Admin content</p>
        </div>
      ) : role === "SECRETARY" ? (
        <div>
          <h2>Secretary</h2>
          <p>Secretary content</p>
        </div>
      ) : role === "EMPLOYEE" ? (
        <div>
          <div className="flex gap-4">
            {data &&
              data.map((schedule) => (
                <ScheduleCard key={schedule.id} schedule={schedule} />
              ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Unauthorized</h2>
          <p>You are not authorized to view this page</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
