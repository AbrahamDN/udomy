import React, { useContext, useEffect, useState } from "react";

import { Button, Flex, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";

import VideoOverlayIcon from "../VideoOverlay/VideoOverlayIcon";
import {
  useVideoControlTriggered,
  useVideoFirstMount,
  useVideoHoverActive,
  useVideoOverlayIcon,
} from "../../../globalStates";
import VideoContext from "../../../../context/video.context";

const animationKeyframes = keyframes`
  0% { transform: scale(1) ; }
  25% { transform: scale(1.1) ; }
  50% { transform: scale(1.1); }
  75% { transform: scale(1); }
  100% { transform: scale(1) ; }
`;
const animation = `${animationKeyframes} 250ms ease-in-out`;

const VideoControlPopover = () => {
  const togglePlay = useContext(VideoContext).functions.togglePlay;
  const [videoFirstMount] = useVideoFirstMount();
  const [videoOverlayIcon] = useVideoOverlayIcon();
  const setHoverActive = useVideoHoverActive()[1];
  const [controlTriggered] = useVideoControlTriggered();

  const [showIcon, setShowIcon] = useState(true);

  if (showIcon) setTimeout(() => setShowIcon(false), 200);
  // useEffect(() => setShowIcon(true), [paused]);
  useEffect(() => setShowIcon(true), [controlTriggered]);

  if (!(videoFirstMount || showIcon)) return null;
  return (
    <Flex
      onClick={videoFirstMount ? togglePlay : null}
      onMouseEnter={() => setHoverActive(false)}
      onMouseLeave={() => setHoverActive(true)}
      as={videoFirstMount ? Button : motion.div}
      animation={animation}
      w={24}
      h={24}
      alignItems="center"
      justifyContent="center"
      border="none"
      borderRadius="full"
      bgColor={videoFirstMount ? "black" : "black_80"}
      color="white"
      position="absolute"
      zIndex={10}
    >
      {videoFirstMount ? (
        <VideoOverlayIcon name="play" />
      ) : (
        <VideoOverlayIcon name={videoOverlayIcon} />
      )}
    </Flex>
  );
};

export default VideoControlPopover;
