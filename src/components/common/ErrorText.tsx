import { ClassValue } from "clsx";
import { PropsWithChildren } from "react";

// Libs
import { cn } from "../../lib/utils";

type ErrorTextProps = {
  className?: ClassValue;
};

function ErrorText({ children, className }: PropsWithChildren<ErrorTextProps>) {
  return <p className={cn("text-red-500 text-sm", className)}>{children}</p>;
}

export default ErrorText;
