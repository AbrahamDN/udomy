import React, { useEffect, useContext, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  MenuItem,
  Portal,
  Switch,
  Text,
  useEventListener,
  VStack,
} from "@chakra-ui/react";
import VideoMenu from "../VideoMenu";
import { SettingIcon } from "../../Icons";
import { useLocalStorage } from "react-use";
import { useVideoAutoplay } from "../../../globalStates";
import VideoContext from "../../../../context/video.context";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import shortcuts from "./shortcuts.schema";

type ShortcutProps = {
  label: string;
  keyValue: string | React.ReactElement;
  plusKeyValue?: string | React.ReactElement;
};

const Shortcut = ({ label, keyValue, plusKeyValue }: ShortcutProps) => (
  <Flex className="shortcut" p="4">
    <Text as="span">{label}</Text>
    <Center as="span" className="key" ml="4">
      {keyValue}
    </Center>
    {plusKeyValue && (
      <>
        <AddIcon mx="2" w="3" h="3" />
        <Center as="span" className="key" ml="0">
          {plusKeyValue}
        </Center>
      </>
    )}
  </Flex>
);

const VideoSettings = () => {
  const { videoContainerRef } = useContext(VideoContext);
  const [autoplay, setAutoplay] = useVideoAutoplay();
  const [LocalAutoplay, setLocalAutoplay] = useLocalStorage("autoplay", false);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const toggleAutoplay = () => setAutoplay((prev) => !prev);

  useEffect(() => {
    setAutoplay(LocalAutoplay);
  }, []);
  useEffect(() => {
    setLocalAutoplay(autoplay);
  }, [autoplay]);

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (isOpen && e.key === "Escape") onClose();
  });

  if (!videoContainerRef) return null;

  return (
    <Flex
      sx={{
        ".menu__button": {
          opacity: 0.8,
          "&:hover, &:focus": { opacity: 1 },
        },
      }}
    >
      <VideoMenu title={<SettingIcon w="6" h="6" />}>
        <MenuItem
          className="row"
          alignItems="flex-end"
          onClick={toggleAutoplay}
        >
          <Text as="span">Autoplay</Text>
          <Switch ml="6" readOnly isChecked={autoplay} pointerEvents="none" />
        </MenuItem>

        <MenuItem className="row" onClick={onOpen}>
          Keyboard shortcuts
        </MenuItem>
      </VideoMenu>

      {isOpen && (
        <Portal containerRef={videoContainerRef}>
          <Flex
            direction="column"
            position="absolute"
            top="0"
            left="0"
            w="full"
            h="full"
            bg="black"
            py="2.5"
            pb="10"
            overflowY="auto"
            color="white"
            alignItems="center"
            zIndex="overlay"
            sx={{
              "& .shortcut": {
                alignItems: "center",
                fontSize: "lg",
                fontWeight: "500",
              },
              "& .key": {
                bg: "darkGrey",
                fontSize: "md",
                fontWeight: "400",
                p: "2",
                minW: "8",
                h: "8",
              },
            }}
          >
            <Flex w="full" px="14" justifyContent="flex-end">
              <Button onClick={onClose} variant="secondary">
                <CloseIcon w="5" h="5" />
              </Button>
            </Flex>

            <Heading>
              <Flex as="span" alignItems="center">
                Keyboard shortcuts{" "}
                <Center as="span" className="key" ml="4">
                  ?
                </Center>
              </Flex>
            </Heading>

            <Flex
              mt="8"
              w="full"
              maxW="container.lg"
              justifyContent="center"
              alignItems={{ base: "center", md: "initial" }}
              flexDir={{ base: "column", md: "row" }}
            >
              <VStack w="50%">
                {shortcuts
                  .slice(0, shortcuts.length / 2 + 1)
                  .map((shortcut, idx) => (
                    <Shortcut key={`shortcut-${idx}`} {...shortcut} />
                  ))}
              </VStack>
              <VStack w="50%" ml={{ base: "0", md: "14" }} mt="8">
                {shortcuts
                  .slice(shortcuts.length / 2 + 1, shortcuts.length)
                  .map((shortcut, idx) => (
                    <Shortcut key={`shortcut-${idx}`} {...shortcut} />
                  ))}
              </VStack>
            </Flex>
          </Flex>
        </Portal>
      )}
    </Flex>
  );
};

export default VideoSettings;
