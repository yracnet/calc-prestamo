import { Provider } from "jotai";
import { createRoot } from "react-dom/client";
import { LoanProvider } from "./ui/context";
import { DatosPrestamo } from "./ui/form";
import { HistorialPago } from "./ui/historialPago";
import { TemplateLayout } from "./ui/layout";
import { PlanPago } from "./ui/planPago";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <LoanProvider>
      <TemplateLayout>
        <div className="a1">
          <DatosPrestamo />
        </div>
        <div className="b1">
          <PlanPago />
        </div>
        <div className="b2">
          <HistorialPago />
        </div>
      </TemplateLayout>
    </LoanProvider>
  </Provider>
);
