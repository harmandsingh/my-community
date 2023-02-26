import useCommunityData from "../../hooks/useCommunityData";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";
import { Community } from "../../atoms/communitiesAtom";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  /**
   * !!!Don't pass communityData boolean until the end
   * It's a small optimization!!!
   */
  const { communityStateValue, onJoinOrLeaveCommunity, loading, error } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="red.400" />
      <Flex justifyContent="center" bg="white" height="50%">
        <Flex width="95%" maxWidth="860px">
          {communityData.imageURL ? (
            <Image
              src={communityStateValue.currentCommunity?.imageURL}
              boxSize="68px"
              position="relative"
              color="brand.100"
              border="4px solid white"
              borderRadius="full"
              top={-3}
              alt="Community Image"
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="brand.100"
              border="4px solid white"
              borderRadius="full"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={700} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={500} fontSize="10pt" color="gray.400">
                mc/{communityData.id}
              </Text>
            </Flex>
            <Flex>
              <Button
                variant={isJoined ? "outline" : "solid"}
                height="34px"
                pr={6}
                pl={6}
                onClick={() => {
                  onJoinOrLeaveCommunity(communityData, isJoined);
                }}
                isLoading={loading}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
