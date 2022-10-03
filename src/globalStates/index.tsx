import { createGlobalState } from "react-use";
import { VideoOverlayIconNames } from "../components/Video/VideoOverlay/VideoOrverlay.types";

type CourseData = {
  children: any[];
};

type ActiveFile = {
  path: string;
  name: string;
  extension: string;
  type: string;
  custom: {
    id: string;
    rawPath: string;
    duration: number;
  };
};

export const //
  useCourseData = createGlobalState<CourseData>(),
  useActiveFile = createGlobalState<ActiveFile>({
    path: "course/README.md",
    name: "README",
    extension: ".md",
    type: "file",
    custom: {
      id: "BeDgPcxqHXDl75VMOQzRixjElDs=",
      rawPath:
        "C:/Users/x5x5a/Desktop/dev/nextjs/with-chakra-ui-app/public/course/README.md",
      duration: 60,
    },
  }),
  // Sidebar
  useSidebar = createGlobalState(false),
  // Video
  useHover = createGlobalState(false),
  usePaused = createGlobalState(false),
  useVideoControlTriggered = createGlobalState(false),
  useVideoCurrentTime = createGlobalState(""),
  useVideoFirstMount = createGlobalState(false),
  useVideoHoverActive = createGlobalState(true),
  useVideoLoading = createGlobalState(true),
  useVideoOverlayIcon = createGlobalState<VideoOverlayIconNames>(),
  useVideoRate = createGlobalState(1),
  useVideoVolume = createGlobalState(1),
  useVideoSubtitles = createGlobalState([]),
  useVideoCaption = createGlobalState(false),
  useCaptionSize = createGlobalState("md"),
  useCaptionOpacity = createGlobalState("800"),
  useCaptionUnder = createGlobalState(false),
  useVideoAutoplay = createGlobalState(false),
  useVideoFullscreen = createGlobalState(false),
  useIsScrubbing = createGlobalState(false);
