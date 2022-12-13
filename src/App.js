import Div100vh from "react-div-100vh";
import useDollar from "./hooks/useDollar";
import useThemeContext from "./hooks/useThemeContext";
import {
  Container,
  Title,
  Button,
  ActionIcon,
  TextInput,
  Loader,
  Text,
  Flex,
} from "@mantine/core";
import { FaMoneyBill } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { FiMoon, FiSun } from "react-icons/fi";
import { TbArrowsLeftRight } from "react-icons/tb";
import { useState } from "react";
import DollarsToBolivares from "./components/DollarsToBolivares";
import BolivaresToDollars from "./components/BolivaresToDollars";
import ErrorText from "./components/ErrorText";

function App() {
  const [toggleExchange, setToggleExchange] = useState(true);
  const { currentTheme, toggle } = useThemeContext();
  const { data, error, isLoading, isValidating, mutate } = useDollar();
  const [totalBs, setTotalBs] = useState(0);
  const [totalDollars, setTotalDollars] = useState(0);

  const onDollarsToBolivares = (e) => {
    if (!e.target.value.trim()) return setTotalBs(0);

    const n = e.target.valueAsNumber * Number.parseFloat(data?.dollar);
    const bs = parseFloat(n).toFixed(2);
    setTotalBs(bs);
  };

  const onBolivaresToDollars = (e) => {
    if (!e.target.value.trim()) return setTotalBs(0);

    const n = e.target.valueAsNumber / Number.parseFloat(data?.dollar);
    const dollars = parseFloat(n).toFixed(2);
    setTotalDollars(dollars);
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
      <ActionIcon
        onClick={toggle}
        variant="default"
        sx={{
          position: "absolute",
          top: "12px",
          right: "12px",
        }}
      >
        {currentTheme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
      </ActionIcon>
      <Container size={500} mx="auto" sx={{ width: "100%" }}>
        <Title
          mb={15}
          sx={{ textAlign: "center", fontWeight: "bolder", fontSize: "2.5rem" }}
          order={1}
        >
          Convertidor
        </Title>

        <Text
          sx={{ textTransform: "capitalize", textAlign: "center" }}
          c="dimmed"
          mb={3}
          fw={700}
        >
          {data?.date}
        </Text>
        <Text c="dimmed" mb={15} sx={{ textAlign: "center" }}>
          Datos obtenidos desde MonitorToday ({data?.url})
        </Text>

        <Flex align="center">
          <Button
            size="md"
            mt={15}
            mr={5}
            leftIcon={isValidating ? <Loader size={20} /> : <IoReload />}
            variant={currentTheme === "dark" ? "light" : "filled"}
            onClick={mutate}
            disabled={isLoading || isValidating}
          >
            Actualizar
          </Button>

          <TextInput
            size="md"
            sx={{
              width: "100%",
              borderColor: "#9b9b9b !important",
            }}
            aria-label="Valor actual dolar"
            label="Valor actual dolar ($)"
            rightSection={
              isLoading || isValidating ? <Loader size={20} /> : <FaMoneyBill />
            }
            placeholder={isLoading ? "Cargando..." : ""}
            value={isLoading ? "" : data?.dollar}
            mb={10}
            readOnly
          />
        </Flex>

        <ErrorText isVisible={!!error} text={error?.message} />

        {toggleExchange ? (
          <DollarsToBolivares
            {...{ isLoading, onDollarsToBolivares, isValidating, totalBs }}
          />
        ) : (
          <BolivaresToDollars
            {...{ isLoading, onBolivaresToDollars, isValidating, totalDollars }}
          />
        )}

        <Button
          size="md"
          aria-label="Alternar Conversión"
          mt={20}
          rightIcon={<TbArrowsLeftRight />}
          onClick={() => setToggleExchange((f) => !f)}
          disabled={isLoading || isValidating}
          fullWidth
        >
          Alternar Conversión
        </Button>
      </Container>
    </Div100vh>
  );
}

export default App;
