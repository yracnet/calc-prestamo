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
  paymentStartDate: "2025-06-30",
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
      paymentStartDate,
    } = data;
    const scheduledTime = 365 / paymentsPerYear;
    const paymentTotalAmount = amount * paymentRate;
    const interestRate = (annualRate + insuranceRate + referenceRate) / 100;
    const interestPerPayment = interestRate / paymentsPerYear;
    const totalPayments = paymentsPerYear * years;
    const scheduledPayment =
      (paymentTotalAmount * interestPerPayment) /
      (1 - Math.pow(1 + interestPerPayment, -totalPayments));

    const interestTotalAmount =
      scheduledPayment * totalPayments - paymentTotalAmount;
    setLoanPayment({
      currency: paymentCurrency,
      interestRate,
      interestPerPayment,
      interestTotalAmount,
      paymentStartDate,
      paymentTotalAmount,
      totalPayments,
      scheduledPayment,
      scheduledTime,
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
        <CellInput label="Pagos por Año" className="c2">
          <InputNumber name="paymentsPerYear" />
        </CellInput>
        <CellInput label="Fecha de Inicio" className="c3">
          <InputDate name="paymentStartDate" />
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
            value={loanPayment.paymentTotalAmount}
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
            value={loanPayment.interestTotalAmount}
            sufix={loanPayment.currency}
          />
        </CellInput>
        <CellInput label="Tasa de Interés Anual" className="b2">
          <NumberFormat value={loanPayment.interestRate * 100} sufix="%" />
        </CellInput>
        <CellInput label="Tasa de Interés por Cuota" className="b3">
          <NumberFormat
            value={loanPayment.interestPerPayment * 100}
            sufix="%"
          />
        </CellInput>
        <CellInput label="Cuota Mensual" className="a3">
          <NumberFormat
            value={loanPayment.scheduledPayment}
            sufix={loanPayment.currency}
          />
        </CellInput>
      </FormLayout>
    </Form2Provider>
  );
};
