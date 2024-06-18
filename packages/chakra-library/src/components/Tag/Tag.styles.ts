import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { tagAnatomy } from "@chakra-ui/anatomy";

import { blackText, whiteText } from "../../utils/colours.utils";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const tag = definePartsStyle(({ theme, ...props }) => {
  const { space } = theme;
  return {
    container: {
      padding: `0 ${space[8]}`,
      gap: space[4],
    },
    label: {
      _dark: {},
    },
    closeButton: {},
  };
});

const subtle = definePartsStyle(({ theme, colorScheme, ...props }) => {
  const { space } = theme;

  if (colorScheme === "white") {
    return {
      container: {
        color: blackText,
        _dark: {
          color: whiteText,
        },
      },
      label: {},
      closeButton: {},
    };
  }

  if (colorScheme === "black") {
    return {
      container: {
        color: whiteText,
      },
      label: {},
      closeButton: {},
    };
  }

  return {
    container: {},
    label: {},
    closeButton: {},
  };
});

const outline = definePartsStyle(({ theme, colorScheme, ...props }) => {
  const { space } = theme;

  if (colorScheme === "white") {
    return {
      container: {
        color: blackText,
        _dark: {
          color: whiteText,
        },
      },
      label: {},
      closeButton: {},
    };
  }

  if (colorScheme === "black") {
    return {
      container: {
        color: "white.900",
      },
      label: {},
      closeButton: {},
    };
  }

  return {
    container: {},
    label: {},
    closeButton: {},
  };
});

export const Tag = defineMultiStyleConfig({
  baseStyle: tag,
  variants: {
    subtle,
    outline,
  },
});
