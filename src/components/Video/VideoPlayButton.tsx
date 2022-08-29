import React, { useEffect, useState } from "react";

import { Flex, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { PauseIcon, PlayIcon } from "../Icons";
import { useVideoFirstMount } from "../VideoSection";
import { usePaused } from ".";

type VideoPlayButtonProps = { togglePlay: () => any };

const animationKeyframes = keyframes`
  0% { transform: scale(1) ; }
  25% { transform: scale(1.1) ; }
  50% { transform: scale(1.1); }
  75% { transform: scale(1); }
  100% { transform: scale(1) ; }
`;
const animation = `${animationKeyframes} 250ms ease-in-out`;

const VideoPlayButton = ({ togglePlay }: VideoPlayButtonProps) => {
  const [videoFirstMount] = useVideoFirstMount();
  const [paused] = usePaused();
  const [showIcon, setShowIcon] = useState(true);

  if (showIcon) setTimeout(() => setShowIcon(false), 200);
  useEffect(() => setShowIcon(true), [paused]);

  if (!(videoFirstMount || showIcon)) return null;
  return (
    <Flex
      as={videoFirstMount ? motion.button : motion.div}
      onClick={videoFirstMount ? togglePlay : null}
      animation={animation}
      w={24}
      h={24}
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
      bgColor={videoFirstMount ? "black" : "black_80"}
      color="white"
      position="absolute"
      zIndex={10}
    >
      {!paused ? <PlayIcon w={20} h={20} /> : <PauseIcon w={16} h={16} />}
    </Flex>
  );
};

export default VideoPlayButton;
