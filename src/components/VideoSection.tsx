import React from "react";
import { AspectRatio, Box, useBreakpointValue } from "@chakra-ui/react";
import { useSidebar } from "../pages";
import OpenSidebarButton from "./OpenSidebarButton";
import Video from "./Video";

type VideoSectionProps = {
  sidebar?: boolean;
  setSidebar?: (value: boolean) => any;
};

const VideoSection = ({}: VideoSectionProps) => {
  const [sidebar, setSidebar] = useSidebar();
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  return (
    <AspectRatio
      flex={1}
      maxW="full"
      height={{ base: "60vh", lg: sidebar ? "60vh" : "auto" }}
      maxHeight={{ base: "60vh", lg: sidebar ? "60vh" : "80vh" }}
      minH="72"
      ratio={16 / 9}
    >
      <Box bg="black" position="relative">
        <Video />

        {isLargeScreen && !sidebar && (
          <OpenSidebarButton setSidebar={setSidebar} />
        )}
      </Box>
    </AspectRatio>
  );
};

export default VideoSection;
