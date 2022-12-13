import { BiErrorCircle } from "react-icons/bi";
import { Text, Box } from "@mantine/core";

export default function ErrorText({
  isVisible,
  text = "Ocurrió un error.",
  className,
  ...props
}) {
  return isVisible ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "0.5rem"
      }}
      {...props}
    >
      <BiErrorCircle style={{ fill: "#ff005c" }} />
      <Text
        className="my-0"
        style={{ color: "#ff005c", marginLeft: "5px" }}
        small
      >
        {text}
      </Text>
    </Box>
  ) : null;
}
