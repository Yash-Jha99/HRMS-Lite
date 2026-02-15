import { Employee } from "@/services/employee";

type Props = {
  employee: Omit<Employee, "total_present">;
};

const EmployeeDetails = ({ employee }: Props) => {
  return (
    <div className="flex flex-col w-full gap-3 p-4 rounded-md border">
      <div className="flex gap-8">
        <div className="sm:w-40 w-24 font-medium">Employee Id</div>
        <div>{employee.id}</div>
      </div>
      <div className="flex gap-8">
        <div className="sm:w-40 w-24 font-medium">Name</div>
        <div>{employee.name}</div>
      </div>
      <div className="flex gap-8">
        <div className="sm:w-40 w-24 font-medium">Email</div>
        <div>{employee.email}</div>
      </div>
      <div className="flex gap-8">
        <div className="sm:w-40 w-24 font-medium">department</div>
        <div>{employee.department}</div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
