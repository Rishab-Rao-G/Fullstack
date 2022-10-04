import { Box, Link, Flex, Button, Heading } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  let body = null;

  if (loading || !data?.me) {
    body = (
      <>
        <NextLink href={"/login"}>
          <Link mr={2} color="#EDFDFD">
            Login
          </Link>
        </NextLink>
        <NextLink href={"/register"}>
          <Link color="#EDFDFD">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button as={Link} mr={2}>
            Create Post
          </Button>
        </NextLink>
        <Box mr={2}> {data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="#086F83" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading> PostEz </Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
