import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";

import { Flex, Box, AspectRatio, useMediaQuery } from "@chakra-ui/react";

import { Container } from "../components/Container";
import Header from "../components/Header";
import DashboardTabs from "../components/DashboardTabs";
import Sidebar from "../components/sidebar";
import OpenSidebarButton from "../components/OpenSidebarButton";

const Index = () => {
  const [sidebar, setSidebar] = useState(false);
  const [localSidebar, setLocalSidebar] = useLocalStorage("sidebar", false);

  const [isDesktop] = useMediaQuery("(min-width: 90em)");
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

          {/* SIDEBAR */}
          {isLargeScreen && sidebar && <Sidebar setSidebar={setSidebar} />}

          {/* DASHBOARD */}
          <Box flex={1} h="full">
            <Container
              maxW={isDesktop ? "7xl" : "5xl"}
              textAlign="left"
              m="auto"
              bgColor="transparent"
            >
              <Flex w="full" px={isLargeScreen ? 6 : 0} textAlign="left">
                <DashboardTabs sidebar={sidebar} />
              </Flex>
            </Container>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Index;
