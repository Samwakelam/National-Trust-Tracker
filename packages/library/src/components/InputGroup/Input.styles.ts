import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";

import {
  blackText,
  darkBackground,
  lightBackground,
  whiteText,
} from "../../utils/colours.utils";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers([...inputAnatomy.keys, "container"]);

const input = definePartsStyle(({ theme, ...props }) => {
  const { space, colors } = theme;

  return {
    container: {
      flex: 1,
      marginBottom: space[24],
      width: "100%",
    },
    addon: {},
    field: {
      "--padding-left": "1rem",
      "--padding-right": "1rem",

      bg: "white.100",
      background: "white.100",
      paddingInlineStart: "unset",
      paddingInlineEnd: "unset",
      paddingLeft: "var(--padding-left)",
      paddingRight: "var(--padding-right)",
      border: "none",

      _disabled: {
        background: lightBackground,
        border: `${space[1]} solid ${colors.gray[300]}`,
      },

      _placeholder: {
        color: "gray.500",
      },

      _dark: {
        color: blackText,
        bg: "white.900",
        background: "white.900",
        borderColor: "gray.400",

        _disabled: {
          background: darkBackground,
          color: whiteText,
        },
      },
    },
    element: {
      width: "fit-content",

      "& > *": {
        height: "80%",
      },
    },
  };
});

const depressed = definePartsStyle(({ theme, ...props }) => {
  const { space, colors } = theme;

  return {
    field: {
      boxShadow: `inset ${space[4]} ${space[4]} ${space[4]} ${colors.blackAlpha[200]}, inset -${space[4]} -${space[4]} ${space[4]} ${colors.white[50]}`,
      border: "none",
      background: "white.100",

      _disabled: {
        background: lightBackground,
        boxShadow: "unset",
        border: `${space[1]} solid ${colors.gray[300]}`,
      },

      _dark: {
        color: whiteText,
        bg: "white.900",
        background: "whiteAlpha.200",
        borderColor: "gray.400",
        boxShadow: `inset ${space[4]} ${space[4]} ${space[4]} ${colors.blackAlpha[400]}, inset -${space[4]} -${space[4]} ${space[4]} ${colors.whiteAlpha[300]}`,

        _disabled: {
          background: darkBackground,
          color: whiteText,
          boxShadow: "unset",
        },
      },

      _focusVisible: {
        boxShadow: `0 0 0 ${space[2]} ${colors.blue[200]}`,
      },

      "&[aria-invalid=true]": {
        boxShadow: `0 0 0 ${space[2]} ${colors.red[200]}`,
      },
    },
  };
});

const elevated = definePartsStyle(({ theme, colorScheme, ...props }) => {
  const { space, colors } = theme;

  return {
    field: {
      backgroundColor: `${colorScheme}.200`,
      border: "none",

      marginTop: space[4],
      boxShadow: `${space[4]} ${space[4]} ${space[6]} ${colors.blackAlpha[200]} , -${space[4]} -${space[4]} ${space[4]}  ${colors.white[50]}`,

      _disabled: {
        background: lightBackground,
        boxShadow: "unset",
        border: `${space[1]} solid ${colors.gray[300]}`,
      },

      _focusVisible: {
        boxShadow: `0 0 0 ${space[2]} ${colors.blue[200]}`,
      },

      "&[aria-invalid=true]": {
        boxShadow: `0 0 0 ${space[2]} ${colors.red[200]}`,
      },
    },
  };
});

export const Input = defineMultiStyleConfig({
  baseStyle: input,
  variants: {
    depressed,
    elevated,
  },
  defaultProps: {
    colorScheme: "white",
  },
});
