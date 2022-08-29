import React, { useEffect, useRef, useState } from "react";
import { createGlobalState } from "react-use";
import { useVideoFirstMount } from "../VideoSection";

import { Flex } from "@chakra-ui/react";
import useVideoKeyPress from "./hooks/useVideoKeyPress";
import VideoOverlay from "./VideoOverlay";
import VideoPlayButton from "./VideoPlayButton";

export const usePaused = createGlobalState(false);

const Video = () => {
  const [mounted, setMounted] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const setPaused = usePaused()[1];
  const setVideoFirstMount = useVideoFirstMount()[1];

  const videoContainer = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;

  const togglePlay = () => {
    if (!video) return null;
    const videoPaused = video.paused;
    videoPaused ? video.play() : video.pause();
    setVideoFirstMount(false);
  };
  const toggleMute = () => {
    if (!video) return null;
    video.muted = !video.muted;
  };

  useVideoKeyPress({ togglePlay, toggleMute });

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (typeof window !== "undefined")
      setAutoplay(JSON.parse(window.localStorage.getItem("autoplay")));
  }, [mounted]);

  if (!mounted) return null;
  return (
    <Flex
      ref={videoContainer}
      w="full"
      h="full"
      alignItems="center"
      justifyContent="center"
      bgColor="black"
      color="white"
      position="relative"
    >
      <VideoPlayButton togglePlay={togglePlay} />

      <VideoOverlay videoRef={videoRef} togglePlay={togglePlay} />

      <video
        ref={videoRef}
        src="/course/01-Introduction/01- How Dropshipping Really Works.mp4"
        style={{ position: "absolute", width: "100%", height: "100%" }}
        autoPlay={autoplay}
        muted={autoplay}
        onPause={() => setPaused(true)}
        onPlaying={() => setPaused(false)}
        onClick={togglePlay}
      />
    </Flex>
  );
};

export default Video;
