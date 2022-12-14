import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

type OpenSidebarButtonProps = {
  setSidebar: (value: boolean) => any;
};

const OpenSidebarButton = ({ setSidebar }: OpenSidebarButtonProps) => {
  return (
    <Button
      onClick={() => setSidebar(true)}
      aria-label="Course content"
      position="absolute"
      right={0}
      top="2"
      minH={12}
      fontWeight="bold"
      px={3}
      transition="all 300ms ease-in-out"
      transform="translateX(8.4rem)"
      _hover={{ bgColor: "darkGrey", transform: "translateX(0)" }}
      _focus={{ bgColor: "darkGrey", transform: "translateX(0)" }}
      zIndex="overlay"
    >
      <Flex alignItems="center">
        <ArrowBackIcon w="6" h="6" />
        <Text as="span" ml={3}>
          Course content
        </Text>
      </Flex>
    </Button>
  );
};

export default OpenSidebarButton;
