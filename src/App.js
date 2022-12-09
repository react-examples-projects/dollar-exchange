import Div100vh from "react-div-100vh";
import useDollar from "./hooks/useDollar";
import {
  Container,
  Title,
  Button,
  TextInput,
  Loader,
  Text,
  Flex,
} from "@mantine/core";
import { FaMoneyBill, FaMoneyBillWave, FaCoins } from "react-icons/fa";
import { IoReload } from "react-icons/io5";

import { useState } from "react";

function App() {
  const { data, error, isLoading, isValidating, mutate } = useDollar();
  const [totalBs, setTotalBs] = useState(0);

  const onChange = (e) => {
    if (!e.target.value.trim()) return setTotalBs(0);
    const n = e.target.valueAsNumber * Number.parseFloat(data?.dollar);
    const bs = parseFloat(n).toFixed(2);
    setTotalBs(bs);
  };

  return (
    <Div100vh
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Container size={500} mx="auto" sx={{ width: "100%" }}>
        <Title
          mb={15}
          sx={{ textAlign: "center", fontWeight: "bolder", fontSize: "2.5rem" }}
          order={1}
        >
          Convertidor
        </Title>

        <Text sx={{ textTransform: "capitalize" }} c="dimmed" fz="small" mb={2}>
          {data?.date}
        </Text>
        <Text c="dimmed" fz="small" mb={15}>
          Datos obtenidos desde MonitorToday ({data?.url})
        </Text>

        <Flex align="center">
          <Button
            mt={14}
            mr={5}
            leftIcon={isValidating ? <Loader size={20} /> : <IoReload />}
            variant="light"
            onClick={mutate}
            disabled={isLoading || isValidating}
          >
            Actualizar
          </Button>
          <TextInput
            sx={{ width: "100%" }}
            aria-label="Valor actual dolar"
            label="Valor actual dolar ($)"
            rightSection={
              isLoading || isValidating ? <Loader size={20} /> : <FaMoneyBill />
            }
            disabled={isLoading || isValidating}
            placeholder={isLoading ? "Cargando..." : ""}
            defaultValue={isLoading ? "" : data?.dollar}
            mb={10}
          />
        </Flex>

        <TextInput
          aria-label="Cantidad para convertir"
          label="Cantidad para convertir"
          rightSection={<FaCoins />}
          placeholder="Escriba la cantidad de bolivares para convertir"
          type="number"
          disabled={isLoading || isValidating}
          onChange={isLoading ? null : onChange}
          mb={10}
        />

        <TextInput
          aria-label="Conversión bolívar"
          label="Conversión bolívar (Bs)"
          rightSection={<FaMoneyBillWave />}
          readOnly
          value={totalBs}
        />

        {/* <Button aria-label="Alternar Conversión" mt={20} fullWidth>
          Alternar Conversión
        </Button> */}
      </Container>
    </Div100vh>
  );
}

export default App;
