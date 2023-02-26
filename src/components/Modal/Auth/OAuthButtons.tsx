import { auth } from "../../../firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export default function OAuthButtons() {
  const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth);
  return (
    <Flex width="100%" mb={4} justifyContent="center">
      <Button
        variant="oauth"
        mb={2}
        fontWeight="400"
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={2} />
        Continue with Google
      </Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
}
