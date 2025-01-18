import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Hooks
import { useMeterDetails } from "../../hooks/useMeterDetails";
import useMeterRead from "../../hooks/useMeterRead";
import useMeterReadForm from "./hooks/useMeterReadForm";

// Types
import { MeterReadingType } from "../../stores/useMeterReadStore";

// Components
import ErrorText from "../../components/common/ErrorText";
import PageHeader from "../../components/common/PageHeader";
import { Button } from "../../components/ui/button";
import { DatePickerDemo } from "../../components/ui/datepicker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import Pagination from "../../components/ui/pagination";
import { Switch } from "../../components/ui/switch";
import MeterDetailInfo from "./components/MeterDetailInfo";
import MeterTableCell from "./components/MeterTableCell";
import MeterTableRow from "./components/MeterTableRow";
import MeterTable from "./components/MeterTable";
import Label from "../../components/ui/label";
import Loading from "../../components/common/Loading";

const METER_TABLE_HEADERS = [
  "Read Date",
  "Reading",
  "Rollover Flag",
  "Consumption",
];

const MeterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Hooks
  const { data: meterDetails, isLoading, error } = useMeterDetails(id ?? "");
  const { readingsList } = useMeterRead(meterDetails?.serialNumber);
  const {
    readDate,
    rolloverFlag,
    isDialogOpen,
    readDateError,
    readingError,
    setIsDialogOpen,
    setReading,
    setReadingError,
    setReadDate,
    setReadDateError,
    setRolloverFlag,
    handleCreateRead,
  } = useMeterReadForm(meterDetails?.serialNumber);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(readingsList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReadings = readingsList.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) return <Loading />;

  if (error) return <div>Error fetching meter details.</div>;

  return (
    <div className="bg-white shadow-md p-6 rounded-md">
      <PageHeader>Meter Detail - {meterDetails?.serialNumber}</PageHeader>

      <MeterDetailInfo meterDetails={meterDetails} />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsDialogOpen(true)}
            variant={"primary"}
            className="mb-4"
          >
            Create Read
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md rounded-lg shadow-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Create Read</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className={"text-black"}>Read Date</Label>
              <DatePickerDemo
                date={readDate}
                onDateChange={(date) => {
                  setReadDate(date);
                  if (date) setReadDateError("");
                }}
              />
              {readDateError && <ErrorText>{readDateError}</ErrorText>}
            </div>

            <div>
              <Label htmlFor="reading">Reading</Label>
              <Input
                id="reading"
                type="number"
                onChange={(e) => {
                  const value = e.target.value;
                  setReading(value);
                  if (value && !isNaN(Number(value)) && Number(value) >= 0) {
                    setReadingError("");
                  }
                }}
                className="mt-1 w-full"
              />
              {readingError && <ErrorText>{readingError}</ErrorText>}
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="rolloverFlag">Rollover Flag</Label>
              <Switch
                checked={rolloverFlag}
                onCheckedChange={setRolloverFlag}
                className="ml-2"
              />
            </div>

            <DialogFooter>
              <Button onClick={handleCreateRead} variant={"primary"}>
                Create
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <MeterTable>
        <thead>
          <MeterTableRow isHeader={true}>
            {METER_TABLE_HEADERS.map((header) => (
              <MeterTableCell isHeader={true} key={header}>
                {header}
              </MeterTableCell>
            ))}
          </MeterTableRow>
        </thead>
        <tbody>
          {currentReadings.map(
            (
              { date, reading, rollover, consumption }: MeterReadingType,
              index
            ) => (
              <MeterTableRow key={index} className="text-sm">
                <MeterTableCell>
                  {new Date(date).toLocaleDateString()}
                </MeterTableCell>
                <MeterTableCell>{reading}</MeterTableCell>
                <MeterTableCell>{rollover ? "True" : "False"}</MeterTableCell>
                <MeterTableCell>{consumption}</MeterTableCell>
              </MeterTableRow>
            )
          )}
        </tbody>
      </MeterTable>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={setCurrentPage}
        />
      )}

      <Button onClick={() => navigate(-1)}>Back to Listing</Button>
    </div>
  );
};

export default MeterDetailPage;
