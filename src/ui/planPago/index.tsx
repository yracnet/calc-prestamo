import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { TableLayout } from "../layout";
import { NumberFormat } from "../numberFormat";
import { useLoanPaymentState } from "../state";

export const PlanPago = () => {
  const [loanPayment] = useLoanPaymentState();
  const {
    currency,
    totalPayments,
    interestPerPayment,
    paymentStartDate,
    paymentTotalAmount,
    scheduledPayment,
    scheduledTime,
  } = loanPayment;
  const [cuotas, setCuotas] = useState<any[]>([]);

  const onReload = () => {
    let date = new Date(paymentStartDate);
    const nuevaCuotas: any[] = [
      {
        id: 1,
        nro: "-",
        montoCuota: 0,
        montoCuotaInteres: 0,
        montoCuotaCapital: 0,
        paymentTotalAmount,
        paymentDate: date.toISOString().split("T")[0],
      },
    ];
    try {
      for (let index = 1; index <= totalPayments; index++) {
        date = addDays(date, scheduledTime);
        const paymentDate = date.toISOString().split("T")[0];
        const prev = nuevaCuotas[index - 1];
        const montoCuotaInteres = prev.paymentTotalAmount * interestPerPayment;
        const montoCuotaCapital = scheduledPayment - montoCuotaInteres;
        nuevaCuotas[index] = {
          id: index + 1,
          nro: index,
          montoCuota: scheduledPayment,
          montoCuotaInteres,
          montoCuotaCapital,
          paymentTotalAmount: prev.paymentTotalAmount - montoCuotaCapital,
          paymentDate,
        };
      }
      console.log(nuevaCuotas);
    } catch (error) {
      console.log(error);
    }
    setCuotas(nuevaCuotas);
  };
  useEffect(() => {
    onReload();
  }, [loanPayment]);

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
            <td align="right">{row.paymentDate}</td>
            <td align="right">
              <NumberFormat value={row.montoCuota} sufix={currency} />
            </td>
            <td align="right">
              <NumberFormat value={row.montoCuotaInteres} sufix={currency} />
            </td>
            <td align="right">
              <NumberFormat value={row.montoCuotaCapital} sufix={currency} />
            </td>
            <td align="right">
              <NumberFormat value={row.paymentTotalAmount} sufix={currency} />
            </td>
          </tr>
        ))}
      </tbody>
    </TableLayout>
  );
};
