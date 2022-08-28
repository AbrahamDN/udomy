import {
  Box,
  BoxProps,
  Container,
  Flex,
  Link,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";

export const Footer = (props: BoxProps) => {
  const [isLargeScreen] = useMediaQuery("(min-width: 61.25em)");

  return (
    <Box as="footer" py="4" bgColor="black" color="white" {...props}>
      <Container maxW="5xl">
        <Flex
          w="full"
          px={!isLargeScreen ? 6 : 0}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box style={{ fontWeight: "bold" }}>
            <Image
              src="/logoIcons/udomy-white.svg"
              alt="Udomy logo"
              width={91}
              height={34}
            />
          </Box>

          <Text as="span" fontSize="xs">
            Made by{" "}
            <Link href="https://twitter.com/Abraham_DN" isExternal>
              AbrahamDN
            </Link>
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};
