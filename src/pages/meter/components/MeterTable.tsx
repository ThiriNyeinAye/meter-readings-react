import { PropsWithChildren } from "react";
import { ClassValue } from "clsx";

// Libs
import { cn } from "../../../lib/utils";

type MeterTableProps = {
  className?: ClassValue;
};

const MeterTable = ({
  className,
  children,
}: PropsWithChildren<MeterTableProps>) => {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table
        className={cn(
          "table-auto w-full border-collapse shadow",
          className
        )}
      >
        {children}
      </table>
    </div>
  );
};

export default MeterTable;
