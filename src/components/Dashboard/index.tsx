import { Box, Container, Flex, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import DashboardTabs from "./DashboardTabs";

type DashboardProps = {
  sidebar: boolean;
};

const Dashboard = ({ sidebar }: DashboardProps) => {
  const [isDesktop] = useMediaQuery("(min-width: 90em)");
  const [isLargeScreen] = useMediaQuery("(min-width: 61.25em)");

  return (
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
  );
};

export default Dashboard;
