import {
  FullscreenExitIcon,
  FullscreenIcon,
  MinusIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  RewindIcon,
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeOffIcon,
} from "../../Icons";
import { VideoOverlayIconProps } from "./VideoOrverlay.types";

const VideoOverlayIcon = ({ name, ...otherProps }: VideoOverlayIconProps) => {
  switch (name) {
    case "play":
      return <PlayIcon w="20" h="20" {...otherProps} />;
    case "pause":
      return <PauseIcon w="16" h="16" {...otherProps} />;
    case "backSkip":
      return <RewindIcon w="14" h="14" {...otherProps} />;
    case "forwardSkip":
      return (
        <RewindIcon w="14" h="14" transform="scaleX(-1)" {...otherProps} />
      );
    case "rateDrop":
      return <MinusIcon w="16" h="16" {...otherProps} />;
    case "rateIncrease":
      return <PlusIcon w="16" h="16" {...otherProps} />;
    case "mute":
      return <VolumeOffIcon w="16" h="16" {...otherProps} />;
    case "volumeLow":
      return <VolumeLowIcon w="16" h="16" {...otherProps} />;
    case "volume":
      return <VolumeHighIcon w="16" h="16" {...otherProps} />;
    case "fullscreenExit":
      return <FullscreenExitIcon w="16" h="16" {...otherProps} />;
    case "fullscreen":
      return <FullscreenIcon w="16" h="16" {...otherProps} />;
    default:
      return;
  }
};

export default VideoOverlayIcon;
