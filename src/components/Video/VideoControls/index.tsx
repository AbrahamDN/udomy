import React, { useContext } from "react";
import { Container, Flex } from "@chakra-ui/react";
import VideoContext from "../../../../context/video.context";
import { PauseIcon, PlayIcon, RewindIcon } from "../../Icons";
import { VideoOverlayIconNames } from "../VideoOverlay/VideoOrverlay.types";
import { usePaused, useVideoHoverActive } from "../../../globalStates";
import VideoControlButton from "./VideoControlButton";

const VideoControls = () => {
  const { togglePlay, skip } = useContext(VideoContext).functions;
  const [paused] = usePaused();
  const setHoverActive = useVideoHoverActive()[1];
  // const setVideoOverlayIcon = useVideoOverlayIcon()[1];

  const iconSize = { w: "8", h: "8" };

  const handleButtonClick = (
    func: (val?: any) => any,
    icon?: VideoOverlayIconNames
  ) => {
    // if (icon) setVideoOverlayIcon(icon);
    return func;
  };

  return (
    <Container maxW="full" position="absolute" bottom="0">
      <Flex w="full" h="1.5" bgColor="brand"></Flex>

      <Flex
        w="full"
        h="12"
        onMouseEnter={() => setHoverActive(false)}
        onMouseLeave={() => setHoverActive(true)}
      >
        <VideoControlButton onClick={() => handleButtonClick(togglePlay())}>
          {paused ? <PlayIcon {...iconSize} /> : <PauseIcon w="7" h="7" />}
        </VideoControlButton>

        <VideoControlButton
          onClick={() => handleButtonClick(skip(-5), "backSkip")}
        >
          <RewindIcon w="7" h="7" />
        </VideoControlButton>

        <VideoControlButton
          onClick={() => handleButtonClick(skip(5), "forwardSkip")}
        >
          <RewindIcon w="7" h="7" transform="scaleX(-1)" />
        </VideoControlButton>
      </Flex>
    </Container>
  );
};

export default VideoControls;
