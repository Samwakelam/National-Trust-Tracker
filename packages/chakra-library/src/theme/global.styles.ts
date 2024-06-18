import { lightBackground, whiteText } from "../utils/colours.utils";

export const globalStyles = {
  "html body": {
    fontSize: "16px",
    bg: lightBackground,
  },
  "*": {
    boxSizing: "border-box",
  },
  a: {
    fontFamily: "heading",
    color: "gray.700",
    fontSize: "16",
    fontWeight: 400,
    margin: 0,
    textDecoration: "none",

    "&:hover": {
      color: "gray.500",
    },
  },
  h1: {
    fontFamily: "heading",
    color: "gray.900",
    fontSize: "32",
    fontWeight: "bold",
    margin: 0,
    textTransform: "uppercase",

    _dark: {
      color: whiteText,
    },
  },
  h2: {
    fontFamily: "heading",
    color: "gray.900",
    fontSize: "25",
    fontWeight: "bold",
    margin: 0,
    textTransform: "uppercase",

    _dark: {
      color: whiteText,
    },
  },
  h3: {
    fontFamily: "heading",
    color: "gray.900",
    fontSize: "12",
    fontWeight: "bold",
    margin: 0,
    textTransform: "uppercase",

    _dark: {
      color: whiteText,
    },
  },
  h4: {
    fontFamily: "heading",
    color: "gray.800",
    fontSize: "18",
    fontWeight: "bold",
    margin: 0,
    textTransform: "capitalize",

    _dark: {
      color: whiteText,
    },
  },
  h5: {
    fontFamily: "heading",
    color: "gray.800",
    fontSize: "16",
    fontWeight: "bold",
    margin: 0,
    textTransform: "capitalize",

    _dark: {
      color: whiteText,
    },
  },
  h6: {
    fontFamily: "heading",
    color: "gray.800",
    fontSize: "14",
    fontWeight: "bold",
    margin: 0,
    textTransform: "capitalize",

    _dark: {
      color: whiteText,
    },
  },
  p: {
    fontFamily: "body",
    color: "gray.700",
    fontSize: "16",
    fontWeight: "normal",
    margin: 0,

    _dark: {
      color: whiteText,
    },
  },
  li: {
    fontFamily: "body",
    color: "gray.700",
    fontSize: "16",
    fontWeight: "normal",
    margin: 0,

    _dark: {
      color: whiteText,
    },
  },
  button: {
    border: "unset",
    fontFamily: "body",
  },
  label: {
    fontSize: "16",
    fontWeight: "bold",
    fontFamily: "body",

    _dark: {
      color: whiteText,
    },
  },
};
