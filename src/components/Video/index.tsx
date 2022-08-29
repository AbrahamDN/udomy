import React, { useEffect, useRef, useState } from "react";

import { Flex } from "@chakra-ui/react";
import useVideoKeyPress from "./hooks/useVideoKeyPress";
import VideoOverlay from "./VideoOverlay";
import VideoPlayButton from "./VideoPlayButton";
import VideoContext from "../../../context/video.context";
import { VideoOverlayIconNames } from "./VideoOverlay/VideoOrverlay.types";
import {
  useHover,
  usePaused,
  useVideoControlTriggered,
  useVideoFirstMount,
  useVideoLoading,
  useVideoOverlayIcon,
} from "../../globalStates";

const Video = () => {
  // GLobal States
  const [loading, setLoading] = useVideoLoading();
  const setVideoFirstMount = useVideoFirstMount()[1];
  const setHover = useHover()[1];
  const setVideoOverlayIcon = useVideoOverlayIcon()[1];
  const setPaused = usePaused()[1];
  const setControlTriggered = useVideoControlTriggered()[1];
  // States
  const [mounted, setMounted] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  // Refs / Variables
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;

  // Functions
  const triggerControl = (icon?: VideoOverlayIconNames) => {
    if (icon) setVideoOverlayIcon(icon);
    setControlTriggered((prev) => !prev);
  };

  const sharedFunctions = {
    togglePlay: () => {
      if (!video) return null;
      const videoPaused = video.paused;
      videoPaused ? video.play() : video.pause();
      setVideoFirstMount(false);
      triggerControl(videoPaused ? "play" : "pause");
    },
    toggleMute: () => {
      if (!video) return null;
      video.muted = !video.muted;
      triggerControl(video.muted ? "mute" : "volume");
    },
    skip: (duration: number) => {
      if (!video) return null;
      video.currentTime += duration;
      triggerControl(duration < 0 ? "backSkip" : "forwardSkip");
    },
  };
  const { togglePlay } = sharedFunctions;

  // Event Listeners
  useVideoKeyPress(sharedFunctions);

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
        functions: sharedFunctions,
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
