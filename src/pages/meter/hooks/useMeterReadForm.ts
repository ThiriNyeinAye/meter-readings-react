import { useCallback, useState } from "react";

// Hooks
import useMeterRead from "../../../hooks/useMeterRead";

// Types
import { MeterReadingType } from "../../../stores/useMeterReadStore";

const useMeterReadForm = (serialNumber?: string) => {
  const { readingsList, addNewReadingList } = useMeterRead(serialNumber);
  const [rolloverFlag, setRolloverFlag] = useState(false);

  const [readDate, setReadDate] = useState<Date | undefined>();
  const [reading, setReading] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [readDateError, setReadDateError] = useState("");
  const [readingError, setReadingError] = useState("");

  const calculateConsumption = useCallback(
    (list: MeterReadingType[], newReading: number) => {
      if (list.length === 0) return newReading;
      const lastReading = Number(list[list.length - 1].reading);
      return newReading >= lastReading
        ? newReading - lastReading
        : newReading + (100000 - lastReading);
    },
    []
  );
  const handleCreateRead = () => {
    let hasError = false;

    if (!readDate) {
      setReadDateError("Read Date is required.");
      hasError = true;
    } else {
      setReadDateError("");
    }

    if (!reading) {
      setReadingError("Reading is required.");
      hasError = true;
    } else if (isNaN(Number(reading)) || Number(reading) < 0) {
      setReadingError("Reading must be a valid positive number.");
      hasError = true;
    } else {
      setReadingError("");
    }

    if (hasError) return;

    const newReading = {
      id: readingsList.length + 1,
      date: readDate ?? new Date(),
      reading: Number(reading),
      rollover: rolloverFlag,
      consumption: calculateConsumption(readingsList, Number(reading)),
    };
    addNewReadingList(newReading);
    setReadDate(undefined);
    setReading("");
    setRolloverFlag(false);
    setIsDialogOpen(false);
  };

  return {
    readDate,
    isDialogOpen,
    readDateError,
    readingError,
    rolloverFlag,
    setIsDialogOpen,
    setReading,
    setReadingError,
    setReadDate,
    setReadDateError,
    handleCreateRead,
    setRolloverFlag,
  };
};

export default useMeterReadForm;
