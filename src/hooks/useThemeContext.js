import { useContext } from "react";
import ThemeContext from "../context/themeContext";

export default function useThemeContext() {
  const theme = useContext(ThemeContext);
  return theme;
}