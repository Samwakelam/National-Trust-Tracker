import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

import {
  blackText,
  darkBackground,
  lightBackground,
  whiteText,
} from "../../utils/colours.utils";
import {
  scrollBarStyleLight,
  scrollBarStyleDark,
} from "../../utils/component.utils";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["field", "container"]);

const textarea = definePartsStyle(({ theme, ...props }) => {
  const { space, colors } = theme;

  return {
    container: {
      flex: 1,
      marginBottom: space[24],
      width: "100%",
    },
    field: {
      "--padding-left": "1rem",
      "--padding-right": "1rem",

      bg: "white.100",
      background: "white.100",
      paddingInlineStart: "unset",
      paddingInlineEnd: "unset",
      paddingLeft: "var(--padding-left)",
      paddingRight: "var(--padding-right)",
      paddingY: `${space[8]}`,
      border: `${space[1]} solid`,
      borderRadius: "var(--chakra-radii-md)",
      borderColor: "inherit",

      ...scrollBarStyleLight(theme),

      _disabled: {
        background: lightBackground,
        border: `${space[1]} solid ${colors.gray[300]}`,
        opacity: 0.4,
      },

      _dark: {
        color: blackText,
        bg: "white.900",
        background: "white.900",
        borderColor: "gray.400",

        ...scrollBarStyleDark(theme),

        _disabled: {
          background: darkBackground,
          color: whiteText,
        },
      },
    },
  };
});

export const Textarea = defineMultiStyleConfig({
  baseStyle: textarea,

  defaultProps: {
    colorScheme: "white",
  },
});
