import React, { PropsWithChildren } from "react";
import { cn } from "../../lib/utils";
import { ClassValue } from "clsx";

type PageHeaderProps = {
  className?: ClassValue;
};

const PageHeader: React.FC<PropsWithChildren<PageHeaderProps>> = ({
  children,
  className,
}) => {
  return (
    <h1 className={cn("text-2xl font-bold mb-4", className)}>{children}</h1>
  );
};

export default PageHeader;
