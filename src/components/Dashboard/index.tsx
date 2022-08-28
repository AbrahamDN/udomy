import { Box, Container, Flex, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import DashboardTabs from "./DashboardTabs";

type DashboardProps = {
  sidebar: boolean;
};

const Dashboard = ({ sidebar }: DashboardProps) => {
  return (
    <Box flex={1} h="full">
      <Container
        maxW={{ base: "5xl", xxl: "7xl" }}
        textAlign="left"
        m="auto"
        bgColor="transparent"
      >
        <Flex w="full" px={{ base: 0, lg: 6 }} textAlign="left">
          <DashboardTabs sidebar={sidebar} />
        </Flex>
      </Container>
    </Box>
  );
};

export default Dashboard;
