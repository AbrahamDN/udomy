import { Box, Flex, Stack, Heading, Divider } from "@chakra-ui/react";
import Image from "next/image";

const Header = () => {
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
              style={{ fontSize: "1rem", fontWeight: "normal" }}
            >
              Udomy Course environment
            </Heading>
          </Box>
          <Stack direction={"row"} spacing={7}></Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
