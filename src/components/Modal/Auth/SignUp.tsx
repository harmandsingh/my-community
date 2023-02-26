import { authModalState } from "@/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

type SignUpProps = {};

export default function SignUp({}: SignUpProps) {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  //Firebase logic
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    // password matches
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //update form state
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type={"email"}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.600" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "gray.600" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "gray.600",
        }}
        bg="gray.50"
        onChange={onChange}
      />
      <Input
        required
        name="password"
        placeholder="password"
        type={"password"}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.600" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "gray.600" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "gray.600",
        }}
        bg="gray.50"
        onChange={onChange}
      />
      <Input
        required
        name="confirmPassword"
        placeholder="confirm password"
        type={"password"}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.600" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "gray.600" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "gray.600",
        }}
        bg="gray.50"
        onChange={onChange}
      />
      <Text textAlign="center" fontSize="10pt" color="red">
        {error ||
          FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        type="submit"
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a MyCommunity member?</Text>
        <Text
          color="brand.100"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          Log In
        </Text>
      </Flex>
    </form>
  );
}
