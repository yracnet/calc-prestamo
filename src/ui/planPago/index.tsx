import { TableLayout } from "../layout";
import { NumberFormat } from "../numberFormat";
import { usePaymentItems } from "../state";

export const PlanPago = () => {
  const items = usePaymentItems();
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
        {items.map((row) => (
          <tr key={row.id}>
            <td align="right">{row.code}</td>
            <td align="right">{row.paymentDate}</td>
            <td align="right">
              <NumberFormat value={row.paymentAmount} sufix={row.currency} />
            </td>
            <td align="right">
              <NumberFormat value={row.paymentInterest} sufix={row.currency} />
            </td>
            <td align="right">
              <NumberFormat value={row.paymentPrincipal} sufix={row.currency} />
            </td>
            <td align="right">
              <NumberFormat
                value={row.remainingPrincipal}
                sufix={row.currency}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </TableLayout>
  );
};
