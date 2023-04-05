import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  Stack,
  Image,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BiPlug, BiPlus, BiSearch } from "react-icons/bi";
import AddButtonModal from "./AddButtonModal";
import LogoutModaal from "./LogoutModal";
import { Navigate } from "react-router-dom";

export default function Header() {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const [userState, setUserstate] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:4000/profile", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data != null) {
            console.log(response.data.uname);
            // setUserpic(response.data.upic);
            setUserstate(true);
          }
        });
    }
    fetchData();
  }, []);

  function logIn() {
    window.location.href = "/auth";
  }

  function HomeRoute() {
    window.location.href = "/pagefeed";
  }
  function EventsRoute() {
    window.location.href = "/events";
  }
  // function GroupsRoute() {
  //   window.location.href = "/events";
  // }
  function AboutUsRoute() {
    window.location.href = "/events";
  }

  return (
    <Box
      w={"100%"}
      bgColor={"white"}
      position={"fixed"}
      as="nav"
      bg="bg-surface"
      boxShadow="sm"
      py={{ base: "5", lg: "4" }}
      paddingStart={10}
      paddingEnd={10}
    >
      <Stack direction={["column", "row"]} spacing="50px">
        <Image
          m={"auto"}
          src="./logonameblack.png"
          maxH={"8%"}
          maxW={100}
          alt="logo_image"
          onClick={HomeRoute}
        ></Image>
        {isDesktop ? (
          <Flex justify="space-between" flex="1">
            <ButtonGroup variant="link" spacing="8">
              {/* {["Home", "Events", "Groups", "AboutUs"].map((item) => ( */}
              <Button
                key={"Home"}
                color="gray.800"
                _hover={{ color: "green" }}
                onClick={HomeRoute}
              >
                Home
              </Button>
              <Button
                key={"Events"}
                color="gray.800"
                _hover={{ color: "green" }}
                onClick={EventsRoute}
              >
                Events
              </Button>
              <Button
                key={"Groups"}
                color="gray.800"
                _hover={{ color: "green" }}
                onClick={HomeRoute}
              >
                Groups
              </Button>
              <Button
                key={"AboutUs"}
                color="gray.800"
                _hover={{ color: "green" }}
                onClick={AboutUsRoute}
              >
                AboutUs
              </Button>
            </ButtonGroup>
            {userState ? (
              <HStack>
                <InputGroup>
                  <Input
                    variant="filled"
                    focusBorderColor="green.300"
                    placeholder="Search"
                    rounded={"full"}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={<BiSearch />}
                      rounded={"full"}
                      bgColor={"green.500"}
                      color={"white"}
                    />
                  </InputRightElement>
                </InputGroup>
                <AddButtonModal />
                <LogoutModaal />
              </HStack>
            ) : (
              <HStack spacing="3">
                <Button colorScheme="blue" onClick={logIn}>
                  SignUp / SignIn
                </Button>
              </HStack>
            )}
          </Flex>
        ) : (
          <IconButton variant="ghost" aria-label="Open Menu" />
        )}
      </Stack>
    </Box>
  );
}
