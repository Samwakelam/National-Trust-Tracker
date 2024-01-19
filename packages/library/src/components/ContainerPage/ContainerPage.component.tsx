"use client";
import { ReactElement, ReactNode } from "react";

import * as Chakra from "@chakra-ui/react";

export const ContainerPage = ({
  children,
}: {
  children: ReactElement | ReactNode;
}) => {
  return (
    <Chakra.Flex
      as="main"
      data-label="container-page"
      flex={1}
      width="100%"
      overflow="hidden"
      position="relative"
    >
      {children}
    </Chakra.Flex>
  );
};
