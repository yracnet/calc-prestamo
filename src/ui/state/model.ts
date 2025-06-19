import * as yup from "yup";

export type LoanPayment = {
  currency: string;
  startDate: string;
  totalPayments: number;
  monthsPerPayment: number;

  principalAmount: number;
  paymentAmount: number;

  interestAnnual: number;
  interestPerPeriod: number;
  interestTotal: number;
};

export const loanPaymentSchema = yup.object({
  currency: yup.string().required(),
  totalPayments: yup
    .number()
    .transform((_, originalValue) => Number(originalValue))
    .required()
    .integer()
    .min(1),
  interestPerPeriod: yup
    .number()
    .transform((_, originalValue) => parseFloat(originalValue))
    .required()
    .min(0),
  startDate: yup
    .date()
    .transform((_, originalValue) => new Date(originalValue))
    .required(),
});

export type LoanConfig = {
  currency: string;
  amount: number;
  paymentRate: number;
  paymentCurrency: string;
  annualRate: number;
  insuranceRate: number;
  referenceRate: number;
  years: number;
  paymentsPerYear: number;
  startDate: string;
};

export const loanConfigSchema = yup.object({
  currency: yup.string().required(),
  amount: yup
    .number()
    .transform((_, originalValue) => parseFloat(originalValue))
    .required()
    .min(0),
  paymentRate: yup
    .number()
    .transform((_, originalValue) => parseFloat(originalValue))
    .required()
    .min(0),
  paymentCurrency: yup.string().required(),

  annualRate: yup
    .number()
    .transform((_, originalValue) => parseFloat(originalValue))
    .required()
    .min(0),

  insuranceRate: yup
    .number()
    .transform((_, originalValue) => parseFloat(originalValue))
    .required()
    .min(0),

  referenceRate: yup
    .number()
    .transform((_, originalValue) => parseFloat(originalValue))
    .required()
    .min(0),

  years: yup
    .number()
    .transform((_, originalValue) => parseInt(originalValue))
    .required()
    .min(1)
    .integer(),

  paymentsPerYear: yup
    .number()
    .transform((_, originalValue) => parseInt(originalValue))
    .required()
    .min(1)
    .integer(),

  startDate: yup
    .date()
    .transform((_, originalValue) => new Date(originalValue))
    .required(),
});
