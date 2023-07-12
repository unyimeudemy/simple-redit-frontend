import { Box, Button, Flex, Heading, background } from "@chakra-ui/react";
import Link from "next/link";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const box = {
    width: "100%",
    height: "70px",
    background: "#727787",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
  };

  const left = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
    width: "200px",
    height: "60px",
    background: "#A6ABBD",
    borderRadius: "7px",
  };

  const right = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "7px",
    fontWeight: "700",
    color: "#E4F0FF",
  };

  const LoggedIn = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  };

  const button = {
    background: "#A6ABBD",
  };

  const router = useRouter();

  const [{ data, fetching: meQueryFetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  const handleLogOut = async () => {
    const res = await logout({});
    router.reload();
  };

  return (
    <Box sx={box} position="sticky" top="0px" zIndex={1}>
      <Box sx={left}>
        <NextLink href={"/"}>
          <Heading>Reddit</Heading>
        </NextLink>
      </Box>

      {data?.me ? (
        <Box sx={LoggedIn}>
          <Button>
            <Link href="/create-post">Create a post</Link>
          </Button>
          {data?.me?.username}
          <Button sx={button} onClick={handleLogOut} isLoading={logoutFetching}>
            Logout
          </Button>
        </Box>
      ) : (
        <Box sx={right}>
          <Button>
            <Link href="/create-post">Create a post</Link>
          </Button>
          <NextLink href={"/login"}>Login</NextLink>
          <NextLink href={"/register"}>Register</NextLink>
        </Box>
      )}
    </Box>
  );
};
