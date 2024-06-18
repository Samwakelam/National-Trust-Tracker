import {
  StyleFunctionProps,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/react";
import { switchAnatomy } from "@chakra-ui/anatomy";

import { lightBackground } from "../../utils/colours.utils";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers([...switchAnatomy.keys, "dialog"]);

const switchGroup = definePartsStyle(
  ({ theme, ...props }: StyleFunctionProps) => {
    const { space } = theme;

    return {
      dialog: {
        "& > div": {
          display: "flex",
          gap: space[16],
          alignItems: "flex-start",
        },
      },
      container: {},
      thumb: {
        background: "white.100",

        _dark: {
          background: "gray.700",
        },
      },
      track: {
        background: "var(--track-color-off)",
        padding: space[2],

        _checked: {
          backgroundColor: "var(--track-color-on)",
        },
      },
    };
  }
);

const solid = definePartsStyle(({ theme, colorScheme, ...props }) => {
  const { space } = theme;

  return {
    dialog: {
      "& > div": {
        display: "flex",
        gap: space[16],
        alignItems: "flex-start",
      },
    },
    container: {},
    thumb: {
      border: `${space[1]} solid`,
      borderColor: `${colorScheme}.300`,
      backgroundColor: lightBackground,

      _dark: {
        border: "unset",
      },
    },
    track: {
      border: `${space[1]} solid`,
      borderColor: `${colorScheme}.300`,

      _checked: {
        _disabled: {},
      },

      _disabled: {},

      _dark: { border: "unset" },
    },
  };
});

const depth = definePartsStyle(({ theme, ...props }) => {
  const { space, colors } = theme;

  return {
    dialog: {
      "& > div": {
        display: "flex",
        gap: space[16],
        alignItems: "flex-start",
      },
    },
    container: {},
    thumb: {
      boxShadow: `${space[1]} ${space[1]} ${space[4]} ${colors.blackAlpha[500]}`,

      _dark: {
        boxShadow: `inset ${space[1]} ${space[1]} ${space[1]} ${colors.whiteAlpha[400]}, inset -${space[1]} -${space[1]} ${space[1]} ${colors.blackAlpha[700]}`,
      },
    },
    track: {
      boxShadow: `inset ${space[2]} ${space[1]} ${space[6]} ${colors.blackAlpha[500]}, inset 0 ${space[2]} ${space[4]} ${colors.whiteAlpha[500]}`,

      _checked: {
        _disabled: {
          boxShadow: "unset",
        },
      },

      _disabled: {
        boxShadow: "unset",
      },

      _dark: {
        boxShadow: `inset ${space[2]} ${space[1]} ${space[4]} ${colors.blackAlpha[600]}, inset 0 ${space[2]} ${space[4]} ${colors.whiteAlpha[400]}`,
      },
    },
  };
});

export const Switch = defineMultiStyleConfig({
  baseStyle: switchGroup,
  variants: {
    depth,
    solid,
  },
  defaultProps: {
    variant: "solid",
    colorScheme: "gray",
  },
});
