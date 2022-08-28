import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

import {
  Box,
  Flex,
  Stack,
  Heading,
  Divider,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import Image from "next/image";

const Header = () => {
  const [autoplay, setAutoplay] = useState(false);
  const [LocalAutoplay, setLocalAutoplay] = useLocalStorage("autoplay", false);

  useEffect(() => {
    setAutoplay(LocalAutoplay);
  }, []);
  useEffect(() => {
    setLocalAutoplay(autoplay);
  }, [autoplay]);

  return (
    <Box
      width="full"
      bg="black"
      px={4}
      borderBottom="1px solid"
      borderColor="whiteAlpha.400"
      color="white"
    >
      <Flex h={14} alignItems={"center"} gap={5}>
        <Box style={{ fontWeight: "bold" }}>
          <Image
            src="/logoIcons/udomy-white.svg"
            alt="Udomy logo"
            width={91}
            height={34}
          />
        </Box>

        <Divider maxH="6" orientation="vertical" borderColor="whiteAlpha.400" />

        <Flex
          width="full"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Heading
              as="h1"
              noOfLines={1}
              fontWeight="normal"
              fontSize={{ base: "sm", xxl: "md" }}
            >
              Udomy Course environment
            </Heading>
          </Box>
          <Stack direction={"row"} spacing={7}>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="autoplay" mb="0">
                Autoplay
              </FormLabel>
              <Switch
                id="autoplay"
                isChecked={autoplay}
                onChange={() => setAutoplay(!autoplay)}
              />
            </FormControl>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
