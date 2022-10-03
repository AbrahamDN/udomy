import { useEffect } from "react";
import { useLocalStorage } from "react-use";

import { Flex, Box, useBreakpointValue } from "@chakra-ui/react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import VideoSection from "../components/VideoSection";
import { Footer } from "../components/Footer";
import { useActiveFile, useCourseData, useSidebar } from "../globalStates";
import currExtensions from "../../contstants/curriculumExtensions.schema";

const Index = ({ course, defaultFile }) => {
  const setCourseData = useCourseData()[1];
  const setActiveFile = useActiveFile()[1];
  const [sidebar, setSidebar] = useSidebar();
  const [localSidebar, setLocalSidebar] = useLocalStorage("sidebar", false);
  const [] = useLocalStorage("course", course);

  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  useEffect(() => {
    setSidebar(localSidebar);
    setCourseData(course);
    setActiveFile(course?.children.find((file) => file.type === "file")[0]);
    if (defaultFile) setActiveFile(defaultFile);
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
          <VideoSection />

          {isLargeScreen && sidebar && <Sidebar />}

          <Dashboard />

          <Footer />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Index;

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/getCourse`);
  const course = await res.json();

  if (!course) {
    return {
      notFound: true,
    };
  }

  const isVideo = (item) =>
    currExtensions.find(({ extension }) => extension === item.extension)
      ?.type === "video";
  const firstVideo = course.children?.find((file) => isVideo(file) && file);
  const firstFolder = course.children?.find((file) => file.children);
  const firstSubVideo = firstFolder.children?.find(
    (file) => isVideo(file) && file
  );
  const defaultFile = firstVideo || firstSubVideo;

  return {
    props: { course, defaultFile },
  };
}
