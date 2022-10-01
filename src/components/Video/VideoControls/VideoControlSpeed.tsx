import React, { useContext, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import VideoMenu from "../VideoMenu";
import { useVideoRate } from "../../../globalStates";
import { useLocalStorage } from "react-use";
import VideoContext from "../../../../context/video.context";
import VideoRateButton from "./VideoRateButton";

const VideoControlSpeed = () => {
  const video = useContext(VideoContext).videoRef?.current;
  const [localSpeedRate, setLocalSpeedRate] = useLocalStorage("rate", 1);
  const [speedRate, setSpeedRate] = useVideoRate();

  const changeSpeedRate = (rate: number) => setSpeedRate(rate);

  const rates = [
    { title: "0.5x", value: "0.5 ", onClick: () => changeSpeedRate(0.5) },
    { title: "0.75x", value: "0.75", onClick: () => changeSpeedRate(0.75) },
    { title: "1x", value: "1", onClick: () => changeSpeedRate(1) },
    { title: "1.25x", value: "1.25", onClick: () => changeSpeedRate(1.25) },
    { title: "1.75x", value: "1.75", onClick: () => changeSpeedRate(1.75) },
    { title: "2x", value: "2", onClick: () => changeSpeedRate(2) },
  ];

  const defaultItem = speedRate.toString();

  useEffect(() => setSpeedRate(localSpeedRate), []);
  useEffect(() => {
    setLocalSpeedRate(speedRate);
    if (video) {
      video.playbackRate = speedRate;
    }
  }, [speedRate]);

  return (
    <Flex
      minW="14"
      sx={{ ".chakra-menu__menuitem-option": { fontWeight: 700 } }}
    >
      <VideoMenu
        title={`${speedRate}x`}
        label="Speed rate"
        menuButtonAs={VideoRateButton}
        menuItems={rates}
        defaultItem={defaultItem}
      />
    </Flex>
  );
};

export default VideoControlSpeed;
