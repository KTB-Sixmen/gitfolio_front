"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns/format";
import { cn } from "@/lib/utils";
import { MonthRangePicker } from "@/components/ui/month-range-picker";
import moment from "moment";

type Props = {
  value: string;
  index: number;
  form: any;
};

export default function CustomMonthRangePicker({ value, form, index }: Props) {
  const [dates, setDates] = useState<{ start: Date; end: Date }>();

  const handleMonthRangeSelect = (selectedDates: {
    start: Date;
    end: Date;
  }) => {
    setDates(selectedDates);
    const formattedStart = moment(selectedDates.start).format("YYYY-MM");
    const formattedEnd = moment(selectedDates.end).format("YYYY-MM");

    // 변환된 값으로 form에 설정
    form.setValue(`${value}.${index}.startedAt`, formattedStart);
    form.setValue(`${value}.${index}.endedAt`, formattedEnd);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !dates && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dates ? (
            `${format(dates.start, "yyyy.MM")} - ${format(
              dates.end,
              "yyyy.MM"
            )}`
          ) : (
            <div>YYYY.MM - YYYY.MM</div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthRangePicker
          onMonthRangeSelect={handleMonthRangeSelect}
          selectedMonthRange={dates}
        />
      </PopoverContent>
    </Popover>
  );
}
