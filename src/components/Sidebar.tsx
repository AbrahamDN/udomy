import { useWindowScroll } from "react-use";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import CourseContent from "./CourseContent";

type SidebarProps = {
  setSidebar: (value: boolean) => any;
};

const Sidebar = ({ setSidebar }: SidebarProps) => {
  const { y: scrollY } = useWindowScroll();
  const calcYSpace = scrollY <= 57 ? scrollY : 57;

  return (
    <Box
      as="aside"
      minW={{ base: "25%", sidebarMin: "300px", sidebarMax: "25%" }}
      h="100%"
      borderLeft="1px solid"
      borderColor="gray.50"
      bgColor="white"
      position="fixed"
      top={`calc(0px + (57px - ${calcYSpace}px))`}
      right={0}
      transition="all 150ms ease"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        border="1px solid"
        borderColor="gray.400"
        p={2}
        pl={4}
      >
        <Heading size="sm">Course content</Heading>

        <Button
          onClick={() => setSidebar(false)}
          p={0.5}
          bgColor="transparent"
          _hover={{ bgColor: "transparent" }}
          _focus={{ bgColor: "transparent" }}
        >
          <CloseIcon w="3" h="3" />
        </Button>
      </Flex>

      <Box
        w="full"
        h="full"
        minH="494px"
        maxH={`calc((100vh - 115px) + ${calcYSpace}px)`}
        overflowY="auto"
        bgColor="white"
        transition="all 150ms ease"
      >
        <CourseContent />
      </Box>
    </Box>
  );
};

export default Sidebar;
