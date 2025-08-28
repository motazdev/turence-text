import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const SelectMenu01 = () => {
  return (
    <Select>
      <SelectTrigger className="lg:w-[50%] w-full py-6 rounded-xl">
        <SelectValue placeholder="Select Menu" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectMenu01;
