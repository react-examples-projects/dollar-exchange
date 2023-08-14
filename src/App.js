import Div100vh from "react-div-100vh";
import useDollar from "./hooks/useDollar";
import useThemeContext from "./hooks/useThemeContext";
import {
  Container,
  Title,
  Button,
  ActionIcon,
  TextInput,
  Skeleton,
  Loader,
  Text,
  Flex,
  Box,
  Badge,
  CopyButton,
} from "@mantine/core";
import { FaMoneyBill } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { IoReload } from "react-icons/io5";
import { FiMoon, FiSun } from "react-icons/fi";
import { TbArrowsLeftRight } from "react-icons/tb";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState, useRef } from "react";
import { bolivaresToDollar, dollarsToBs } from "./helpers/utils";
import DollarsToBolivares from "./components/DollarsToBolivares";
import BolivaresToDollars from "./components/BolivaresToDollars";
import ErrorText from "./components/ErrorText";
import toast from "react-hot-toast";
import animeGif from "./assets/anime.gif";

function App() {
  const matches = useMediaQuery("(max-width: 470px)");
  const isCopied = useRef(false);
  const [toggleExchange, setToggleExchange] = useState(true);
  const { currentTheme, toggle } = useThemeContext();
  const { data, error, isLoading, isValidating, mutate } = useDollar();
  const [bs, setBs] = useState(0);
  const [dollars, setDollars] = useState(0);
  const [totalBs, setTotalBs] = useState(0);
  const [totalDollars, setTotalDollars] = useState(0);
  const [dollar, setDollar] = useState(null);
  const [showCopyButton, setShowCopyButton] = useState(false);

  useEffect(() => {
    if (data?.dollar) setDollar(data?.dollar);
  }, [data?.dollar]);

  const onDollarsToBolivares = (e) => {
    if (!e.target.value.trim()) return setTotalBs(0);
    setBs(e.target.valueAsNumber);
    setTotalBs(dollarsToBs(e.target.valueAsNumber, dollar));
  };

  const onBolivaresToDollars = (e) => {
    if (!e.target.value.trim()) return setTotalBs(0);
    setDollars(e.target.valueAsNumber);
    setTotalDollars(bolivaresToDollar(e.target.valueAsNumber, dollar));
  };

  const onChangeDollarValue = (e) => {
    setDollar(e.target.valueAsNumber);
    if (toggleExchange) {
      const bolivares = dollarsToBs(bs, e.target.valueAsNumber);
      setTotalBs(bolivares);
    } else {
      const _dollars = bolivaresToDollar(e.target.valueAsNumber, dollars);
      setTotalDollars(_dollars);
    }
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
          sx={{ textAlign: "center", fontWeight: "bolder", fontSize: "2rem" }}
          order={1}
        >
          Convertidor
        </Title>

        {isLoading || isValidating ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            mb={15}
          >
            <Skeleton
              height={18}
              mt={6}
              width={matches ? "calc(100% - 11rem)" : "270px"}
              radius="xl"
            />
            <Skeleton
              height={18}
              mt={6}
              width={matches ? "calc(100% - 6rem)" : "375px"}
              radius="xl"
            />
            {matches && (
              <Skeleton
                height={18}
                mt={6}
                width={matches ? "calc(100% - 10rem)" : "375px"}
                radius="xl"
              />
            )}
          </Box>
        ) : (
          <>
            <Text
              sx={{ textTransform: "capitalize", textAlign: "center" }}
              c="dimmed"
              mb={3}
              fw={700}
            >
              {data?.date}
            </Text>
            <Text c="dimmed" mb={15} sx={{ textAlign: "center" }}>
              Datos obtenidos desde BCV ({data?.url})
            </Text>
          </>
        )}

        <Box
          sx={{ width: "100%", position: "relative" }}
          mt={40}
          mb={matches ? 50 : 20}
          onMouseEnter={() => setShowCopyButton(true)}
          onMouseLeave={() => setShowCopyButton(false)}
        >
          {!isLoading && !isValidating && (
            <Box
              style={{
                display: showCopyButton ? "block" : "none",
                position: "absolute",
                top: "85%",
                transform: "translateY(-85%)",
                right: 38,
                zIndex: 5,
              }}
            >
              <CopyButton value={dollar}>
                {({ copied, copy }) => {
                  if (copied && !isCopied.current) {
                    isCopied.current = true;
                    toast.custom(
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          backgroundColor: "#25262b",
                          padding: "0.8rem 1.2rem",
                          borderRadius: "5px",
                          border: "1px solid #373A40",
                        }}
                      >
                        <img
                          src={animeGif}
                          alt="anime gif"
                          width={40}
                          height={40}
                        />
                        <Text mt={3}>Se ha copiado el valor de la divisa</Text>
                      </Box>
                    );
                  } else {
                    if (isCopied.current) {
                      isCopied.current = false;
                    }
                  }

                  return (
                    <Button
                      color={copied ? "teal" : "blue"}
                      onClick={copy}
                      size="xs"
                      radius="md"
                      variant="light"
                    >
                      {copied ? "Valor copiado" : "Copiar valor"}
                    </Button>
                  );
                }}
              </CopyButton>
            </Box>
          )}

          <Flex
            align="center"
            mt={5}
            justify="flex-end"
            style={{
              position: "absolute",
              top: matches ? 72 : -10,
              right: 0,
              zIndex: 5,
            }}
          >
            <Badge
              className="btn-pill"
              color="gray"
              radius="xs"
              variant="filled"
              mr={6}
              size="lg"
              onClick={isLoading || isValidating ? null : mutate}
              style={{
                cursor: "pointer",
                opacity: isLoading || isValidating ? 0.4 : 1,
              }}
            >
              <Text
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  fontWeight: "normal",
                  textTransform: "capitalize",
                }}
              >
                <BiRefresh style={{ fontSize: "15px" }} />
                Actualizar
              </Text>
            </Badge>

            <Badge
              className="btn-pill"
              color="gray"
              radius="xs"
              variant="filled"
              size="lg"
              style={{
                cursor: "pointer",
                opacity: isLoading || isValidating ? 0.4 : 1,
              }}
              onClick={
                isLoading || isValidating ? null : () => setDollar(data?.dollar)
              }
            >
              <Text
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  fontWeight: "normal",
                  textTransform: "capitalize",
                }}
              >
                <IoReload />
                Reiniciar valor
              </Text>
            </Badge>
          </Flex>

          <TextInput
            size="md"
            sx={{
              width: "100%",
              borderColor: "#9b9b9b !important",
            }}
            type="number"
            aria-label="Valor actual del dólar"
            label="Valor actual del dólar"
            rightSection={
              isLoading || isValidating ? <Loader size={20} /> : <FaMoneyBill />
            }
            placeholder={isLoading ? "Cargando..." : ""}
            value={isLoading ? "Cargando..." : dollar || 0}
            onChange={onChangeDollarValue}
            readOnly={isLoading || isValidating}
            mb={10}
          />
        </Box>

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
          mt={12}
          rightIcon={<TbArrowsLeftRight />}
          onClick={() => setToggleExchange((f) => !f)}
          disabled={isLoading || isValidating}
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          fullWidth
        >
          Alternar Conversión
        </Button>
      </Container>
    </Div100vh>
  );
}

export default App;
