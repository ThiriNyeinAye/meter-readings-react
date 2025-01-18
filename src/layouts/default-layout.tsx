import React, { PropsWithChildren, useState } from "react";
import Tabs from "../components/layouts/tabs";

const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [{ label: "Meter", path: "/" }];

  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-100 shadow-sm">
        <div className="max-w-screen-lg mx-auto px-6">
          <Tabs
            tabs={tabs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto p-6">{children}</div>
    </div>
  );
};

export default DefaultLayout;
