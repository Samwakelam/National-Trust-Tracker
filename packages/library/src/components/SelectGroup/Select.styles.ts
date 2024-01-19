import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import {
  blackText,
  darkBackground,
  lightBackground,
  whiteText,
} from "../../utils/colours.utils";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers([...selectAnatomy.keys, "group", "element"]);

const select = definePartsStyle(({ theme, ...props }) => {
  const { space, colors } = theme;

  return {
    group: {
      position: "relative",
      "& input::-webkit-calendar-picker-indicator": {
        opacity: 0,
      },
    },
    field: {
      bg: "white.100",
      background: "white.100",
      paddingInlineStart: "unset",
      paddingInlineEnd: "unset",
      padding: `0 ${space[12]}`,

      'option[value=""]': {
        color: "gray.500",
      },

      option: {
        backgroundColor: lightBackground,
      },

      _disabled: {
        background: lightBackground,
        border: `${space[1]} solid ${colors.gray[300]}`,
      },

      _dark: {
        color: blackText,
        bg: "white.900",
        background: "white.900",
        borderColor: "gray.400",

        option: {
          backgroundColor: "white.900",
        },

        _disabled: {
          background: darkBackground,
          color: whiteText,
        },
      },
    },
    icon: {
      width: space[32],
      transform: `translateX(-${space[8]})`,

      _dark: {
        color: blackText,
      },
    },
    element: {
      transform: `translateY(${space[4]})`,
      position: "absolute",
      right: space[6],
    },
  };
});

export const Select = defineMultiStyleConfig({
  baseStyle: select,
});
