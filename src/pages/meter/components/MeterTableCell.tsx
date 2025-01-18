import React, { PropsWithChildren } from "react";
import { ClassValue } from "clsx";

// Libs
import { cn } from "../../../lib/utils";

type MeterTableCellProps = {
  className?: ClassValue;
  isHeader?: boolean;
  align?: "left" | "center" | "right";
};

const textStyle = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const MeterTableCell: React.FC<PropsWithChildren<MeterTableCellProps>> = ({
  children,
  className,
  isHeader,
  align = "left",
}) => {
  const Container = isHeader ? "th" : "td";

  return (
    <Container className={cn("px-4 py-4", `${textStyle[align]}`, className)}>
      {children}
    </Container>
  );
};

export default MeterTableCell;
