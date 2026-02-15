import MonthYearPicker from "@/components/common/month-year-picker";
import AttendanceTable from "@/components/employee/attendance-table";
import EmployeeDetails from "@/components/employee/employee-details";
import MarkAttendanceButton from "@/components/employee/mark-attendance-button";
import { Spinner } from "@/components/ui/spinner";
import { fetchEmployee } from "@/services/employee";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/employees/$employeeId/attendance")({
  component: RouteComponent,
});

function RouteComponent() {
  const { employeeId } = Route.useParams();

  const [attendanceDate, setAttendanceDate] = useState(() => {
    const date = new Date();
    return `${date.getMonth() + 1}-${date.getFullYear()}`;
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["employee", employeeId, attendanceDate],
    queryFn: () => fetchEmployee({ id: employeeId, attendanceDate }),
  });

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center h-full">
        <Spinner className="size-8" />
      </div>
    );

  if (isError || !data) return <p>Error in fetching employee</p>;

  return (
    <div className="flex sm:flex-row flex-col gap-10 justify-center mx-auto">
      <div className="sm:w-1/2 flex flex-col gap-4 items-end">
        <EmployeeDetails
          employee={{
            id: data.id,
            name: data.name,
            email: data.email,
            department: data.department,
          }}
        />
      </div>
      <div className="sm:w-1/2  flex flex-col gap-2">
        <div className="flex justify-between">
          <MonthYearPicker
            value={{
              month: attendanceDate.split("-")[0],
              year: attendanceDate.split("-")[1],
            }}
            onChange={(val) => setAttendanceDate(`${val.month}-${val.year}`)}
          />
          <MarkAttendanceButton employeeId={employeeId} refetch={refetch} />
        </div>
        <AttendanceTable attendance={data?.attendance || []} />
      </div>
    </div>
  );
}
