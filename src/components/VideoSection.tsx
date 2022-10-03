import React, { useEffect, useRef } from "react";

import {
  AspectRatio,
  Box,
  Flex,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import OpenSidebarButton from "./OpenSidebarButton";
import Video from "./Video";
import {
  useActiveFile,
  useSidebar,
  useVideoFirstMount,
  useVideoFullscreen,
  useVideoLoading,
} from "../globalStates";
import PageContainer from "./PageContainer";
import curriculumType from "../utils/curriculumType";

type VideoSectionProps = {
  sidebar?: boolean;
  setSidebar?: (value: boolean) => any;
};

const VideoSection = ({}: VideoSectionProps) => {
  const setVideoFirstMount = useVideoFirstMount()[1];
  const [activeFile] = useActiveFile();
  const [loading] = useVideoLoading();
  const [sidebar, setSidebar] = useSidebar();
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  useEffect(() => setVideoFirstMount(true), []);

  return (
    <AspectRatio
      flex={1}
      maxW="full"
      height={{ base: "60vh", lg: sidebar ? "60vh" : "auto" }}
      maxHeight={{ base: "60vh", lg: sidebar ? "60vh" : "80vh" }}
      minH="72"
      ratio={16 / 9}
      position="relative"
    >
      <Box bg="black" color="white" position="relative">
        {curriculumType(activeFile) ? (
          <>
            {loading && (
              <Flex
                w={24}
                h={24}
                position="absolute"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                color="white"
                zIndex="overlay"
              >
                <Spinner
                  w={16}
                  h={16}
                  thickness="10px"
                  speed="0.65s"
                  label="Loading..."
                />
              </Flex>
            )}

            <Video />
          </>
        ) : (
          <PageContainer path={activeFile.path} />
        )}

        {isLargeScreen && !sidebar && (
          <OpenSidebarButton setSidebar={setSidebar} />
        )}
      </Box>
    </AspectRatio>
  );
};

export default VideoSection;
