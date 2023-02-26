import { auth, firestore } from "@/firebase/clientApp";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
  Box,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsEyeFill, BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user, setUser] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;

    setCommunityName(event.target.value);
    // calculate how many characters are left
    setCharsRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    //validate the community name
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );
      return;
    }

    //create the community document in firebase if valid
    setLoading(true);
    try {
      const communityDocRef = doc(firestore, "communities", communityName);

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, mc/${communityName} already exists!`);
        }

        //create community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        //create communitySnippet on user
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            flexDirection="column"
            fontSize={16}
            padding={3}
          >
            Create a MyCommunity
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              flexDirection="column"
              padding={"10px 0px"}
            >
              <Text fontWeight={600} fontSize={14}>
                Name
              </Text>
              <Text
                position={"relative"}
                top="27px"
                left="10px"
                color={"gray.400"}
              >
                mc/
              </Text>
              <Input
                position={"relative"}
                value={communityName}
                size="sm"
                pl="40px"
                onChange={handleChange}
              />
              <Text
                color={charsRemaining === 0 ? "red" : "gray.500"}
                fontSize="10pt"
                ml={2}
                mt={1}
              >
                {charsRemaining} Characters remaining
              </Text>
              <Text fontSize={"9pt"} pt={1} color="red">
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={14} mb={1}>
                  Community Type
                </Text>
                <Stack spacing={1}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={BsFillPersonFill} color="gray.600" mr={2} />
                      <Text fontSize={12} mr={2}>
                        Public
                      </Text>
                      <Text fontSize={10} color="gray.500" pt={0.5}>
                        Anyone can view, post, and comment in this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={BsFillEyeFill} color="gray.600" mr={2} />
                      <Text fontSize={12} mr={2}>
                        Restricted
                      </Text>
                      <Text fontSize={10} color="gray.500" pt={0.5}>
                        Anyone can view but only approved users can post in this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={HiLockClosed} color="gray.600" mr={2} />
                      <Text fontSize={12} mr={2}>
                        Private
                      </Text>
                      <Text fontSize={10} color="gray.500" pt={0.5}>
                        Only approved users can view and post in this community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.200" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button height="30px" onClick={handleCreateCommunity}>
              Create MyCommunity
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
