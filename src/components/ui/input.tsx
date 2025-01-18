import React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "border block border-gray-300 rounded-md bg-white px-3 py-2",
        "shadow-sm focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
