"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  IdentificationIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/solid";
import { useGlobalContext } from "@/contexts/GlobalProvider";

interface SideBarProps {}

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: PresentationChartBarIcon,
    role: ["ADMIN"],
  },
  {
    title: "Employee",
    path: "/employee",
    icon: IdentificationIcon,
    role: ["ADMIN","SECRETARY"],
  },
  {
    title: "Departement",
    path: "/departement",
    icon: BuildingOfficeIcon,
    role: ["ADMIN"],
  },

];

export const SideBar: React.FC<SideBarProps> = () => {
  const pathname = usePathname() || "";
  const router = useRouter();

  // Import the role from the global context
  const {getRoleFromLocalStorage} = useGlobalContext();

  const role = getRoleFromLocalStorage();


  return (
    <Card
      className="fixed h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl bg-white"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="mb-2 p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Fahd App
        </Typography>
      </div>
      <List
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {menuItems.map((item) => (
          <ListItem
            key={item.title}
            className={`hover:bg-blue-gray-50 cursor-pointer ${
              pathname.startsWith(item.path)
                ? "bg-blue-gray-50 font-semibold"
                : ""
            }`}
            onClick={() => router.push(item.path)}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <ListItemPrefix
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <item.icon
                className={`h-5 w-5 ${
                  pathname.startsWith(item.path)
                    ? "text-blue-gray-900"
                    : "text-blue-gray-700"
                }`}
              />
            </ListItemPrefix>
            {item.title}
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
