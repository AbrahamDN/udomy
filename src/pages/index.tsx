import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";

import {
  Text,
  Flex,
  Box,
  AspectRatio,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";

import { Container } from "../components/Container";
import Header from "../components/Header";
import { ArrowBackIcon } from "@chakra-ui/icons";
import DashboardTabs from "../components/DashboardTabs";
import Sidebar from "../components/sidebar";

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
                <Button
                  onClick={() => setSidebar(true)}
                  aria-label="Course content"
                  position="absolute"
                  right={0}
                  top="2"
                  minH={12}
                  bgColor="black"
                  color="white"
                  fontWeight="bold"
                  borderRadius={0}
                  border="1px solid"
                  borderColor="whiteAlpha.500"
                  px={3}
                  transition="all 300ms ease-in-out"
                  transform="translateX(8.2rem)"
                  _hover={{ bgColor: "darkGrey", transform: "translateX(0)" }}
                  _focus={{ bgColor: "darkGrey", transform: "translateX(0)" }}
                >
                  <Flex alignItems="center">
                    <ArrowBackIcon w="6" h="6" />
                    <Text as="span" ml={3}>
                      Course content
                    </Text>
                  </Flex>
                </Button>
              )}
            </Box>
          </AspectRatio>

          {/* SIDEBAR */}
          {isLargeScreen && sidebar && <Sidebar setSidebar={setSidebar} />}

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
