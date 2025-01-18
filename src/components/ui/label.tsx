import { ClassValue } from "clsx";
import React, { PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

type LabelProps = {
  className?: ClassValue;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({
  children,
  className,
  ...rest
}: PropsWithChildren<LabelProps>) => {
  return (
    <label className={cn("block text-sm font-medium text-gray-700 mb-1", className)} {...rest}>
      {children}
    </label>
  );
};

export default Label;
