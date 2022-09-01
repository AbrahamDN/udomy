import React from "react";
import { VideoOverlayIconNames } from "../src/components/Video/VideoOverlay/VideoOrverlay.types";

type VideoContextProps = {
  videoContainerRef: React.MutableRefObject<HTMLDivElement>;
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  loading: boolean;
  volumeState: {
    volume: number;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
  };
  functions: {
    skip?: (value?: any) => any;
    toggleCaptions?: () => any;
    toggleFullScreen?: () => any;
    toggleMiniPlayer?: () => any;
    toggleMute?: () => any;
    togglePlay?: () => any;
    toggleTheatre?: () => any;
    triggerControl?: (icon?: VideoOverlayIconNames) => any;
  };
};

const VideoContext = React.createContext<VideoContextProps | null>(null);

export default VideoContext;
