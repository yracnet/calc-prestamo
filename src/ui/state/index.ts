import { atom, useAtom } from "jotai";
import type { LoanPayment } from "./model";

export const LoanPaymentState = atom<LoanPayment>({
  currency: "BOB",
  totalPayments: 240,
  interestAnnual: 5,
  interestPerPeriod: 0.5,
  interestTotal: 0,
  startDate: "2025-06-13",
  principalAmount: 100,
  paymentAmount: 0,
  monthsPerPayment: 1,
});

export const useLoanPaymentState = () => useAtom(LoanPaymentState);
