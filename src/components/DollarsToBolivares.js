import { TextInput } from "@mantine/core";
import { FaMoneyBillWave, FaCoins } from "react-icons/fa";

export default function DollarsToBolivares({
  isLoading,
  onDollarsToBolivares,
  isValidating,
  totalBs,
}) {
  return (
    <>
      <TextInput
        size="md"
        aria-label="Cantidad de dólares para convertir"
        label="Cantidad de dólares para convertir"
        rightSection={<FaCoins />}
        placeholder="Escriba la cantidad de dólares para convertir"
        type="number"
        disabled={isLoading || isValidating}
        onChange={isLoading ? null : onDollarsToBolivares}
        mb={10}
        defaultValue={0}
      />

      <TextInput
        size="md"
        aria-label="Conversión al bolívar"
        label="Conversión al bolívar (Bs)"
        rightSection={<FaMoneyBillWave />}
        readOnly
        value={totalBs}
        disabled={isLoading || isValidating}
      />
    </>
  );
}
