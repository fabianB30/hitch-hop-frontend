"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";

interface RangoFechaProps {
  value: DateRange | undefined; 
  onChange: (range: DateRange | undefined) => void; // medio yucky type
}

export default function RangoFecha( {value, onChange} : RangoFechaProps) {
  const [open, setOpen] = React.useState(false);

  const formatRange = (range: DateRange | undefined) => {
    if (!range?.from) return "Seleccionar rango";
    const from = range.from.toLocaleDateString();
    const to = range.to ? range.to.toLocaleDateString() : "...";
    return `${from} - ${to}`;
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-range"
            className="w-full border border-gray-300 justify-between font-normal"
          >
            {formatRange(value)}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={value}
            onSelect={(selectedRange) => {
              onChange(selectedRange);
              if (selectedRange?.to) setOpen(false);
            }}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
