import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";

import { Flex, Box, AspectRatio, useMediaQuery } from "@chakra-ui/react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import OpenSidebarButton from "../components/OpenSidebarButton";
import Dashboard from "../components/Dashboard";

const Index = () => {
  const [sidebar, setSidebar] = useState(false);
  const [localSidebar, setLocalSidebar] = useLocalStorage("sidebar", false);

  const [isLargeScreen] = useMediaQuery("(min-width: 61.25em)");
  const [isSidebarBreak] = useMediaQuery(
    "(min-width: 61.31em) and (max-width: 75em)"
  );

  useEffect(() => {
    setSidebar(localSidebar);
  }, []);

  useEffect(() => {
    setLocalSidebar(sidebar);
  }, [sidebar]);

  return (
    <Flex minH="100vh" width="full" direction="column">
      <Box as="header" h="fit-content">
        <Header />
      </Box>

      <Box as="main" position="relative" flex={1} h="full">
        <Flex
          w={
            sidebar && isLargeScreen
              ? isSidebarBreak
                ? "calc(100% - 300px)"
                : "75%"
              : "full"
          }
          h="full"
          flex={1}
          direction="column"
        >
          <AspectRatio
            flex={1}
            maxW="full"
            height={isLargeScreen && sidebar ? "60vh" : "auto"}
            maxHeight={isLargeScreen && sidebar ? "60vh" : "80vh"}
            minH="72"
            ratio={16 / 9}
          >
            <Box bg="black" position="relative">
              {isLargeScreen && !sidebar && (
                <OpenSidebarButton setSidebar={setSidebar} />
              )}
            </Box>
          </AspectRatio>

          {isLargeScreen && sidebar && <Sidebar setSidebar={setSidebar} />}

          <Dashboard sidebar={sidebar} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Index;
