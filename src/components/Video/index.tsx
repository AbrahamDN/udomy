import React, { useEffect, useRef, useState } from "react";
import { useEvent, useLocalStorage } from "react-use";

import { Flex } from "@chakra-ui/react";
import useVideoKeyPress from "./hooks/useVideoKeyPress";
import VideoOverlay from "./VideoOverlay";
import VideoContext from "../../../context/video.context";
import { VideoOverlayIconNames } from "./VideoOverlay/VideoOrverlay.types";
import {
  useCaptionSize,
  useCaptionUnder,
  useHover,
  usePaused,
  useVideoCaption,
  useVideoControlTriggered,
  useVideoCurrentTime,
  useVideoFirstMount,
  useVideoFullscreen,
  useVideoLoading,
  useVideoOverlayIcon,
  useVideoVolume,
} from "../../globalStates";
import VideoControlPopover from "./VideoControls/VideoControlPopover";
import formatDuration from "./utils/formatDuration";
import VideoCaptions, { captionFontSizes } from "./VideoControls/VideoCaptions";

const Video = () => {
  // GLobal States
  const [loading, setLoading] = useVideoLoading();
  const [videoFirstMount, setVideoFirstMount] = useVideoFirstMount();
  const [captionSize] = useCaptionSize();
  const [captionUnder] = useCaptionUnder();
  const setHover = useHover()[1];
  const setVideoOverlayIcon = useVideoOverlayIcon()[1];
  const setPaused = usePaused()[1];
  const setControlTriggered = useVideoControlTriggered()[1];
  const setCurrentTime = useVideoCurrentTime()[1];
  const setCaption = useVideoCaption()[1];
  const [volume, setVolume] = useVideoVolume();
  const [fullScreen, setFullScreen] = useVideoFullscreen();

  const [localVolume, setLocalVolume] = useLocalStorage("volume", 1);
  // States
  const [mounted, setMounted] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [subtitles, setSubtitles] = useState([]);

  // Refs / Variables
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;

  const captionFontSizeIdx = captionFontSizes.findIndex(
    (item) => item.value === captionSize
  );
  const captionContainerHeights = ["2rem", "4rem", "6rem", "8rem", "10rem"];
  const captionContainerHeight = captionContainerHeights[captionFontSizeIdx];

  // Functions
  const triggerControl = (icon?: VideoOverlayIconNames) => {
    if (icon) setVideoOverlayIcon(icon);
    setControlTriggered((prev) => !prev);
  };

  const getSubtitles = async () => {
    const res = await fetch("/api/subtitle", {
      method: "POST",
      body: JSON.stringify({
        subtitle:
          "/course/01-Introduction/01- How Dropshipping Really Works-en.vtt",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setSubtitles(data);
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
    changeVolume: (volume: number) => {
      if (!video) return;
      volume = volume / 100;
      const newVolume = video.volume + volume;
      const volumeOff = newVolume <= 0;
      const sortVolume = newVolume >= 1 ? 1 : volumeOff ? 0 : newVolume;
      setVolume(sortVolume);
    },
    toggleCaptions: () => {
      setCaption((currState) => !currState);
    },
    toggleFullScreen: () => {
      !document?.fullscreenElement
        ? videoContainerRef.current?.requestFullscreen()
        : document.exitFullscreen();
      setFullScreen(!fullScreen);
    },
  };
  const { togglePlay } = sharedFunctions;

  // Event Listeners
  useVideoKeyPress(sharedFunctions);

  useEvent(
    "timeupdate",
    () =>
      video.currentTime && setCurrentTime(formatDuration(video.currentTime)),
    video
  );

  useEvent(
    "ratechange",
    () => {
      if (video)
        triggerControl(
          video.defaultPlaybackRate <= video.playbackRate
            ? "rateIncrease"
            : "rateDrop"
        );
    },
    video
  );

  // Life cycle events
  useEffect(() => {
    getSubtitles();
    setMounted(true);
    setVolume(localVolume);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      setAutoplay(JSON.parse(window.localStorage.getItem("autoplay")));
  }, [mounted]);

  useEffect(() => {
    if (loading && video?.duration) setLoading(!Boolean(video.duration));
  });

  useEffect(() => {
    setLocalVolume(volume);
    if (video) {
      const volumeOff = volume <= 0;
      video.volume = volume >= 1 ? 1 : volumeOff ? 0 : volume;
      video.muted = volumeOff;
      volumeOff ? triggerControl("mute") : triggerControl("volume");
    }
  }, [volume]);

  //   Component
  if (!mounted) return null;

  return (
    <VideoContext.Provider
      value={{
        videoContainerRef,
        videoRef,
        loading,
        volumeState: { volume, setVolume },
        subtitlesState: { subtitles, setSubtitles },
        functions: { triggerControl, ...sharedFunctions },
      }}
    >
      <Flex w="full" h="full" flexDir="column" ref={videoContainerRef}>
        <Flex
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
          {!loading && <VideoControlPopover />}

          <VideoOverlay />

          <video
            ref={videoRef}
            style={{ position: "absolute", width: "100%", height: "100%" }}
            autoPlay={!videoFirstMount && autoplay}
            muted={autoplay}
            onPause={() => setPaused(true)}
            onPlaying={() => setPaused(false)}
            onClick={togglePlay}
          >
            <source
              src="/course/01-Introduction/01- How Dropshipping Really Works.mp4"
              type="video/mp4"
            />
          </video>
        </Flex>
        {captionUnder && (
          <Flex
            height={captionContainerHeight}
            color="white"
            justifyContent="center"
            alignItems="center"
          >
            <VideoCaptions bgColor="none" position="static" />
          </Flex>
        )}
      </Flex>
    </VideoContext.Provider>
  );
};

export default Video;
