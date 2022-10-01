import React, { useContext, useState } from "react";
import {
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import VideoControlButton from "./VideoControlButton";
import { VolumeHighIcon, VolumeOffIcon } from "../../Icons";
import VideoContext from "../../../../context/video.context";

const VideoControlVolume = () => {
  const {
    videoRef,
    volumeState,
    functions: { toggleMute },
  } = useContext(VideoContext);

  const volume = volumeState?.volume;
  const setVolume = volumeState?.setVolume;

  const [volumeHover, setVolumeHover] = useState(false);

  const video = videoRef.current;
  const videoMuted = video?.muted;

  const handleVolumeChange = (val: number) => {
    if (setVolume) setVolume(val / 100);
  };

  const handleSliderThumbFocus = (bool: boolean) => {
    // setSliderFocus(bool);
    setVolumeHover(bool);
  };

  return (
    <Flex
      justifyContent="center"
      onMouseEnter={() => setVolumeHover(true)}
      onMouseLeave={() => setVolumeHover(false)}
    >
      <Flex position="absolute" bottom="1" p="6" px={volumeHover ? "6" : "0"}>
        <Slider
          className="volume-slider"
          value={!videoMuted ? volume * 100 : 0}
          max={100}
          min={0}
          orientation="vertical"
          overflow="hidden"
          h={volumeHover ? "32" : "0"}
          w="8"
          p="0"
          mb="12"
          transition="height 250ms ease-in-out"
          focusThumbOnChange={false}
          onChange={handleVolumeChange}
        >
          <SliderTrack w="6" h="full" borderRadius="0" left="-10px">
            <SliderFilledTrack bgColor="brand" />
          </SliderTrack>
          <SliderThumb
            onFocusCapture={(e) => e.preventDefault()}
            borderRadius="0"
            w="6"
            h="0"
            bgColor="brand"
            boxShadow="none"
            _focus={{ transform: "translateX(-50%)", boxShadow: "none" }}
            onFocus={() => handleSliderThumbFocus(true)}
            onBlur={() => handleSliderThumbFocus(false)}
          />
        </Slider>
      </Flex>

      <VideoControlButton onClick={toggleMute} borderRadius="0">
        {videoMuted ? (
          <VolumeOffIcon w="6" h="6" />
        ) : (
          <VolumeHighIcon w="6" h="6" />
        )}
      </VideoControlButton>
    </Flex>
  );
};

export default VideoControlVolume;
