import React from "react";

export const Switch = React.forwardRef<HTMLButtonElement, { checked: boolean; onCheckedChange: (checked: boolean) => void; className?: string }>(
    ({ checked, onCheckedChange, className }, ref) => {
      return (
        <button
          ref={ref}
          role="switch"
          aria-checked={checked}
          onClick={() => onCheckedChange(!checked)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full border border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${checked ? "bg-blue-600" : "bg-gray-200"} ${className}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
          />
        </button>
      );
    }
  );
  Switch.displayName = "Switch";