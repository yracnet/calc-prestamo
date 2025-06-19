import { Form2Provider, InputDate, InputNumber, InputOptions } from "../inputs";
import { CellAction, CellInput, CellTitle, FormLayout } from "../layout";
import { NumberFormat } from "../numberFormat";
import { loanConfigSchema } from "./model";

const prestamoMonedas = ["USD", "EUR", "GBP"];
const pagoMonedas = ["BOB", "UFV"];

export const DatosPrestamo = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form2Provider onSubmit={onSubmit} schema={loanConfigSchema}>
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
        <CellInput label="Fecha de Inicio" name="6">
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
        <CellInput label={`Importe a Pagar`} name="1">
          <NumberFormat value={0} sufix={""} />
        </CellInput>
        <CellInput label="Tasa de Interés Anual" name="2">
          <NumberFormat value={0} sufix="%" />
        </CellInput>

        <CellInput label="Tasa de Interés Mensual" name="3">
          <NumberFormat value={0} sufix="%" />
        </CellInput>

        <CellInput label="Número de Cuotas" name="4">
          <NumberFormat value={0} sufix="" decimal={0} />
        </CellInput>

        <CellInput label="Cuota Mensual" name="5">
          <NumberFormat value={0} sufix={""} />
        </CellInput>
      </FormLayout>
    </Form2Provider>
  );
};
