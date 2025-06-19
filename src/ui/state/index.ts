import { atom } from "recoil";

type CurrencyConfig = {
  currencyLoan: string;
  rateLoan: number;
  currencyPayment: string;
};

type InterestConfig = {
  annualRate: number;
  insuranceRate: number;
  referenceRate: number;
};

type PeriodConfig = {
  years: number;
  paymentsPerYear: number;
  paymentStartDate: string;
};

type LoanConfig = {
  currency: string;
  totalPayments: number;
  interestPerPayment: number;
  paymentStartDate: string;
};

export const currencyConfigState = atom<CurrencyConfig>({
  key: "currencyConfigState",
  default: {
    currencyLoan: "USD",
    rateLoan: 6.96,
    currencyPayment: "BOB",
  },
});

export const interestConfigState = atom<InterestConfig>({
  key: "interestConfigState",
  default: {
    annualRate: 5.5,
    insuranceRate: 0.02,
    referenceRate: 0.05,
  },
});

export const periodConfigState = atom<PeriodConfig>({
  key: "periodConfigState",
  default: {
    years: 20,
    paymentsPerYear: 12,
    paymentStartDate: "2025-06-13",
  },
});

export const loanConfigState = atom<LoanConfig>({
  key: "loanConfigState",
  default: {
    currency: "BOB",
    totalPayments: 240,
    interestPerPayment: 500,
    paymentStartDate: "2025-06-13",
  },
});
