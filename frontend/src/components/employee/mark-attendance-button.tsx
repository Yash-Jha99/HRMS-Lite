import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { markAttendance } from "@/services/employee";
import { DatePicker } from "../common/date-picker";
import dayjs from "dayjs";
import { Spinner } from "../ui/spinner";

type Props = {
  refetch: () => void;
  employeeId: string;
};

const MarkAttendanceButton = ({ refetch, employeeId }: Props) => {
  const [formValues, setFormValues] = useState({
    date: new Date(),
    status: "",
  });
  const [open, setOpen] = useState(false);

  const markAttendanceMutation = useMutation({
    mutationKey: ["mark_new_attendance"],
    mutationFn: markAttendance,
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
    onSuccess: () => {
      resetForm();
      setOpen(false);
      refetch();
    },
  });

  const resetForm = () =>
    setFormValues({
      status: "",
      date: new Date(),
    });

  const handleSubmit = () => {
    if (!formValues.status.trim()) return toast.error("Status cannot be empty");
    markAttendanceMutation.mutate({
      id: employeeId,
      status: formValues.status,
      date: dayjs(formValues.date).format("YYYY-MM-DD"),
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          resetForm();
        }}
      >
        <form>
          <DialogTrigger asChild>
            <Button>Mark Attendance</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm" showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Mark Attendance</DialogTitle>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="date">Date</Label>
                <DatePicker
                  id="date"
                  value={formValues.date}
                  onChange={(val) =>
                    setFormValues((prev) => ({
                      ...prev,
                      date: val,
                    }))
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formValues.status}
                  onValueChange={(val) =>
                    setFormValues((prev) => ({ ...prev, status: val }))
                  }
                >
                  <SelectTrigger id="status" className="w-full ">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                disabled={markAttendanceMutation.isPending}
                onClick={handleSubmit}
              >
                {" "}
                {markAttendanceMutation.isPending && <Spinner />} Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default MarkAttendanceButton;
