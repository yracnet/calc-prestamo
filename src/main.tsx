import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LoanProvider } from "./ui/context";
import { DatosPrestamo } from "./ui/data";
import { CellItem, TemplateLayout } from "./ui/layout";
import { PlanPago } from "./ui/planPago";
import { HistorialPago } from "./ui/historialPago";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoanProvider>
      <TemplateLayout>
        <CellItem>
          <DatosPrestamo />
        </CellItem>
        <CellItem index={2}>
          <PlanPago />
        </CellItem>
        <CellItem index={3}>
          <HistorialPago />
        </CellItem>
      </TemplateLayout>
    </LoanProvider>
  </StrictMode>
);
