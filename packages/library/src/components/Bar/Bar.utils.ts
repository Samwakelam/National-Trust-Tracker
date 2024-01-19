import { blackText, whiteText } from "../../utils/colours.utils";

export const resolveColor = (
  colorScheme: string,
  colorMode: "light" | "dark" = "light"
): string => {
  const isLightMode = colorMode === "light";

  switch (colorScheme) {
    case "white":
      return blackText;
    case "black":
      return whiteText;
    default:
      return isLightMode ? blackText : whiteText;
  }
};

export const resolveBorderColor = (
  colorScheme: string,
  colorMode: "light" | "dark" = "light"
): string => {
  const isLightMode = colorMode === "light";

  switch (colorScheme) {
    case "gray":
      return isLightMode ? `${colorScheme}.300` : `${colorScheme}.400`;
    case "white":
      return isLightMode ? `${colorScheme}.900` : `${colorScheme}.400`;
    default:
      return isLightMode ? `${colorScheme}.200` : `${colorScheme}.400`;
  }
};

export const resolveBackgroundColor = (
  colorScheme: string,
  colorMode: "light" | "dark" = "light"
): string => {
  const isLightMode = colorMode === "light";

  switch (colorScheme) {
    case "white":
      return isLightMode ? `${colorScheme}.900` : `${colorScheme}.400`;
    default:
      return isLightMode ? `${colorScheme}.100` : `${colorScheme}.500`;
  }
};

export const resolveMenuBackgroundColor = (
  colorScheme: string,
  colorMode: "light" | "dark" = "light"
): string => {
  const isLightMode = colorMode === "light";

  switch (colorScheme) {
    case "gray":
      return isLightMode ? `${colorScheme}.300` : `${colorScheme}.400`;
    default:
      return isLightMode ? `${colorScheme}.200` : `${colorScheme}.400`;
  }
};
