import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Styles
import "./App.css";

// Providers
import { TooltipProvider } from "./components/ui/tooltip.tsx";

// Comopnents
import DefaultLayout from "./layouts/default-layout.tsx";
import MeterDetailPage from "./pages/meter/MeterDetailPage.tsx";
import MeterListHomePage from "./pages/meter/MeterListHomePage.tsx";
import NotFoundPage from "./pages/404/NotFoundPage.tsx";

const App: React.FC = () => {
  return (
    <TooltipProvider delayDuration={300}>
      <Router>
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<MeterListHomePage />} />
            <Route path="/meter/:id" element={<MeterDetailPage />} />

            {/* No Match Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </DefaultLayout>
        <Toaster position="top-center" reverseOrder={false} />
      </Router>
    </TooltipProvider>
  );
};

export default App;
