import React, { useContext, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { MenuItem } from "@chakra-ui/react";
import { VideoRateItemProps } from "./VideoControls.types";
import { useVideoRate } from "../../../globalStates";
import VideoContext from "../../../../context/video.context";

const VideoRateItem = ({ rate, ...otherProps }: VideoRateItemProps) => {
  const video = useContext(VideoContext).videoRef?.current;
  const [localSpeedRate, setLocalSpeedRate] = useLocalStorage("rate", 1);
  const [speedRate, setSpeedRate] = useVideoRate();

  useEffect(() => setSpeedRate(localSpeedRate), []);
  useEffect(() => {
    setLocalSpeedRate(speedRate);
    if (video) {
      video.playbackRate = speedRate;
    }
  }, [speedRate]);

  return (
    <MenuItem
      onClick={() => setSpeedRate(rate)}
      closeOnSelect={false}
      fontWeight="bold"
      px="8"
      pr="10"
      py="2"
      _hover={{ bgColor: "whiteAlpha.300" }}
      _focus={{ bgColor: "whiteAlpha.300" }}
      sx={{
        '&[data-selected="true"]::after': {
          content: `""`,
          w: "2",
          h: "2",
          bgColor: "brand",
          borderRadius: "full",
          position: "absolute",
          right: "4",
        },
      }}
      data-selected={rate === speedRate}
      {...otherProps}
    >
      {rate}x
    </MenuItem>
  );
};

export default VideoRateItem;
