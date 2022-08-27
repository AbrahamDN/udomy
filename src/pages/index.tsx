import { useState } from "react";

import {
  Text,
  Flex,
  Box,
  AspectRatio,
  useMediaQuery,
  Button,
  Heading,
} from "@chakra-ui/react";

import { Container } from "../components/Container";
import Header from "../components/Header";
import { ArrowBackIcon, CloseIcon } from "@chakra-ui/icons";
import DashboardTabs from "../components/DashboardTabs";

const Index = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isDesktop] = useMediaQuery("(min-width: 90em)");
  const [isLargeScreen] = useMediaQuery("(min-width: 64em)");
  const [isSidebarBreak] = useMediaQuery(
    "(min-width: 61.31em) and (max-width: 75em)"
  );

  return (
    <Flex minH="100vh" width="full" direction="column">
      <Header />

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
            height={sidebar ? "60vh" : "auto"}
            maxHeight={sidebar ? "60vh" : "80vh"}
            minH="96"
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

          {isLargeScreen && sidebar && (
            <Box
              as="aside"
              minW={isLargeScreen ? (isSidebarBreak ? "300px" : "25%") : "25%"}
              borderLeft="1px solid"
              borderColor="gray.50"
              bgColor="white"
              height="100%"
              position="absolute"
              right={0}
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
            </Box>
          )}

          <Box flex={1} h="full">
            <Container
              maxW={isDesktop ? "7xl" : "5xl"}
              textAlign="left"
              m="auto"
              bgColor="transparent"
            >
              <Flex w="full" px={6} textAlign="left">
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
