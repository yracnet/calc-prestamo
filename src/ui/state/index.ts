import { addMonths, parseISO } from "date-fns";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import type { LoanPayment, PaymentItem } from "./model";

const LoanPaymentState = atom<LoanPayment>({
  currency: "BOB",
  interestAnnual: 0.073,
  interestPerPeriod: 0.006083333333333333,
  interestTotal: 225584.2180428775,
  startDate: new Date(),
  principalAmount: 348000,
  totalPayments: 180,
  paymentAmount: 3186.578989127097,
  monthsPerPayment: 1,
});

const PaymentItemsState = atom<PaymentItem[]>([]);

export const useLoanPaymentState = (): [
  LoanPayment,
  (data: LoanPayment) => void
] => {
  const [value, setValue] = useAtom(LoanPaymentState);
  const setItems = useSetAtom(PaymentItemsState);
  const setProxy = (newValue: LoanPayment) => {
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
    } = newValue;

    const paymentItems: PaymentItem[] = [
      {
        id: 1,
        code: "-",
        currency,
        paymentAmount: 0,
        paymentInterest: 0,
        paymentPrincipal: 0,
        remainingPrincipal: principalAmount,
        paymentDate: startDate?.toISOString().split("T")[0],
      },
    ];
    for (let index = 1; index <= totalPayments; index++) {
      const prev = paymentItems[index - 1];
      const prevDate = parseISO(prev.paymentDate);
      const date = addMonths(prevDate, monthsPerPayment);
      const paymentDate = date.toISOString().split("T")[0];
      const paymentInterest = prev.remainingPrincipal * interestPerPeriod;
      const paymentPrincipal = paymentAmount - paymentInterest;
      const remainingPrincipal = prev.remainingPrincipal - paymentPrincipal;
      paymentItems[index] = {
        id: index + 1,
        code: `${index}`,
        currency,
        paymentAmount,
        paymentInterest,
        paymentPrincipal,
        remainingPrincipal,
        paymentDate,
      };
    }
    setValue({
      currency,
      interestAnnual,
      interestPerPeriod,
      interestTotal,
      startDate,
      principalAmount,
      totalPayments,
      paymentAmount,
      monthsPerPayment,
    });
    setItems(paymentItems);
  };
  return [value, setProxy];
};

export const usePaymentItems = () => useAtomValue(PaymentItemsState);
