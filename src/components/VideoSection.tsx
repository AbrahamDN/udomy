import { AspectRatio, Box, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import OpenSidebarButton from "./OpenSidebarButton";

type VideoSectionProps = {
  sidebar: boolean;
  setSidebar: (value: boolean) => any;
};

const VideoSection = ({ sidebar, setSidebar }: VideoSectionProps) => {
  const [isLargeScreen] = useMediaQuery("(min-width: 61.25em)");

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
        {isLargeScreen && !sidebar && (
          <OpenSidebarButton setSidebar={setSidebar} />
        )}
      </Box>
    </AspectRatio>
  );
};

export default VideoSection;
