import {
  TextInput,
} from "@mantine/core";
import { FaMoneyBillWave, FaCoins } from "react-icons/fa";

export default function BolivaresToDollars({ isLoading, onBolivaresToDollars, isValidating, totalDollars }) {
  return (
    <>
      <TextInput
        size="md"
        aria-label="Cantidad para convertir"
        label="Cantidad para convertir (Bs)"
        rightSection={<FaCoins />}
        placeholder="Escriba la cantidad de bolivares para convertir"
        type="number"
        disabled={isLoading || isValidating}
        onChange={isLoading ? null : onBolivaresToDollars}
        mb={10}
      />

      <TextInput
        size="md"
        aria-label="Conversión dolares"
        label="Conversión dolares ($)"
        rightSection={<FaMoneyBillWave />}
        readOnly
        value={totalDollars}
        disabled={isLoading || isValidating}
      />
    </>
  );
}
