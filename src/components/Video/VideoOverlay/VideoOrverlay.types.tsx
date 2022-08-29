import { IconProps } from "@chakra-ui/react";

export type VideoOverlayIconNames =
  | "backSkip"
  | "forwardSkip"
  | "fullscreen"
  | "fullscreenExit"
  | "mute"
  | "pause"
  | "play"
  | "rateDrop"
  | "rateIncrease"
  | "volume"
  | "volumeLow";

export type VideoOverlayIconProps = IconProps & {
  name: VideoOverlayIconNames | "";
};
