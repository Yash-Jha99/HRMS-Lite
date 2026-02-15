import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createEmployee, deleteEmployee } from "@/services/employee";
import { useState } from "react";

type Props = {
  refetch: () => void;
  id: string;
};

const DeleteEmployeeButton = ({ refetch, id }: Props) => {
  const [open, setOpen] = useState(false);

  const deleteEmployeeMutation = useMutation({
    mutationKey: ["del_employee"],
    mutationFn: deleteEmployee,
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
    onSuccess: () => {
      setOpen(false);
      refetch();
    },
  });

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon">
            <Trash2Icon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete Employee?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this employee
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => deleteEmployeeMutation.mutate(id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteEmployeeButton;
