import React, { useCallback, useEffect, useMemo, useState } from "react";

// Libs
import toast from "react-hot-toast";

// Hooks
import { useSearchParams } from "react-router-dom";

// Types
import { Meter } from "../../../types/Meter";

const useMeterListFilter = (metersList: Meter[]) => {
  // States
  const [filteredMeters, setFilteredMeters] = useState<Meter[]>(metersList);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    serialNumber: searchParams.get("serialNumber") || "",
    location: searchParams.get("location") || "",
    status: searchParams.get("status") || "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Functions
  const handleInputChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = useCallback(() => {
    const newParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);

    const filtered = metersList.filter((meter: Meter) => {
      const matchesSerial = filters.serialNumber
        ? meter.serialNumber.includes(filters.serialNumber)
        : true;
      const matchesLocation = filters.location
        ? meter.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchesStatus = filters.status
        ? meter.status.toLowerCase() === filters.status.toLowerCase()
        : true;

      return matchesSerial && matchesLocation && matchesStatus;
    });

    if (filtered.length === 0) {
      toast.error("No result found for the selected filters.");
    }

    setFilteredMeters(filtered);
    setCurrentPage(1);
  }, [filters, metersList, setSearchParams]);
  const handleItemsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(e.target.value));
      setCurrentPage(1);
    },
    []
  );

  // Effects
  useEffect(() => {
    const serialNumberQuery = searchParams.get("serialNumber") || "";
    const locationQuery = searchParams.get("location") || "";
    const statusQuery = searchParams.get("status") || "";

    const filtered = metersList.filter((meter: Meter) => {
      const matchesSerial = serialNumberQuery
        ? meter.serialNumber.includes(serialNumberQuery)
        : true;
      const matchesLocation = locationQuery
        ? meter.location.toLowerCase().includes(locationQuery.toLowerCase())
        : true;
      const matchesStatus = statusQuery
        ? meter.status.toLowerCase() === statusQuery.toLowerCase()
        : true;

      return matchesSerial && matchesLocation && matchesStatus;
    });

    setFilteredMeters(filtered);
  }, [searchParams, metersList]);

  // Memos
  const currentMeters = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredMeters.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredMeters, itemsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(filteredMeters.length / itemsPerPage),
    [filteredMeters.length, itemsPerPage]
  );

  return {
    itemsPerPage,
    filterMeterData: filters,
    currentMeters,
    totalPages,
    currentPage,
    setCurrentPage,
    handleInputChange,
    handleSearch,
    handleItemsPerPageChange,
  };
};

export default useMeterListFilter;
