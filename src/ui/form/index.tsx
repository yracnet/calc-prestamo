import { useState } from "react";
import { Form2Provider, InputDate, InputNumber, InputOptions } from "../inputs";
import { CellAction, CellInput, CellTitle, FormLayout } from "../layout";
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
  const [cuotas, setCuotas] = useState([]);
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
    const interestPerPayment =
      (annualRate + insuranceRate + referenceRate) / paymentsPerYear / 100;
    const totalPayments = paymentsPerYear * years;
    const scheduledPayment =
      (paymentTotalAmount * interestPerPayment) /
      (1 - Math.pow(1 + interestPerPayment, -totalPayments));

    const interestTotalAmount =
      scheduledPayment * totalPayments - paymentTotalAmount;
    setLoanPayment({
      currency: paymentCurrency,
      interestPerPayment,
      interestTotalAmount,
      paymentStartDate,
      paymentTotalAmount,
      totalPayments,
      scheduledPayment,
      scheduledTime,
    });

    //const date = new Date(paymentStartDate);
    // const nuevaCuotas: any[] = [
    //   {
    //     id: 1,
    //     nro: "-",
    //     montoCuota: 0,
    //     montoCuotaInteres: 0,
    //     montoCuotaCapital: 0,
    //     montoSaldoCapital: nuevoImportePagar,
    //     fechaPago: paymentStartDate,
    //   },
    // ];
    // for (let index = 1; index <= totalPayments; index++) {
    //   const prev = nuevaCuotas[index - 1];
    //   const montoCuotaInteres = prev.montoSaldoCapital * interestPerPayment;
    //   const montoCuotaCapital = nuevaCuotaMensual - montoCuotaInteres;
    //   nuevaCuotas[index] = {
    //     id: index + 1,
    //     nro: index,
    //     montoCuota: nuevaCuotaMensual,
    //     montoCuotaInteres,
    //     montoCuotaCapital,
    //     montoSaldoCapital: prev.montoSaldoCapital - montoCuotaCapital,
    //     fechaPago: addMonths(date, index).toISOString().split("T")[0],
    //   };
    // }

    // console.log(nuevaCuotas);
  };

  return (
    <Form2Provider
      onSubmit={onSubmit}
      schema={loanConfigSchema}
      init={DATA_INIT}
    >
      <FormLayout>
        <CellTitle>
          <h3>Moneda</h3>
        </CellTitle>
        <CellInput label="Moneda del Préstamo" name="1">
          <InputOptions name="currency" options={prestamoMonedas} />
        </CellInput>
        <CellInput label="Moneda a Pagar" name="2">
          <InputOptions name="paymentCurrency" options={pagoMonedas} />
        </CellInput>
        <CellInput label={`Tipo de Cambio`} name="3">
          <InputNumber name="paymentRate" />
        </CellInput>
      </FormLayout>
      <FormLayout>
        <CellTitle>
          <h3>Datos del Préstamo</h3>
        </CellTitle>
        <CellInput label={`Importe del Préstamo`} name="1">
          <InputNumber name="amount" />
        </CellInput>
        <CellInput label="Tasa de Interés Anual (%)" name="2">
          <InputNumber name="annualRate" />
        </CellInput>
        <CellInput label="Seguro Degrabamen Anual (%)" name="3">
          <InputNumber name="insuranceRate" />
        </CellInput>
        <CellInput label="Tasa Rerefencial (%)" name="4">
          <InputNumber name="referenceRate" />
        </CellInput>
        <CellInput label="Plazo del Préstamo (años)" name="5">
          <InputNumber name="years" />
        </CellInput>
        <CellInput label="Pagos por Año" name="6">
          <InputNumber name="paymentsPerYear" />
        </CellInput>
        <CellInput label="Fecha de Inicio" name="7">
          <InputDate name="paymentStartDate" />
        </CellInput>
      </FormLayout>
      <FormLayout>
        <CellAction>
          <button type="submit">Calular</button>
        </CellAction>
        <CellTitle>
          <h3>Detalle del Préstamo</h3>
        </CellTitle>
        <CellInput label={`Importe Prestamo`} name="1">
          <NumberFormat
            value={loanPayment.paymentTotalAmount}
            sufix={loanPayment.currency}
          />
        </CellInput>
        <CellInput label={`Importe Interes`} name="2">
          <NumberFormat
            value={loanPayment.interestTotalAmount}
            sufix={loanPayment.currency}
          />
        </CellInput>
        <CellInput label="Tasa de Interés" name="3">
          <NumberFormat
            value={loanPayment.interestPerPayment * 100}
            sufix="%"
          />
        </CellInput>

        <CellInput label="Número de Cuotas" name="4">
          <NumberFormat
            value={loanPayment.totalPayments}
            sufix=""
            decimal={0}
          />
        </CellInput>

        <CellInput label="Cuota Mensual" name="5">
          <NumberFormat
            value={loanPayment.scheduledPayment}
            sufix={loanPayment.currency}
          />
        </CellInput>
      </FormLayout>
      <pre>
        <code>{JSON.stringify(loanPayment, null, 2)}</code>
      </pre>
    </Form2Provider>
  );
};
