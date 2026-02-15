import apiClient from "@/lib/api-client";

type PaginatedResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T;
};

export type Attendance = {
  id: string;
  date: string;
  status: string;
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  total_present: string;
};

export type EmployeeAttendance = Omit<Employee, "total_present"> & {
  attendance: Attendance[];
};

type EmployeesParams = {
  page: number;
};

export const fetchEmployees = async (params: EmployeesParams) => {
  return apiClient
    .get<PaginatedResponse<Employee[]>>("/employee/", { params })
    .then((res) => res.data);
};

export const fetchEmployee = async ({
  id,
  attendanceDate,
}: {
  id: string;
  attendanceDate: string;
}) => {
  return apiClient
    .get<EmployeeAttendance>(`/employee/${id}/`, {
      params: {
        month_year: attendanceDate,
      },
    })
    .then((res) => res.data);
};

export const createEmployee = async (
  data: Pick<Employee, "name" | "email" | "department">
) => {
  return apiClient.post<Employee>("/employee/", data).then((res) => res.data);
};

export const deleteEmployee = async (id: string) => {
  return apiClient.delete(`/employee/${id}/`).then((res) => res.data);
};

export const markAttendance = async ({
  id,
  ...data
}: {
  id: string;
  date: string;
  status: string;
}) => {
  return apiClient
    .post<Attendance>(`/employee/${id}/mark_attendance/`, data)
    .then((res) => res.data);
};
