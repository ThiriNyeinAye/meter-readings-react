import React from "react";
import { cn } from "../../lib/utils";
interface TabsProps {
  tabs: { label: string; path: string }[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeIndex, setActiveIndex }) => {
  return (
    <div className="flex items-center space-x-6 border-b border-gray-200 pt-8 px-14">
      <span className="text-2xl font-bold -top-2 relative mr-5">ICON</span>
      <div className="flex space-x-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={cn(
              "pb-2 text-sm px-8",
              index === activeIndex
                ? "border-b-2 border-indigo-500 font-semibold text-blue-600"
                : "text-gray-500"
            )}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
