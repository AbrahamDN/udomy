export type useVideoKeyPressProps = {
  togglePlay?: () => any;
  toggleFullScreen?: () => any;
  toggleTheatre?: () => any;
  toggleMiniPlayer?: () => any;
  toggleMute?: () => any;
  skip?: (duration: number) => any;
  toggleCaptions?: () => any;
  changeVolume?: (volume: number) => any;
};
