import React, { useContext, useEffect, useState } from "react";
import { Container, Flex, Text } from "@chakra-ui/react";
import { useIdle } from "react-use";

import VideoOverlayGradient from "./VideoOverlayGradient";
import VideoControls from "../VideoControls";
import {
  useActiveFile,
  useCaptionUnder,
  useHover,
  useVideoHoverActive,
} from "../../../globalStates";
import VideoContext from "../../../../context/video.context";
import VideoCaptions from "../VideoControls/VideoCaptions";

const VideoOverlay = () => {
  const togglePlay = useContext(VideoContext).functions.togglePlay;
  const [activeFile] = useActiveFile();

  const [hover] = useHover();
  const [hoverActive] = useVideoHoverActive();
  const [captionUnder] = useCaptionUnder();

  const [isIdle, setIsIdle] = useState(false);

  const idleState = useIdle(2000);

  useEffect(() => {
    if (!hoverActive) setIsIdle(false);
    if (hoverActive) setIsIdle(hover && idleState);
  }, [idleState]);

  return (
    <Flex
      w="full"
      h="full"
      alignItems="center"
      justifyContent="center"
      zIndex={1}
      pointerEvents={isIdle ? "none" : "visible"}
      opacity={1}
      transition="all 500ms ease-in"
      position="relative"
    >
      <Flex onClick={togglePlay} w="full" h="full" position="absolute" />
      <VideoOverlayGradient position="absolute" top="0">
        <Container mx="xl" mt={4}>
          <Text w="fit-content" pointerEvents="auto">
            {activeFile.name}
          </Text>
        </Container>
      </VideoOverlayGradient>

      {!captionUnder && <VideoCaptions />}

      <VideoOverlayGradient flip position="absolute" bottom="0" />
      <VideoControls />
    </Flex>
  );
};

export default VideoOverlay;
