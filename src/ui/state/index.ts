import { atom, useAtom } from "jotai";
import type { LoanPayment } from "./model";

export const LoanPaymentState = atom<LoanPayment>({
  currency: "BOB",
  totalPayments: 240,
  interestRate: 5,
  interestPerPayment: 0.5,
  interestTotalAmount: 0,
  paymentStartDate: "2025-06-13",
  paymentTotalAmount: 100,
  scheduledPayment: 0,
  scheduledTime: 1,
});

export const useLoanPaymentState = () => useAtom(LoanPaymentState);
