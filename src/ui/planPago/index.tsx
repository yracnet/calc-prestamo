import { useLoan } from "../context";
import { TableLayout } from "../layout";
import { NumberFormat } from "../numberFormat";

export const PlanPago = () => {
  const { cuotas, monedaPagar } = useLoan();
  return (
    <TableLayout>
      <thead>
        <tr>
          <th rowSpan={2}>N°</th>
          <th colSpan={5}>PLAN DE PAGO</th>
        </tr>
        <tr>
          <th>FECHA DE PAGO</th>
          <th>MONTO CUOTA</th>
          <th>CUOTA INTERÉS</th>
          <th>CUOTA CAPITAL</th>
          <th>SALDO PRESTAMO</th>
        </tr>
      </thead>
      <tbody>
        {cuotas.map((row) => (
          <tr key={row.id}>
            <td align="right">{row.nro}</td>
            <td align="right">{row.fechaPago}</td>
            <td align="right">
              <NumberFormat value={row.montoCuota} sufix={monedaPagar} />
            </td>
            <td align="right">
              <NumberFormat value={row.montoCuotaInteres} sufix={monedaPagar} />
            </td>
            <td align="right">
              <NumberFormat value={row.montoCuotaCapital} sufix={monedaPagar} />
            </td>
            <td align="right">
              <NumberFormat value={row.montoSaldoCapital} sufix={monedaPagar} />
            </td>
          </tr>
        ))}
      </tbody>
    </TableLayout>
  );
};
