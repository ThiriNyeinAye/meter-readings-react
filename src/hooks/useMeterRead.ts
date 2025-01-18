import { useCallback, useMemo } from "react";
import { useMeterReadStore, MeterReadingType } from "../stores/useMeterReadStore";

const useMeterRead = (meterSerialNo?: string) => {
  const { meterReadList, addMeterReadList } = useMeterReadStore();

  const readingsList = useMemo(() => {
    if (!meterSerialNo) return [];
    return meterReadList[meterSerialNo] ? meterReadList[meterSerialNo] : [];
  }, [meterSerialNo, meterReadList]);

  const addNewReadingList = useCallback(
    (data: MeterReadingType) => {
      if (!meterSerialNo) return;
      addMeterReadList(data, meterSerialNo);
    },
    [addMeterReadList, meterSerialNo]
  );

  return {
    readingsList,
    addNewReadingList,
  };
};
export default useMeterRead;
