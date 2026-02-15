import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

type Props = {
  onChange: (val: { month: string; year: string }) => void;
  value: { month: string; year: string };
};

const MONTHS = [
  { label: "Jan", value: 1 },
  { label: "Feb", value: 2 },
  { label: "Mar", value: 3 },
  { label: "Apr", value: 4 },
  { label: "May", value: 5 },
  { label: "Jun", value: 6 },
  { label: "Jul", value: 7 },
  { label: "Aug", value: 8 },
  { label: "Sep", value: 9 },
  { label: "Oct", value: 10 },
  { label: "Nov", value: 11 },
  { label: "Dec", value: 12 },
];

const MonthYearPicker = ({ onChange, value }: Props) => {
  const [month, setMonth] = useState(value.month);
  const [year, setYear] = useState(value.year);

  const years = Array.from({ length: 20 }).map(
    (_, i) => new Date().getFullYear() - i
  );

  useEffect(() => {
    onChange({ month, year });
  }, [month, year]);

  return (
    <div className="flex gap-4 w-1/2">
      <Select value={month} onValueChange={(val) => setMonth(val)}>
        <SelectTrigger id="month" className="w-full ">
          <SelectValue placeholder="Select a month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {MONTHS.map((month) => (
              <SelectItem key={month.value} value={month.value.toString()}>
                {month.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={year} onValueChange={(val) => setYear(val)}>
        <SelectTrigger id="year" className="w-full ">
          <SelectValue placeholder="Select a year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year.toString()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MonthYearPicker;
