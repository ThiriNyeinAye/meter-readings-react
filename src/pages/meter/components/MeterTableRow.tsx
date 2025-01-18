import React, { PropsWithChildren } from "react";
import { ClassValue } from "clsx";

// Libs
import { cn } from "../../../lib/utils";

type MeterTableRowProps = {
  className?: ClassValue;
  isHeader?: boolean;
};
const MeterTableRow: React.FC<PropsWithChildren<MeterTableRowProps>> = ({
  children,
  className,
  isHeader,
}) => {
  return (
    <tr
      className={cn(
        "text-gray-700",
        isHeader && "text-gray-700 text-left bg-gray-50 border-b",
        className
      )}
    >
      {children}
    </tr>
  );
};

export default MeterTableRow;
