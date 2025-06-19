import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { LoanProvider } from "./ui/context";
import { DatosPrestamo } from "./ui/form";
import { HistorialPago } from "./ui/historialPago";
import { TemplateLayout } from "./ui/layout";
import { PlanPago } from "./ui/planPago";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <LoanProvider>
      <TemplateLayout>
        <div className="cell1">
          <DatosPrestamo />
        </div>
        <div className="cell2">
          <PlanPago />
        </div>
        <div className="cell3">
          <HistorialPago />
        </div>
      </TemplateLayout>
    </LoanProvider>
  </RecoilRoot>
);
