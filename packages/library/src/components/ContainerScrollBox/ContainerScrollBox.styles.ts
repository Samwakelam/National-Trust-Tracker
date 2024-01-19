import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

import {
  scrollBarStyleLight,
  scrollBarStyleDark,
} from "../../utils/component.utils";
import { darkBackground, lightBackground } from "../../utils/colours.utils";

const containerScrollBox = defineStyle(({ theme, ...props }) => {
  return {
    backgroundColor: lightBackground,
    flex: 1,
    overflowY: "auto",

    ...scrollBarStyleLight(theme),

    _dark: {
      backgroundColor: darkBackground,
      ...scrollBarStyleDark(theme),
    },
  };
});

export const ContainerScrollBox = defineStyleConfig({
  baseStyle: containerScrollBox,
});
