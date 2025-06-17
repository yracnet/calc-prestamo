import { useEffect, useState } from "react";
import { useLoan } from "../context";
import { NumberFormat } from "../numberFormat";
import { addMonths, getDaysInMonth, parseISO } from "date-fns";
import { TableLayout } from "../layout";

interface HistorialPagoProps {
  title?: string;
}

export const HistorialPago: React.FC<HistorialPagoProps> = ({
  title = "HISTORIAL DE PAGO",
}) => {
  const {
    cuotas,
    monedaPagar,
    numeroCuotas,
    fechaInicioPrestamo,
    importePagar,
    cuotaMensual,
    tasaInteresMensual,
  } = useLoan();
  const [pagos, setPagos] = useState<any>([]);

  useEffect(() => {
    if (numeroCuotas === 0) {
      return;
    }
    const nuevoPagos = [cuotas[0]];

    // for (let index = 1; index <= numeroCuotas; index++) {
    //   const prev = nuevoPagos[index - 1];
    //   const montoCuotaInteres = prev.montoSaldoCapital * tasaInteres;
    //   const montoCuotaCapital = cuotaMensual - cuotaInteres;
    //   nuevoPagos[index] = {
    //     id: index + 1,
    //     nro: index,
    //     montoCuota: cuotaMensual,
    //     montoCuotaInteres,
    //     montoCuotaCapital,
    //     montoSaldoCapital: prev.montoSaldoCapital - montoCuotaCapital,
    //     fechaPago: addMonths(date, index).toISOString().split("T")[0],
    //   };
    // }
    // const nuevoPagos = cuotas.map((it) => {
    //   const {
    //     id,
    //     nro,
    //     fechaPago,
    //     montoCuota,
    //     montoCuotaCapital,
    //     montoCuotaInteres,
    //   } = it;
    //   const fecha = parseISO(fechaPago);
    //   const diasDelMes = getDaysInMonth(fecha);
    //   return {
    //     id,
    //     nro,
    //     fechaPago,
    //     montoCuota,
    //     diasDelMes,
    //     diasPago: diasDelMes,
    //     tasaInteresMensual,
    //     montoCuotaCapital,
    //     montoCuotaInteres,
    //   };
    // });
    setPagos(nuevoPagos);
  }, [numeroCuotas]);

  return (
    <TableLayout>
      <thead>
        <tr>
          <th rowSpan={2}>N°</th>
          <th colSpan={5}>{title}</th>
        </tr>
        <tr>
          <th>FECHA DE PAGO</th>
          <th>MONTO CUOTA</th>
          <th>MES RATE</th>
          <th>MES INTERES</th>
          <th>MONTO CUOTA</th>
          <th>CUOTA INTERÉS</th>
          <th>CUOTA CAPITAL</th>
          <th>SALDO PRESTAMO</th>
        </tr>
      </thead>
      <tbody>
        {pagos.map((row: any, ix: number) => {
          const prev = pagos[ix - 1];

          const interesReal =
            (row.tasaInteresMensual * row.diasPago) / row.diasDelMes;
          // if (prev) {
          //   row.montoCuotaInteres = interesReal * prev.montoSaldoCapital;
          // } else {
          //   row.montoCuotaInteres = 0;
          // }
          return (
            <tr key={row.id}>
              <td align="right">{row.nro}</td>
              <td align="right">{row.fechaPago}</td>
              <td align="right">
                <NumberFormat value={row.montoCuota} sufix={monedaPagar} />
              </td>
              <td align="right">
                {row.tasaInteresMensual?.toFixed(3)} * {row.diasPago}/
                {row.diasDelMes}
              </td>
              <td align="right">
                <NumberFormat value={interesReal} sufix="%" />
              </td>
              <td align="right">
                <NumberFormat
                  value={row.montoCuotaInteres}
                  sufix={monedaPagar}
                />
              </td>
              <td align="right">
                <NumberFormat
                  value={row.montoCuotaCapital}
                  sufix={monedaPagar}
                />
              </td>
              <td align="right">
                <NumberFormat
                  value={row.montoSaldoCapital}
                  sufix={monedaPagar}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableLayout>
  );
};
/**

    <table border={1} cellSpacing={0}>
      <thead>
        <tr>
          <th>N° CUOTA</th>
          <th>FECHA DE PAGO</th>
          <th>DÍAS</th>
          <th>PRORRATEO DÍAS</th>
          <th>INTERÉS REAL</th>
          <th>CUOTA</th>
          <th>CUOTA INTERÉS</th>
          <th>CUOTA CAPITAL</th>
          <th>MONTO PAGADO</th>
          <th>MONTO PAGADO ACUMULADO</th>
          <th>MONTO ADICIONAL</th>
          <th>SALDO PENDIENTE</th>
          <th>CUOTA INTERÉS ACUMULADO</th>
          <th>CUOTA CAPITAL ACUMULADO</th>
        </tr>
      </thead>
      <tbody>
        {cuotas.map((row) => (
          <tr key={row.id}>
            <td>{row.nro}</td>
            <td>{row.fechaPago}</td>
            <td>{row.dias}</td>
            <td>{row.diasProrrateo}</td>
            <td>{row.interesReal?.toFixed(2)}</td>
            <td>{row.cuota?.toFixed(2)}</td>
            <td>{row.cuotaInteres?.toFixed(2)}</td>
            <td>{row.cuotaCapital?.toFixed(2)}</td>
            <td>{row.montoPagado?.toFixed(2)}</td>
            <td>{row.montoPagadoAcumulado?.toFixed(2)}</td>
            <td>{row.montoAdicional?.toFixed(2)}</td>
            <td>{row.saldoPendiente?.toFixed(2)}</td>
            <td>{row.cuotaInteresAcumulado?.toFixed(2)}</td>
            <td>{row.cuotaCapitalAcumulado?.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
 * 
 */
