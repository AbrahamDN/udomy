import React, { useContext, useRef, useState } from "react";
import { useEvent } from "react-use";
import { Box, Flex, useEventListener } from "@chakra-ui/react";
import VideoContext from "../../../../context/video.context";
import formatDuration from "../utils/formatDuration";
import { useIsScrubbing } from "../../../globalStates";

const VideoTimeline = () => {
  const { videoRef, videoContainerRef } = useContext(VideoContext);
  const [isScrubbing, setIsScrubbing] = useIsScrubbing();
  const [previewPosition, setPreviewPosition] = useState(0);
  const [progressPosition, setProgressPosition] = useState(0);
  const [previewDurationPosition, setPreviewDurationPosition] = useState(0);
  const [previewDuration, setPreviewDuration] = useState("00:00");
  const [onHover, setOnHover] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);

  const video = videoRef?.current;
  const videoContainer = videoContainerRef?.current;

  const timelineContainer = timelineRef?.current;
  const rect = timelineContainer?.getBoundingClientRect();

  const getDuration = (duration: number) =>
    duration ? formatDuration(duration) : "00:00";

  const getPercent = (event: MouseEvent) =>
    (rect
      ? Math.min(Math.max(0, event.x - rect.x), rect.width) / rect.width
      : 0) * 100;

  const handleTimeUpdate = () => {
    if (!video) return;
    const percent = (video.currentTime / video.duration) * 100;
    const bufferEnd = video.buffered.end(0) || 0;
    const loaded = (bufferEnd / video.duration) * 100;

    setPreviewPosition(loaded);
    if (!isScrubbing) setProgressPosition(percent);
  };

  const handleTimelineUpdate = (event: MouseEvent) => {
    if (!video) return;
    const percent = getPercent(event);
    const currentTime = (percent / 100) * video.duration;
    const previewTime = getDuration(currentTime);

    setPreviewDuration(previewTime);
    setPreviewDurationPosition(percent);

    if (isScrubbing) {
      event.preventDefault();
      setProgressPosition(percent);
      video.currentTime = currentTime;
    }
  };

  const handleScrubbing = (event: MouseEvent) => {
    if (!video) return;
    const percent = getPercent(event);
    const currentTime = (percent / 100) * video?.duration;
    const mouseDown = (event.buttons & 1) === 1;
    setIsScrubbing(mouseDown);

    video.currentTime = currentTime;
    if (!video?.paused) video?.play();

    return handleTimelineUpdate(event);
  };

  const handleScrubbingOutside = (event: MouseEvent) => {
    if (!isScrubbing) return;
    return handleTimelineUpdate(event);
  };

  useEvent("timeupdate", handleTimeUpdate, video);
  useEvent("mousemove", handleTimelineUpdate, timelineContainer);
  useEvent("mousemove", handleScrubbingOutside, videoContainer);
  useEvent("mousedown", handleScrubbing, timelineContainer);
  useEvent("mouseenter", () => setOnHover(true), timelineContainer);
  useEvent("mouseleave", () => setOnHover(false), timelineContainer);
  useEventListener("mouseup", () => setIsScrubbing(false));

  return (
    <Flex
      ref={timelineRef}
      w="full"
      h={onHover || isScrubbing ? "3" : "1.5"}
      bgColor="whiteAlpha.800"
      position="relative"
      transition="height 150ms ease-in-out"
      cursor="pointer"
    >
      <Box
        w={`${previewPosition}%`}
        bg="cloudGrey"
        position="absolute"
        top="0"
        left="0"
        bottom="0"
        transition="width 300ms ease-in-out"
      />
      <Box
        w={`${progressPosition}%`}
        bg="brand"
        position="absolute"
        top="0"
        left="0"
        bottom="0"
      />
      {(onHover || isScrubbing) && (
        <Box
          position="absolute"
          bg="black"
          border="1px solid"
          borderColor="whiteAlpha.400"
          px="2"
          py="1"
          bottom="100%"
          left={`${previewDurationPosition}%`}
          mb="3"
          transform="translateX(-50%)"
          transition="width 300ms ease-in-out"
        >
          {previewDuration}
        </Box>
      )}
    </Flex>
  );
};

export default VideoTimeline;
