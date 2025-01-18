import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Hooks
import { useMeterList } from "./hooks/useMeterList";
import useMeterListFilter from "./hooks/useMeterListFilter";

// Libs
import { cn } from "../../lib/utils";

// Styles
import { SELECTOR_STYLE } from "../../styles/styleConfig";

// Components
import { RiCheckboxCircleLine } from "@remixicon/react";
import Loading from "../../components/common/Loading";
import PageHeader from "../../components/common/PageHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Label from "../../components/ui/label";
import Pagination from "../../components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import MeterTable from "./components/MeterTable";
import MeterTableCell from "./components/MeterTableCell";
import MeterTableRow from "./components/MeterTableRow";
import SelectorWrapper from "../../components/common/SelectorWrapper";
import CrossOutlineIcon from "../../components/icons/CloseIcon";

const METER_TABLE_HEADERS = [
  "Meter Serial Number",
  "Meter Date",
  "Location",
  "Status",
  "Actions",
];

const PER_PAGE_OPTIONS = [5, 10, 20];

const MeterListHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: metersList = [], isLoading, error } = useMeterList();
  const {
    filterMeterData,
    currentMeters,
    itemsPerPage,
    totalPages,
    currentPage,
    setCurrentPage,
    handleInputChange,
    handleSearch,
    handleItemsPerPageChange,
  } = useMeterListFilter(metersList);

  const handleViewDetails = useCallback(
    (id: number) => {
      navigate(`/meter/${id}`);
    },
    [navigate]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading meters: {(error as Error).message}</div>;
  }

  return (
    <div className="p-6">
      <PageHeader>Meter Listing</PageHeader>

      <div className="flex flex-col md:flex-row justify-between gap-6 mb-4">
        <div>
          <Label htmlFor="serialNumber" className="text-gray-700">
            Meter Serial Number:
          </Label>
          <Input
            type="text"
            placeholder="Meter Serial Number"
            value={filterMeterData.serialNumber}
            className="p-2 text-gray-700 w-full md:w-40"
            onChange={(e) => handleInputChange("serialNumber", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="date" className="text-gray-700">
            Date:
          </Label>
          <Tooltip>
            <TooltipTrigger className="w-full md:w-40">
              <Input
                type="date"
                disabled={true}
                className="p-2 text-gray-700 w-full md:w-40"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{"Date not provided by API"}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div>
          <Label htmlFor="location" className="text-gray-700">
            Location:
          </Label>
          <Input
            type="text"
            placeholder="Location"
            value={filterMeterData.location}
            className="p-2 text-gray-700 w-full md:w-40"
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="status" className="text-gray-700">
            Status:
          </Label>
          <SelectorWrapper>
            <select
              value={filterMeterData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className={cn(
                SELECTOR_STYLE.className,
                "text-sm appearance-none pr-8 bg-white rounded w-full sm:w-44"
              )}
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </SelectorWrapper>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4 items-center rounded-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <Label htmlFor="itemsPerPage" className="text-gray-700 text-sm">
            Showing:
          </Label>
          <SelectorWrapper>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className={cn(
                SELECTOR_STYLE.className,
                "w-20 sm:w-20 appearance-none text-sm"
              )}
            >
              {PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </SelectorWrapper>
        </div>
        <div className="w-full sm:w-auto flex justify-start">
          <Button
            variant={"primary"}
            onClick={handleSearch}
            className="w-full sm:w-auto"
            size={"sm"}
          >
            Search
          </Button>
        </div>
      </div>

      <MeterTable>
        <thead>
          <MeterTableRow isHeader={true}>
            {METER_TABLE_HEADERS.map((header, index) => {
              const isLastItem = index === METER_TABLE_HEADERS.length - 1;
              return (
                <MeterTableCell
                  isHeader={true}
                  key={header}
                  align={isLastItem ? "right" : "left"}
                  className={isLastItem && "pr-11"}
                >
                  {header}
                </MeterTableCell>
              );
            })}
          </MeterTableRow>
        </thead>
        <tbody>
          {currentMeters.map((meter) => (
            <MeterTableRow key={meter.id} className="text-sm">
              <MeterTableCell>{meter.serialNumber}</MeterTableCell>
              <MeterTableCell>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p>—</p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{"Date not provided by API"}</p>
                  </TooltipContent>
                </Tooltip>
              </MeterTableCell>
              <MeterTableCell>{meter.location}</MeterTableCell>
              <MeterTableCell>
                {meter.status === "Active" ? (
                  <>
                    <RiCheckboxCircleLine
                      className="inline-block mr-2"
                      size={18}
                    />
                    Active
                  </>
                ) : (
                  <>
                    <CrossOutlineIcon className="inline-block size-4 mr-2" />
                    Inactive
                  </>
                )}
              </MeterTableCell>
              <MeterTableCell align="right">
                <Button
                  onClick={() => handleViewDetails(meter.id)}
                  variant={"primary"}
                  className="bg-indigo-500 text-white px-3 py-1 rounded-md"
                  size={"sm"}
                >
                  View Details
                </Button>
              </MeterTableCell>
            </MeterTableRow>
          ))}
        </tbody>
      </MeterTable>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default MeterListHomePage;
