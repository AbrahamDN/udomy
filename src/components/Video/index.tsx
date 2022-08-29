import React, { useEffect, useRef, useState } from "react";
import { createGlobalState, useEvent } from "react-use";
import { useVideoFirstMount } from "../VideoSection";

import { Flex } from "@chakra-ui/react";
import useVideoKeyPress from "./hooks/useVideoKeyPress";
import VideoOverlay from "./VideoOverlay";
import VideoPlayButton from "./VideoPlayButton";
import VideoContext from "../../../context/video.context";

export const usePaused = createGlobalState(false);
export const useHover = createGlobalState(false);
export const useVideoLoading = createGlobalState(true);

const Video = () => {
  // GLobal States
  const setVideoFirstMount = useVideoFirstMount()[1];
  const setHover = useHover()[1];
  const [loading, setLoading] = useVideoLoading();
  // States
  const [mounted, setMounted] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const setPaused = usePaused()[1];
  // Refs / Variables
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;

  // Functions
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
  const skip = (duration: number) => {
    if (!video) return null;
    video.currentTime += duration;
  };

  const globalFunctions = { togglePlay, toggleMute, skip };

  // Event Listeners
  useVideoKeyPress(globalFunctions);

  // Life cycle events
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (typeof window !== "undefined")
      setAutoplay(JSON.parse(window.localStorage.getItem("autoplay")));
  }, [mounted]);

  // useEffect(() => {
  //   if (video?.duration) setLoading(false);
  // }, [video?.duration]);

  useEffect(() => {
    if (loading && video?.duration) setLoading(!Boolean(video.duration));
  });
  //   Component
  if (!mounted) return null;
  return (
    <VideoContext.Provider
      value={{
        videoContainerRef,
        videoRef,
        loading,
        functions: globalFunctions,
      }}
    >
      <Flex
        ref={videoContainerRef}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setTimeout(() => setHover(() => false), 2000)}
        w="full"
        h="full"
        alignItems="center"
        justifyContent="center"
        bgColor="black"
        color="white"
        position="relative"
      >
        {!loading && <VideoPlayButton togglePlay={togglePlay} />}

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
    </VideoContext.Provider>
  );
};

export default Video;
