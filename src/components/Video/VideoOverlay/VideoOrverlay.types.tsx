import { FlexProps, IconProps } from "@chakra-ui/react";
import { MutableRefObject } from "react";

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
  | "volumeLow"
  | "caption"
  | "captionOff";

export type VideoOverlayIconProps = IconProps & {
  name: VideoOverlayIconNames | "";
};

export type VideoOverlayGradientProps = FlexProps & {
  children?: any;
  flip?: boolean;
  opacity?: number | {};
  transition?: string | {};
};

export type VideoOverlayProps = {
  videoRef?: MutableRefObject<HTMLVideoElement>;
  togglePlay: () => any;
};
