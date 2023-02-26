import AuthModal from "@/components/Modal/Auth/AuthModal";
import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RigthContentProps = {
  user?: User | null;
};

export default function RightContent({ user }: RigthContentProps) {
  return (
    <>
      <AuthModal />
      <Flex justify={"center"} align="center">
        {/* {user ? <Icons /> : <AuthButtons />} */}
        {!user && <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
}
