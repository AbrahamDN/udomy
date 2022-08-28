import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";

import { Flex, Box, useMediaQuery, useBreakpointValue } from "@chakra-ui/react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import VideoSection from "../components/VideoSection";
import { Footer } from "../components/Footer";

const Index = () => {
  const [sidebar, setSidebar] = useState(false);
  const [localSidebar, setLocalSidebar] = useLocalStorage("sidebar", false);

  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

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
          w={{
            base: "full",
            sidebarMin: sidebar ? "calc(100% - 300px)" : "full",
            sidebarMax: sidebar ? "75%" : "full",
          }}
          h="full"
          flex={1}
          direction="column"
        >
          <VideoSection sidebar={sidebar} setSidebar={setSidebar} />

          {isLargeScreen && sidebar && <Sidebar setSidebar={setSidebar} />}

          <Dashboard sidebar={sidebar} />

          <Footer />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Index;
