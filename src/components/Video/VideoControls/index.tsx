import React, { useContext } from "react";

import { Container, Divider, Flex, Text } from "@chakra-ui/react";
import VideoContext from "../../../../context/video.context";
import { PauseIcon, PlayIcon, RewindIcon } from "../../Icons";
import {
  usePaused,
  useVideoCurrentTime,
  useVideoHoverActive,
  useVideoRate,
} from "../../../globalStates";
import VideoControlButton from "./VideoControlButton";
import formatDuration from "../utils/formatDuration";
import VideoControlVolume from "./VideoControlVolume";
import VideoControlCaption from "./VideoControlCaption";
import VideoControlSpeed from "./VideoControlSpeed";

const VideoControls = () => {
  const {
    videoRef,
    functions: { skip, togglePlay },
  } = useContext(VideoContext);
  const setHoverActive = useVideoHoverActive()[1];
  const [paused] = usePaused();
  const [currentTime] = useVideoCurrentTime();

  const video = videoRef.current;

  const iconSize = { w: "8", h: "8" };

  const duration = video?.duration ? formatDuration(video.duration) : "00:00";

  return (
    <Container maxW="full" position="absolute" bottom="0">
      <Flex w="full" h="1.5" bgColor="brand"></Flex>

      <Flex
        onMouseEnter={() => setHoverActive(false)}
        onMouseLeave={() => setHoverActive(true)}
        w="full"
        h="12"
        alignItems="center"
      >
        <VideoControlButton onClick={togglePlay}>
          {paused ? <PlayIcon {...iconSize} /> : <PauseIcon w="7" h="7" />}
        </VideoControlButton>

        <VideoControlButton onClick={() => skip(-5)}>
          <RewindIcon w="6" h="6" />
        </VideoControlButton>

        <VideoControlSpeed />

        <VideoControlButton onClick={() => skip(5)}>
          <RewindIcon w="6" h="6" transform="scaleX(-1)" />
        </VideoControlButton>

        <Text as="span" fontWeight="bold" minW="max-content">
          {currentTime || "00:00"} / {duration}
        </Text>

        <Divider visibility="hidden" />

        <VideoControlVolume />

        <VideoControlCaption />
      </Flex>
    </Container>
  );
};

export default VideoControls;
