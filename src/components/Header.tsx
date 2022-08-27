import { Box, Flex, Stack, Heading, Divider } from "@chakra-ui/react";

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
      <Flex h={16} alignItems={"center"} gap={5}>
        <Box style={{ fontWeight: "bold" }}>Logo</Box>

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
              Title Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Heading>
          </Box>
          <Stack direction={"row"} spacing={7}></Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
