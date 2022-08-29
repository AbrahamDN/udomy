import React from "react";

type VideoContextProps = {
  videoContainerRef: React.MutableRefObject<HTMLDivElement>;
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  functions: {
    togglePlay?: () => any;
    toggleFullScreen?: () => any;
    toggleTheatre?: () => any;
    toggleMiniPlayer?: () => any;
    toggleMute?: () => any;
    skip?: (value?: any) => any;
    toggleCaptions?: () => any;
  };
};

const VideoContext = React.createContext<VideoContextProps | null>(null);

export default VideoContext;
