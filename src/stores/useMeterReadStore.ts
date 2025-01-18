import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type MeterReadingType = {
  id: number;
  consumption: number;
  date: Date;
  reading: number;
  rollover: boolean;
};

interface UseMeterStoreReadState {
  meterReadList: Record<string, MeterReadingType[]>;
  addMeterReadList: (data: MeterReadingType, meterSerialNo: string) => void;
}

export const useMeterReadStore = create<UseMeterStoreReadState>()(
  persist(
    (set, get) => ({
      meterReadList: {},
      addMeterReadList: (data: MeterReadingType, meterSerialNo: string) => {
        const meters = get().meterReadList;

        const newMeterList = meters[meterSerialNo]
          ? [...meters[meterSerialNo], data]
          : [data];

        set((state) => {
          return {
            ...state,
            meterReadList: {
              ...state.meterReadList,
              [meterSerialNo]: newMeterList,
            },
          };
        });
      },
    }),
    {
      name: "meter-list-read-list",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);