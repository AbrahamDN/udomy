import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import { useSidebar } from "../../pages";
import DashboardTabs from "./DashboardTabs";

type DashboardProps = {
  sidebar?: boolean;
};

const Dashboard = ({}: DashboardProps) => {
  const [sidebar] = useSidebar();
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
