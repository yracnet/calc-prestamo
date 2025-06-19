import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import { addMonths } from "date-fns";

interface Cuota {
  id: number;
  nro: string | number;
  montoCuota: number;
  montoCuotaInteres: number;
  montoCuotaCapital: number;
  montoSaldoCapital: number;
  fechaPago: string;
}

interface LoanContextType {
  monedaPrestamo: string;
  setMonedaPrestamo: Dispatch<SetStateAction<string>>;
  importePrestamo: number;
  setImportePrestamo: Dispatch<SetStateAction<number>>;
  tipoCambio: number;
  setTipoCambio: Dispatch<SetStateAction<number>>;
  tasaInteresAnual: number;
  setTasaInteresAnual: Dispatch<SetStateAction<number>>;
  periodoPrestamoAnual: number;
  setPeriodoPrestamoAnual: Dispatch<SetStateAction<number>>;
  fechaInicioPrestamo: string;
  setFechaInicioPrestamo: Dispatch<SetStateAction<string>>;
  monedaPagar: string;
  setMonedaPagar: Dispatch<SetStateAction<string>>;

  // Datos de salida
  importePagar: number;
  tasaInteresMensual: number;
  numeroCuotas: number;
  cuotaMensual: number;
  cuotas: Cuota[];

  // Eventos
  onCalulate: () => void;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

interface LoanProviderProps {
  children: ReactNode;
}

export const LoanProvider: FC<LoanProviderProps> = ({ children }) => {
  const [monedaPrestamo, setMonedaPrestamo] = useState<string>("USD");
  const [importePrestamo, setImportePrestamo] = useState<number>(50000.0);
  const [tipoCambio, setTipoCambio] = useState<number>(6.96);
  const [tasaInteresAnual, setTasaInteresAnual] = useState<number>(5.5);
  const [periodoPrestamoAnual, setPeriodoPrestamoAnual] = useState<number>(20);
  const [fechaInicioPrestamo, setFechaInicioPrestamo] =
    useState<string>("2025-06-13");
  const [monedaPagar, setMonedaPagar] = useState<string>("BOB");

  const [importePagar, setImportePagar] = useState<number>(0);
  const [tasaInteresMensual, setTasaInteresMensual] = useState<number>(0);
  const [numeroCuotas, setNumeroCuotas] = useState<number>(0);
  const [cuotaMensual, setCuotaMensual] = useState<number>(0);
  const [cuotas, setCuotas] = useState<Cuota[]>([]);

  useEffect(() => {
    setImportePagar(0);
    setTasaInteresMensual(0);
    setNumeroCuotas(0);
    setCuotaMensual(0);
    setCuotas([]);
  }, [
    monedaPagar,
    monedaPrestamo,
    importePrestamo,
    tipoCambio,
    tasaInteresAnual,
    periodoPrestamoAnual,
    fechaInicioPrestamo,
  ]);

  const onCalulate = () => {
    const nuevoImportePrestamo = parseFloat(importePrestamo.toString());
    const nuevoTipoCambio = parseFloat(tipoCambio.toString());
    const nuevaTasaInteresAnual = parseFloat(tasaInteresAnual.toString());
    const nuevoImportePagar = nuevoImportePrestamo * nuevoTipoCambio;
    const nuevaTasaInteresMensual = nuevaTasaInteresAnual / 12;
    const nuevoNumeroCuotas = periodoPrestamoAnual * 12;
    const nuevaTasaInteres = nuevaTasaInteresMensual / 100;
    const nuevaCuotaMensual =
      (nuevoImportePagar * nuevaTasaInteres) /
      (1 - Math.pow(1 + nuevaTasaInteres, -nuevoNumeroCuotas));

    setImportePrestamo(nuevoImportePrestamo);
    setTipoCambio(nuevoTipoCambio);
    setTasaInteresAnual(nuevaTasaInteresAnual);
    setImportePagar(nuevoImportePagar);
    setTasaInteresMensual(nuevaTasaInteresMensual);
    setNumeroCuotas(nuevoNumeroCuotas);
    setCuotaMensual(nuevaCuotaMensual);

    const date = new Date(fechaInicioPrestamo);

    const nuevaCuotas: Cuota[] = [
      {
        id: 1,
        nro: "-",
        montoCuota: 0,
        montoCuotaInteres: 0,
        montoCuotaCapital: 0,
        montoSaldoCapital: nuevoImportePagar,
        fechaPago: fechaInicioPrestamo,
      },
    ];
    for (let index = 1; index <= nuevoNumeroCuotas; index++) {
      const prev = nuevaCuotas[index - 1];
      const montoCuotaInteres = prev.montoSaldoCapital * nuevaTasaInteres;
      const montoCuotaCapital = nuevaCuotaMensual - montoCuotaInteres;
      nuevaCuotas[index] = {
        id: index + 1,
        nro: index,
        montoCuota: nuevaCuotaMensual,
        montoCuotaInteres,
        montoCuotaCapital,
        montoSaldoCapital: prev.montoSaldoCapital - montoCuotaCapital,
        fechaPago: addMonths(date, index).toISOString().split("T")[0],
      };
    }
    setCuotas(nuevaCuotas);
  };

  return (
    <LoanContext.Provider
      value={{
        // Datos de entrada
        monedaPrestamo,
        setMonedaPrestamo,
        importePrestamo,
        setImportePrestamo,
        tipoCambio,
        setTipoCambio,
        tasaInteresAnual,
        setTasaInteresAnual,
        periodoPrestamoAnual,
        setPeriodoPrestamoAnual,
        fechaInicioPrestamo,
        setFechaInicioPrestamo,
        // Datos de salida
        monedaPagar,
        setMonedaPagar,
        importePagar,
        tasaInteresMensual,
        numeroCuotas,
        cuotaMensual,
        cuotas,
        onCalulate,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

export const useLoan = (): LoanContextType => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error("useLoan must be used within a LoanProvider");
  }
  return context;
};
