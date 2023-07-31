import {
  TextInput,
} from "@mantine/core";
import { FaMoneyBillWave, FaCoins } from "react-icons/fa";

export default function DollarsToBolivares({ isLoading, onDollarsToBolivares, isValidating, totalBs }) {
  return (
    <>
      <TextInput
        size="md"
        aria-label="Cantidad para convertir"
        label="Cantidad para convertir ($)"
        rightSection={<FaCoins />}
        placeholder="Escriba la cantidad de dólares para convertir"
        type="number"
        disabled={isLoading || isValidating}
        onChange={isLoading ? null : onDollarsToBolivares}
        mb={10}
      />

      <TextInput
        size="md"
        aria-label="Conversión bolívar"
        label="Conversión bolívar (Bs)"
        rightSection={<FaMoneyBillWave />}
        readOnly
        value={totalBs}
        disabled={isLoading || isValidating}
      />
    </>
  );
}
