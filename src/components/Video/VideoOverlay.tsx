import React, { useEffect, useState } from "react";
import { useEvent } from "react-use";
import { Flex, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { PauseIcon, PlayIcon } from "../Icons";
import { usePaused } from ".";
import { useVideoFirstMount } from "../VideoSection";

type VideoOverlayProps = {
  videoRef?: React.MutableRefObject<HTMLVideoElement>;
};

const animationKeyframes = keyframes`
  0% { transform: scale(1) ; }
  25% { transform: scale(1.1) ; }
  50% { transform: scale(1.1); }
  75% { transform: scale(1); }
  100% { transform: scale(1) ; }
`;
const animation = `${animationKeyframes} 250ms ease-in-out`;

const VideoOverlay = ({}: VideoOverlayProps) => {
  const [paused] = usePaused();
  const [showIcon, setShowIcon] = useState(true);
  const [videoFirstMount] = useVideoFirstMount();

  if (showIcon) setTimeout(() => setShowIcon(false), 200);
  useEffect(() => setShowIcon(true), [paused]);

  return (
    <Flex
      className="video-overlay"
      w="full"
      h="full"
      alignItems="center"
      justifyContent="center"
      zIndex={1}
      pointerEvents="none"
    >
      {(videoFirstMount || showIcon) && (
        <Flex
          as={motion.div}
          animation={animation}
          w={24}
          h={24}
          alignItems="center"
          justifyContent="center"
          borderRadius="full"
          bgColor="black_80"
          color="white"
        >
          {paused ? <PlayIcon w={16} h={16} /> : <PauseIcon w={16} h={16} />}
        </Flex>
      )}
    </Flex>
  );
};

export default VideoOverlay;
