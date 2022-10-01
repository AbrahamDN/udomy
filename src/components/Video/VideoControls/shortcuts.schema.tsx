import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
} from "@chakra-ui/icons";

const shortcuts = [
  {
    label: "Play / pause",
    keyValue: "K / Space",
  },
  {
    label: "Speed slower",
    keyValue: "Shift",
    plusKeyValue: <ArrowBackIcon w="5" h="5" />,
  },
  {
    label: "Speed faster",
    keyValue: "Shift",
    plusKeyValue: <ArrowForwardIcon w="5" h="5" />,
  },
  {
    label: "Fullscreen",
    keyValue: "F",
  },
  {
    label: "Exit fullscreen",
    keyValue: "ESC",
  },
  // {
  //     label: 'Add note',
  //     keyValue: 'B'
  // },
  {
    label: "Toggle captions",
    keyValue: "C",
  },
  {
    label: "Go back 5s",
    keyValue: <ArrowBackIcon w="5" h="5" />,
  },
  {
    label: "Go forward 5s",
    keyValue: <ArrowForwardIcon w="5" h="5" />,
  },
  {
    label: "Volume up",
    keyValue: <ArrowUpIcon w="5" h="5" />,
  },
  {
    label: "Volume down",
    keyValue: <ArrowDownIcon w="5" h="5" />,
  },
  {
    label: "Mute",
    keyValue: "M",
  },
  // {
  //     label: 'Content information',
  //     keyValue: 'I'
  // },
];

export default shortcuts;
