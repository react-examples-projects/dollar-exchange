import {
  TextInput,
} from "@mantine/core";
import { FaMoneyBillWave, FaCoins } from "react-icons/fa";

export default function BolivaresToDollars({ isLoading, onBolivaresToDollars, isValidating, totalDollars }) {
  return (
    <>
      <TextInput
        size="md"
        aria-label="Cantidad de bolivares para convertir"
        label="Cantidad de bolivares para convertir"
        rightSection={<FaCoins />}
        placeholder="Escriba la cantidad de bolivares para convertir"
        type="number"
        disabled={isLoading || isValidating}
        onChange={isLoading ? null : onBolivaresToDollars}
        mb={10}
        defaultValue={0}
      />

      <TextInput
        size="md"
        aria-label="Conversión a dólares"
        label="Conversión a dólares"
        rightSection={<FaMoneyBillWave />}
        readOnly
        value={totalDollars}
        disabled={isLoading || isValidating}
      />
    </>
  );
}
