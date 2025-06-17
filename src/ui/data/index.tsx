import { useLoan } from "../context";
import { InputOptions, InputNumber, InputDate } from "../inputs";
import { CellAction, CellLabel, CellTitle, FormLayout } from "../layout";
import { NumberFormat } from "../numberFormat";

const prestamoMonedas = ["USD", "EUR", "GBP"];
const pagoMonedas = ["BOB", "UFV"];

export const DatosPrestamo = () => {
  const {
    monedaPrestamo,
    setMonedaPrestamo,
    importePrestamo,
    setImportePrestamo,
    tipoCambio,
    setTipoCambio,
    tasaInteresAnual,
    setTasaInteresAnual,
    periodoPrestamoAnual,
    setPeriodoPrestamoAnual,
    fechaInicioPrestamo,
    setFechaInicioPrestamo,
    monedaPagar,
    setMonedaPagar,
    importePagar,
    cuotaMensual,
    numeroCuotas,
    tasaInteresMensual,
    onCalulate,
  } = useLoan();

  return (
    <div>
      <FormLayout>
        <CellTitle>
          <h3>Moneda</h3>
        </CellTitle>
        <CellLabel label="Moneda del Préstamo">
          <InputOptions
            value={monedaPrestamo}
            setValue={setMonedaPrestamo}
            options={prestamoMonedas}
          />
        </CellLabel>
        <CellLabel index={2} label="Moneda a Pagar">
          <InputOptions
            value={monedaPagar}
            setValue={setMonedaPagar}
            options={pagoMonedas}
          />
        </CellLabel>
        <CellLabel
          index={3}
          label={`Tipo de Cambio (${monedaPagar}/${monedaPrestamo})`}
        >
          <InputNumber value={tipoCambio} setValue={setTipoCambio} />
        </CellLabel>
      </FormLayout>
      <FormLayout>
        <CellTitle>
          <h3>Datos del Préstamo</h3>
        </CellTitle>
        <CellLabel label={`Importe del Préstamo (${monedaPrestamo})`}>
          <InputNumber value={importePrestamo} setValue={setImportePrestamo} />
        </CellLabel>
        <CellLabel label="Tasa de Interés Anual (%)" index={2}>
          <InputNumber
            value={tasaInteresAnual}
            setValue={setTasaInteresAnual}
          />
        </CellLabel>
        <CellLabel label="Plazo del Préstamo (años)" index={3}>
          <InputNumber
            value={periodoPrestamoAnual}
            setValue={setPeriodoPrestamoAnual}
          />
        </CellLabel>
        <CellLabel label="Fecha de Inicio" index={4}>
          <InputDate
            value={fechaInicioPrestamo}
            setValue={setFechaInicioPrestamo}
          />
        </CellLabel>
      </FormLayout>
      <FormLayout>
        <CellAction>
          <button onClick={onCalulate}>Calular</button>
        </CellAction>
        <CellTitle>
          <h3>Detalle del Préstamo</h3>
        </CellTitle>
        <CellLabel label={`Importe a Pagar`} index={1}>
          <NumberFormat value={importePagar} sufix={monedaPagar} />
        </CellLabel>
        <CellLabel label="Tasa de Interés Anual" index={2}>
          <NumberFormat value={tasaInteresAnual} sufix="%" />
        </CellLabel>

        <CellLabel label="Tasa de Interés Mensual" index={3}>
          <NumberFormat value={tasaInteresMensual} sufix="%" />
        </CellLabel>

        <CellLabel label="Número de Cuotas" index={4}>
          <NumberFormat value={numeroCuotas} sufix="" decimal={0} />
        </CellLabel>

        <CellLabel label="Cuota Mensual" index={5}>
          <NumberFormat value={cuotaMensual} sufix={monedaPagar} />
        </CellLabel>
      </FormLayout>
    </div>
  );
};
