import React, { useRef } from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import useVideoKeyPress from "./hooks/useVideoKeyPress";

const Video = () => {
  const videoContainer = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;

  const togglePlay = () => {
    if (!video) return null;
    const videoPaused = video.paused;
    videoPaused ? video.play() : video.pause();
  };
  const toggleMute = () => {
    if (!video) return null;
    video.muted = !video.muted;
  };
  +useVideoKeyPress({ togglePlay, toggleMute });

  return (
    <Flex
      ref={videoContainer}
      bgColor="black"
      color="white"
      w="full"
      h="full"
      position="relative"
      alignItems="center"
      justifyContent="center"
      cursor={video ? "pointer" : "default"}
    >
      <video
        ref={videoRef}
        src="/course/01-Introduction/01- How Dropshipping Really Works.mp4"
        style={{ position: "absolute", width: "100%", height: "100%" }}
        onClick={togglePlay}
      />
    </Flex>
  );
};

export default Video;
