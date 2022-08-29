import React, { useEffect, useState } from "react";
import { createGlobalState } from "react-use";
import { Container, Flex, Text } from "@chakra-ui/react";
import { useIdle } from "react-use";

import VideoOverlayGradient from "./VideoOverlayGradient";
import VideoControls from "../VideoControls";
import { useHover } from "..";
import { VideoOverlayIconNames } from "./VideoOrverlay.types";

type VideoOverlayProps = {
  videoRef?: React.MutableRefObject<HTMLVideoElement>;
  togglePlay: () => any;
};

export const useVideoHoverActive = createGlobalState(true);
export const useVideoOverlayIcon = createGlobalState<VideoOverlayIconNames>();

const VideoOverlay = ({ togglePlay }: VideoOverlayProps) => {
  // const [videoFirstMount] = useVideoFirstMount();
  // const [paused] = usePaused();
  const [hover] = useHover();
  const [hoverActive] = useVideoHoverActive();
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
            Title of the video
          </Text>
        </Container>
      </VideoOverlayGradient>
      <VideoOverlayGradient flip position="absolute" bottom="0" />

      <VideoControls />
    </Flex>
  );
};

export default VideoOverlay;
