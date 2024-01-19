import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { darkBackground, lightBackground } from "../../utils/colours.utils";

const multiSwitch = defineStyle(({ theme, colorScheme, ...props }) => {
  const { space, colors } = theme;

  const multiSwitch = {
    "& span.chakra-radio__label": {
      margin: 0,
      padding: `0.25rem 0.5rem`,
      border: "unset",
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    "& span.chakra-radio__control": {
      width: "100%",
      height: "100%",
      position: "absolute",
      borderRadius: 0,
      background: lightBackground,
      backgroundImage: `linear-gradient(-15deg, ${colors.white[700]} 0%, ${colors.white[300]} 100%)`,
      border: `1px solid ${colors.white[700]}`,
      boxShadow: `${space[4]} ${space[4]} ${space[6]} ${colors.blackAlpha[300]}, 0 -${space[4]} ${space[6]} ${colors.whiteAlpha[500]}`,

      "&[data-disabled]": {
        background: "white.900",
        boxShadow: "unset",
      },

      "&[data-checked]": {
        boxShadow: "unset",
      },

      "&[data-checked]::before": {
        width: "100%",
        height: "100%",
        position: "absolute",
        borderRadius: 0,
        boxShadow: `inset ${space[2]} ${space[2]} ${space[4]} ${colors.blackAlpha[300]}`,
        background: `${colorScheme}.300`,
      },

      _dark: {
        background: darkBackground,
        backgroundImage: `linear-gradient(-15deg, black.500 0%, gray.600 100%)`,
        boxShadow: `${space[4]} ${space[4]} ${space[8]} ${colors.blackAlpha[400]}, 0 -${space[4]} ${space[4]} ${colors.whiteAlpha[200]}`,
        border: `1px solid ${colors.gray[800]}`,

        "&[data-disabled]": {
          background: "gray.700",
          opacity: "0.2",
        },

        "&[data-checked]": {
          boxShadow: "unset",
        },

        "&[data-checked]::before": {
          background: `${colorScheme}.800`,
          boxShadow: `inset ${space[2]} ${space[2]} ${space[4]} ${colors.blackAlpha[400]}`,
        },
      },
    },

    "& label:first-of-type span.chakra-radio__control, & label:first-of-type span.chakra-radio__label":
      {
        borderRadius: `${space[6]} 0 0 ${space[6]}`,

        "&[data-checked]::before": {
          borderRadius: `${space[6]} 0 0 ${space[6]}`,
        },
      },

    "& label:last-of-type span.chakra-radio__control, & label:last-of-type span.chakra-radio__label":
      {
        borderRadius: `0 ${space[6]} ${space[6]} 0`,

        "&[data-checked]::before": {
          borderRadius: `0 ${space[6]} ${space[6]} 0`,
        },
      },
  };

  if (colorScheme === "white") {
    return {
      ...multiSwitch,

      "& span.chakra-radio__control": {
        width: "100%",
        height: "100%",
        position: "absolute",
        borderRadius: 0,
        background: lightBackground,
        backgroundImage: `linear-gradient(-15deg, ${colors.white[700]} 0%, ${colors.white[300]} 100%)`,
        border: `1px solid ${colors.white[700]}`,
        boxShadow: `${space[4]} ${space[4]} ${space[8]} ${colors.blackAlpha[300]}, 0 -${space[4]} ${space[4]} ${colors.white[50]}`,

        "&[data-disabled]": {
          background: "white.900",
          boxShadow: "unset",
        },

        "&[data-checked]": {
          boxShadow: "unset",
        },

        "&[data-checked]::before": {
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: 0,
          boxShadow: `inset ${space[2]} ${space[2]} ${space[4]} ${colors.blackAlpha[300]}`,
          background: `${colorScheme}.500`,
        },
      },
    };
  }

  if (colorScheme === "black") {
    return {
      ...multiSwitch,

      "& span.chakra-radio__label": {
        margin: 0,
        padding: `0.25rem 0.5rem`,
        border: "unset",
        zIndex: 2,

        "&[data-checked]": {
          color: "white.500",
        },
      },

      "& span.chakra-radio__control": {
        width: "100%",
        height: "100%",
        position: "absolute",
        borderRadius: 0,
        background: lightBackground,
        backgroundImage: `linear-gradient(-15deg, ${colors.white[700]} 0%, ${colors.white[300]} 100%)`,
        border: `1px solid ${colors.white[700]}`,
        boxShadow: `${space[4]} ${space[4]} ${space[8]} ${colors.blackAlpha[300]}, 0 -${space[4]} ${space[4]} ${colors.white[50]}`,

        "&[data-disabled]": {
          background: "white.900",
          boxShadow: "unset",
        },

        "&[data-checked]": {
          boxShadow: "unset",
        },

        "&[data-checked]::before": {
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: 0,
          boxShadow: `inset ${space[2]} ${space[2]} ${space[4]} ${colors.blackAlpha[900]}`,
          background: `${colorScheme}.50`,
        },
      },
    };
  }

  return multiSwitch;
});

export const MultiSwitch = defineStyleConfig({
  baseStyle: multiSwitch,
  defaultProps: {
    colorScheme: "gray",
  },
});
