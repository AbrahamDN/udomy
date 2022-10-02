import React, { useContext, useEffect } from "react";

import {
  Container,
  Divider,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import VideoContext from "../../../../context/video.context";
import {
  ExpandIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
  ShrinkIcon,
} from "../../Icons";
import {
  usePaused,
  useSidebar,
  useVideoCurrentTime,
  useVideoFullscreen,
  useVideoHoverActive,
} from "../../../globalStates";
import VideoControlButton from "./VideoControlButton";
import formatDuration from "../utils/formatDuration";
import VideoControlVolume from "./VideoControlVolume";
import VideoControlCaption from "./VideoControlCaption";
import VideoControlSpeed from "./VideoControlSpeed";
import VideoSettings from "./VideoSettings";
import VideoTimeline from "./VideoTimeline";
import VideoFullscreen from "./VideoFullscreen";

const VideoControls = () => {
  const {
    videoRef,
    functions: { skip, togglePlay, triggerControl, toggleFullScreen },
  } = useContext(VideoContext);
  const setHoverActive = useVideoHoverActive()[1];
  const [paused] = usePaused();
  const [currentTime] = useVideoCurrentTime();
  const [fullScreen, setFullScreen] = useVideoFullscreen();
  const [sidebar, setSidebar] = useSidebar();

  const video = videoRef.current;

  const iconSize = { w: "8", h: "8" };

  const duration = video?.duration ? formatDuration(video.duration) : "00:00";
  const isFullScreen = document?.fullscreenElement;

  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  useEffect(() => {
    if (isFullScreen) setFullScreen(false);
    triggerControl(!isFullScreen ? "fullscreenExit" : "fullscreen");
  }, [isFullScreen, fullScreen]);

  return (
    <Container maxW="full" position="absolute" bottom="0">
      <VideoTimeline />

      <Flex
        onMouseEnter={() => setHoverActive(false)}
        onMouseLeave={() => setHoverActive(true)}
        w="full"
        h="12"
        alignItems="center"
      >
        <VideoControlButton
          toolLabel={paused ? "Play" : "Pause"}
          onClick={togglePlay}
        >
          {paused ? <PlayIcon {...iconSize} /> : <PauseIcon w="7" h="7" />}
        </VideoControlButton>

        <VideoControlButton toolLabel="Rewind 5s" onClick={() => skip(-5)}>
          <RewindIcon w="6" h="6" />
        </VideoControlButton>

        <VideoControlSpeed />

        <VideoControlButton toolLabel="Forward 5s" onClick={() => skip(5)}>
          <RewindIcon w="6" h="6" transform="scaleX(-1)" />
        </VideoControlButton>

        <Text as="span" fontWeight="bold" minW="max-content">
          {currentTime || "00:00"} / {duration}
        </Text>

        <Divider visibility="hidden" />

        <VideoControlVolume />

        <VideoControlCaption />

        <VideoSettings />

        <VideoFullscreen
          toggleFullScreen={toggleFullScreen}
          triggerControl={triggerControl}
        />

        {isLargeScreen && !fullScreen && (
          <VideoControlButton
            toolLabel={sidebar ? "Expanded view" : "Default view"}
            onClick={() => setSidebar((prev) => !prev)}
          >
            {sidebar ? <ExpandIcon w="6" h="6" /> : <ShrinkIcon w="6" h="6" />}
          </VideoControlButton>
        )}
      </Flex>
    </Container>
  );
};

export default VideoControls;
