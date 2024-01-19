import {
  StyleFunctionProps,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/react";
import { drawerAnatomy } from "@chakra-ui/anatomy";

import { scrollBarStyleLight } from "../../utils/component.utils";
import { darkBackground, lightBackground } from "../../utils/colours.utils";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(drawerAnatomy.keys);

const drawer = definePartsStyle(({ theme, ...props }: StyleFunctionProps) => {
  const { space, colors } = theme;

  return {
    overlay: {
      "--overlay-background": "blackAlpha.600",
      backgroundColor: "var(--overlay-background)",
    },
    dialogContainer: {},
    dialog: {
      "--border-radius": `${space[16]} 0 0 ${space[16]}`,
      "--btn-grid-column": 2,
      "--grid-template-columns": `${space[32]} 1fr`,
      "--title-grid-column": 1,

      borderRadius: `var(--border-radius)`,
      boxShadow: `0 ${space[4]} ${space[16]} ${colors.blackAlpha[500]}`,
      backgroundColor: lightBackground,

      _dark: {
        backgroundColor: darkBackground,
      },
    },
    header: {
      display: "grid",
      gridTemplateColumns: "var(--grid-template-columns)",
      padding: space[16],
      alignItems: "center",
      gap: space[8],
      // 'minHeight': space[56],

      "& > h5": {
        gridColumn: "var(--title-grid-column)",
        justifySelf: "center",
        textTransform: "capitalize",
        gridRow: 1,
      },
    },
    closeButton: {
      position: "relative",
      gridColumn: "var(--btn-grid-column)",
      padding: "0",
      top: "unset",
      right: "unset",
      height: space[32],
      width: space[32],
    },
    body: {
      padding: "1rem 2rem",

      ...scrollBarStyleLight(theme),
    },
    footer: {
      display: "flex",
      gap: space[16],
      padding: `${space[16]} ${space[32]}`,
    },
  };
});

export const Drawer = defineMultiStyleConfig({
  baseStyle: drawer,
});
