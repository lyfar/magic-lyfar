"use client";

import React, { useState, useEffect } from "react";
import {
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  subYears,
  subMonths,
  subWeeks,
  isSameDay,
} from "date-fns";
import {
  Column,
  Text,
  Row,
  DateRange,
  DateRangePicker,
  DropdownWrapper,
  IconButton,
  ToggleButton,
} from "../../components";
import { DateConfig, PresetsConfig } from "./interfaces";

interface ChartHeaderProps
  extends Omit<React.ComponentProps<typeof Column>, "title" | "description"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  dateRange?: DateRange;
  date?: DateConfig;
  onDateRangeChange?: (range: DateRange) => void;
  presets?: PresetsConfig;
}

const ChartHeaderContent: React.FC<Omit<ChartHeaderProps, "presets"> & {
  dateRangeOpen: boolean;
  setDateRangeOpen: (isOpen: boolean) => void;
  selectedPreset: string | null;
  handlePresetClick: (presetName: any) => void;
  handleDateRangeChange: (range: DateRange) => void;
  dateRangePresets: any;
  presets: PresetsConfig;
}> = ({
  title,
  description,
  dateRange,
  date,
  dateRangeOpen,
  setDateRangeOpen,
  selectedPreset,
  handlePresetClick,
  handleDateRangeChange,
  dateRangePresets,
  presets,
  ...flex
}) => {
  return (
    <Column fillWidth paddingX="20" paddingY="12" gap="4" {...flex}>
      <Row fillWidth vertical="center">
        <Column fillWidth gap="4">
          {title && <Text variant="heading-strong-xs">{title}</Text>}
          {description && (
            <Text variant="label-default-s" onBackground="neutral-weak">
              {description}
            </Text>
          )}
        </Column>
        {dateRange && date?.selector && (
          <DropdownWrapper
            isOpen={dateRangeOpen}
            onOpenChange={setDateRangeOpen}
            placement="bottom-end"
            trigger={
              <IconButton
                icon="calendar"
                onClick={() => setDateRangeOpen(!dateRangeOpen)}
                variant="secondary"
                size="m"
              />
            }
            dropdown={
              <Row padding="4" mobileDirection="column">
                {presets.display && (
                  <Column
                    mobileDirection="row"
                    padding="4"
                    gap="2"
                    minWidth={8}
                    border="neutral-alpha-weak"
                    radius="m"
                    overflowX="scroll"
                  >
                    {(Object.keys(dateRangePresets) as any[])
                      .filter((presetName) => {
                        if (presets.granularity === "year") {
                          return presetName.includes("year");
                        } else if (presets.granularity === "month") {
                          return presetName.includes("year") || presetName.includes("month");
                        } else {
                          return true;
                        }
                      })
                      .map((presetName) => (
                        <ToggleButton
                          key={presetName}
                          style={{ paddingLeft: "0.25rem" }}
                          fillWidth
                          horizontal="start"
                          selected={selectedPreset === presetName}
                          onClick={() => handlePresetClick(presetName)}
                        >
                          {presetName}
                        </ToggleButton>
                      ))}
                  </Column>
                )}
                <DateRangePicker
                  size="s"
                  padding="16"
                  gap="24"
                  id="chart-date-range"
                  maxDate={date?.max}
                  minDate={date?.min}
                  dual={date?.dual}
                  value={dateRange}
                  onChange={handleDateRangeChange}
                />
              </Row>
            }
          />
        )}
      </Row>
    </Column>
  );
};

export const ChartHeader: React.FC<ChartHeaderProps> = ({
  title,
  description,
  dateRange,
  date,
  onDateRangeChange,
  presets = { display: true, granularity: "week" },
  ...flex
}) => {
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  type DateRangePreset = {
    getRange: () => DateRange;
  };

  type PresetName =
    | "This year"
    | "This month"
    | "This week"
    | "Last year"
    | "Last month"
    | "Last week";

  const dateRangePresets: Record<PresetName, DateRangePreset> = React.useMemo(() => ({
    "This year": { getRange: () => ({ startDate: startOfYear(new Date()), endDate: endOfYear(new Date()) }) },
    "This month": { getRange: () => ({ startDate: startOfMonth(new Date()), endDate: endOfMonth(new Date()) }) },
    "This week": { getRange: () => ({ startDate: startOfWeek(new Date()), endDate: endOfWeek(new Date()) }) },
    "Last year": { getRange: () => { const l = subYears(new Date(), 1); return { startDate: startOfYear(l), endDate: endOfYear(l) }; } },
    "Last month": { getRange: () => { const l = subMonths(new Date(), 1); return { startDate: startOfMonth(l), endDate: endOfMonth(l) }; } },
    "Last week": { getRange: () => { const l = subWeeks(new Date(), 1); return { startDate: startOfWeek(l), endDate: endOfWeek(l) }; } },
  }), []);

  useEffect(() => {
    if (dateRange) {
      const matchingPreset = Object.entries(dateRangePresets).find(([, preset]) => {
        const presetRange = preset.getRange();
        return (
          dateRange.startDate && presetRange.startDate && isSameDay(dateRange.startDate, presetRange.startDate) &&
          dateRange.endDate && presetRange.endDate && isSameDay(dateRange.endDate, presetRange.endDate)
        );
      });
      setSelectedPreset(matchingPreset ? matchingPreset[0] : null);
    } else {
      setSelectedPreset(null);
    }
  }, [dateRange, dateRangePresets]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDateRangeOpen(false);
    };
    if (dateRangeOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [dateRangeOpen]);

  const handleDateRangeChange = (newRange: DateRange) => {
    if (onDateRangeChange) {
      onDateRangeChange(newRange);
    }
  };

  const handlePresetClick = (presetName: PresetName) => {
    const newRange = dateRangePresets[presetName].getRange();
    setSelectedPreset(presetName);
    handleDateRangeChange(newRange);
  };

  if (!title && !description && !date?.selector) {
    return null;
  }

  return (
    <ChartHeaderContent
      title={title}
      description={description}
      dateRange={dateRange}
      date={date}
      dateRangeOpen={dateRangeOpen}
      setDateRangeOpen={setDateRangeOpen}
      selectedPreset={selectedPreset}
      handlePresetClick={handlePresetClick}
      handleDateRangeChange={handleDateRangeChange}
      dateRangePresets={dateRangePresets}
      presets={presets}
      {...flex}
    />
  );
};

export type { ChartHeaderProps };
