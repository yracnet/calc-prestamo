import { atom, useAtom } from "jotai";
import type { LoanPayment } from "./model";

export const LoanPaymentState = atom<LoanPayment>({
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

export const useLoanPaymentState = () => useAtom(LoanPaymentState);
