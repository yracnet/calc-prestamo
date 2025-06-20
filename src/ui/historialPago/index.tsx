import { addMonths, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { TableLayout } from "../layout";
import { NumberFormat } from "../numberFormat";
import { roundUpAmount, useLoanPaymentValue, usePaymentItems } from "../state";
import type { PaymentItem } from "../state/model";

type Item = PaymentItem & {
  paid: boolean;
  paymentDateReal: string;
  paymentAmountReal: number;
  paymentAditional: number;
};

export const HistorialPago = () => {
  const paymentItems = usePaymentItems();
  const {
    currency,
    interestAnnual,
    interestPerPeriod,
    interestTotal,
    startDate,
    principalAmount,
    totalPayments,
    paymentAmount,
    monthsPerPayment,
  } = useLoanPaymentValue();
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const newItems = paymentItems.map((it: PaymentItem, ix) => {
      const paymentAmountReal = roundUpAmount(it.paymentAmount, 1);
      return {
        paid: ix === 0,
        paymentDateReal: it.paymentDate,
        paymentAmountReal,
        paymentAditional: paymentAmountReal - it.paymentAmount,
        ...it,
      };
    });
    setItems(newItems);
  }, [paymentItems]);

  const onChangeRow = (ix: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.target;
    const newItems = items.map((it) => ({ ...it }));
    //@ts-ignore
    newItems[ix][name] = value;
    if (type === "checkbox") {
      //@ts-ignore
      newItems[ix][name] = checked;
    }
    console.log(">>>", ix, type, name, value, checked, newItems[ix]);

    for (let index = ix; index < newItems.length; index++) {
      const prev = paymentItems[index - 1];
      const prevDate = parseISO(prev.paymentDate);
      const date = addMonths(prevDate, monthsPerPayment);
      const paymentDate = date.toISOString().split("T")[0];
      const interestPayment = interestPerPeriod;
      const paymentInterest = prev.remainingPrincipal * interestPayment;
      const paymentPrincipal = paymentAmount - paymentInterest;
      const remainingPrincipal = prev.remainingPrincipal - paymentPrincipal;
      //@ts-ignore
      newItems[index] = {
        id: index + 1,
        code: `${index}`,
        currency,
        interestPayment,
        paymentAmount,
        paymentInterest,
        paymentPrincipal,
        remainingPrincipal,
        paymentDate,
      };
    }

    setItems(newItems);
  };

  return (
    <TableLayout>
      <thead>
        <tr>
          <th rowSpan={2}>N°</th>
          <th colSpan={10}>HISTORIAL DE PAGO</th>
        </tr>
        <tr>
          <th>FECHA PAGO REAL</th>
          <th>FECHA INTERES</th>
          <th>MONTO CUOTA REAL</th>
          <th>MONTO CUOTA</th>
          <th>MONTO ADICIONAL</th>
          <th>CUOTA INTERÉS</th>
          <th>CUOTA CAPITAL</th>
          <th>SALDO PRESTAMO</th>
        </tr>
      </thead>
      <tbody>
        {items.map((row, ix) => (
          <tr key={row.id} className={row.paid ? "paid" : "unpaid"}>
            <td align="right">{row.code}</td>
            <td align="right">
              <input
                type="date"
                value={row.paymentDateReal}
                name="paymentDateReal"
                onChange={(e) => onChangeRow(ix, e)}
              />
            </td>
            <td align="right">
              <NumberFormat value={row.interestPayment * 100} sufix="%" />
            </td>
            <td align="right">
              <input
                type="number"
                value={row.paymentAmountReal}
                name="paymentAmountReal"
                onChange={(e) => onChangeRow(ix, e)}
              />
            </td>
            <td align="right">
              <NumberFormat value={row.paymentAmount} sufix={row.currency} />
            </td>
            <td align="right">
              <NumberFormat value={row.paymentAditional} sufix={row.currency} />
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
            <td align="right">
              <input
                type="checkbox"
                checked={row.paid}
                name="paid"
                onChange={(e) => onChangeRow(ix, e)}
              />
              {row.paid ? "true" : "false"}
            </td>
          </tr>
        ))}
      </tbody>
    </TableLayout>
  );
};
