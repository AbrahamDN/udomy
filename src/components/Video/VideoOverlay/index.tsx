import React, { useState } from "react";
import { Container, Flex, Text } from "@chakra-ui/react";
import { useIdle } from "react-use";

import VideoOverlayGradient from "./VideoOverlayGradient";

type VideoOverlayProps = {
  videoRef?: React.MutableRefObject<HTMLVideoElement>;
  togglePlay: () => any;
};

const VideoOverlay = ({ togglePlay }: VideoOverlayProps) => {
  // const [videoFirstMount] = useVideoFirstMount();
  // const [paused] = usePaused();
  const [hover, setHover] = useState(false);

  const idleState = useIdle(3000);
  const isIdle = hover && idleState;

  return (
    <Flex
      onClick={togglePlay}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      w="full"
      h="full"
      alignItems="center"
      justifyContent="center"
      zIndex={1}
      pointerEvents={isIdle ? "none" : "visible"}
      opacity={isIdle || !hover ? 0 : 1}
      transition="all 500ms ease-in"
      position="relative"
    >
      <VideoOverlayGradient position="absolute" top="0">
        <Container mx="xl" mt={4}>
          <Text>Title of the video</Text>
        </Container>
      </VideoOverlayGradient>
    </Flex>
  );
};

export default VideoOverlay;
