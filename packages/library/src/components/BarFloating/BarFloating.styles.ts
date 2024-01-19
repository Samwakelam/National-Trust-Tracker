import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

import {
  scrollBarStyleLight,
  scrollBarStyleDark,
} from "../../utils/component.utils";
import { mediaQueries } from "../../theme/devices.config";
import {
  resolveBackgroundColor,
  resolveBorderColor,
  resolveColor,
} from "../Bar/Bar.utils";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["container", "content", "menuButton"]);

const barFloating = definePartsStyle(({ theme, colorScheme, ...props }) => {
  const { space } = theme;

  return {
    container: {
      "--bar-right": "unset",
      "--bar-left": "unset",

      width: "auto",
      display: "flex",
      flexDirection: "row",
      padding: space[2],

      position: "absolute",
      bottom: space[32],
      right: "var(--bar-right)",
      left: "var(--bar-left)",

      borderStyle: "solid",
      borderWidth: space[2],
      borderRadius: space[48],
      borderColor: resolveBorderColor(colorScheme, "light"),

      backgroundColor: resolveBackgroundColor(colorScheme, "light"),

      "& h1, h2, h3, h4, h5, p": {
        color: resolveColor(colorScheme, "light"),
      },

      _dark: {
        borderColor: resolveBorderColor(colorScheme, "dark"),
        backgroundColor: resolveBackgroundColor(colorScheme, "dark"),

        "& h1, h2, h3, h4, h5, p": {
          color: resolveColor(colorScheme, "dark"),
        },
      },

      [mediaQueries.sm]: {
        flexDirection: "row",
      },
    },
    content: {
      width: "100%",
      padding: `0 ${space[32]}`,
      flexDirection: "row",
      alignItems: "center",
      overflowX: "auto",
      flexWrap: "nowrap",

      ...scrollBarStyleLight(theme),
      _dark: {
        ...scrollBarStyleDark(theme),
      },
    },
  };
});

export const BarFloating = defineMultiStyleConfig({
  baseStyle: barFloating,
  defaultProps: {
    colorScheme: "gray",
  },
});
