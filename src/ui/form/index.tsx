import { Form2Provider, InputDate, InputNumber, InputOptions } from "../inputs";
import { CellInput, FormLayout } from "../layout";
import { NumberFormat } from "../numberFormat";
import { useLoanPaymentState } from "../state";
import { loanConfigSchema, type LoanConfig } from "../state/model";

const prestamoMonedas = ["USD", "EUR", "GBP"];
const pagoMonedas = ["BOB", "UFV"];

const DATA_INIT: LoanConfig = {
  currency: "USD",
  amount: 50000,
  paymentRate: 6.96,
  paymentCurrency: "BOB",
  annualRate: 5.5,
  insuranceRate: 1.8,
  referenceRate: 0,
  years: 15,
  paymentsPerYear: 12,
  startDate: "2025-06-30",
};

export const DatosPrestamo = () => {
  const [loanPayment, setLoanPayment] = useLoanPaymentState();
  const onSubmit = (data: LoanConfig) => {
    const {
      paymentCurrency,
      amount,
      paymentRate,
      annualRate,
      insuranceRate,
      referenceRate,
      years,
      paymentsPerYear,
      startDate,
    } = data;
    const monthsPerPayment = Math.round(12 / paymentsPerYear);
    const principalAmount = amount * paymentRate;
    const interestAnnual = (annualRate + insuranceRate + referenceRate) / 100;
    const interestPerPeriod = interestAnnual / paymentsPerYear;
    const totalPayments = paymentsPerYear * years;
    const paymentAmount =
      (principalAmount * interestPerPeriod) /
      (1 - Math.pow(1 + interestPerPeriod, -totalPayments));

    const interestTotal = paymentAmount * totalPayments - principalAmount;
    setLoanPayment({
      currency: paymentCurrency,
      interestAnnual,
      interestPerPeriod,
      interestTotal,
      startDate,
      principalAmount,
      totalPayments,
      paymentAmount,
      monthsPerPayment,
    });
  };

  return (
    <Form2Provider
      onSubmit={onSubmit}
      schema={loanConfigSchema}
      init={DATA_INIT}
    >
      <FormLayout>
        <div className="x1">
          <h3>Moneda</h3>
        </div>
        <CellInput label="Moneda del Préstamo" className="a1">
          <InputOptions name="currency" options={prestamoMonedas} />
        </CellInput>
        <CellInput label="Moneda a Pagar" className="a2">
          <InputOptions name="paymentCurrency" options={pagoMonedas} />
        </CellInput>
        <CellInput label={`Tipo de Cambio`} className="a3">
          <InputNumber name="paymentRate" />
        </CellInput>
      </FormLayout>
      <FormLayout>
        <div className="x1">
          <h3>Datos del Préstamo</h3>
        </div>
        <CellInput label="Importe del Préstamo" className="a1">
          <InputNumber name="amount" />
        </CellInput>
        <CellInput label="Tasa de Interés Anual (%)" className="b1">
          <InputNumber name="annualRate" />
        </CellInput>
        <CellInput label="Seguro Degrabamen Anual (%)" className="b2">
          <InputNumber name="insuranceRate" />
        </CellInput>
        <CellInput label="Tasa Rerefencial (%)" className="b3">
          <InputNumber name="referenceRate" />
        </CellInput>
        <CellInput label="Plazo del Préstamo (años)" className="c1">
          <InputNumber name="years" />
        </CellInput>
        <CellInput label="Numero de pagos por Año" className="c2">
          <InputNumber name="paymentsPerYear" />
        </CellInput>
        <CellInput label="Fecha de Inicio" className="c3">
          <InputDate name="startDate" />
        </CellInput>
      </FormLayout>
      <FormLayout>
        <div className="x1">
          <h3>Detalle del Préstamo</h3>
        </div>
        <div className="x2">
          <button type="submit">Calular</button>
        </div>
        <CellInput label={`Importe Prestamo`} className="a1">
          <NumberFormat
            value={loanPayment.principalAmount}
            sufix={loanPayment.currency}
          />
        </CellInput>
        <CellInput label="Número de Cuotas" className="a2">
          <NumberFormat
            value={loanPayment.totalPayments}
            sufix=""
            decimal={0}
          />
        </CellInput>
        <CellInput label={`Importe Interes`} className="b1">
          <NumberFormat
            value={loanPayment.interestTotal}
            sufix={loanPayment.currency}
          />
        </CellInput>
        <CellInput label="Tasa de Interés Anual" className="b2">
          <NumberFormat value={loanPayment.interestAnnual * 100} sufix="%" />
        </CellInput>
        <CellInput label="Tasa de Interés por Cuota" className="b3">
          <NumberFormat value={loanPayment.interestPerPeriod * 100} sufix="%" />
        </CellInput>
        <CellInput label="Cuota Mensual" className="a3">
          <NumberFormat
            value={loanPayment.paymentAmount}
            sufix={loanPayment.currency}
          />
        </CellInput>
      </FormLayout>
    </Form2Provider>
  );
};
