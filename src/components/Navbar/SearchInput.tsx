import { SearchIcon } from "@chakra-ui/icons";
import {
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { User } from "firebase/auth";

type SearchInputProps = {
  user?: User | null;
};

export default function SearchInput({ user }: SearchInputProps) {
  return (
    <Flex
      flexGrow={1}
      maxWidth={user ? "auto" : "600px"}
      mr={2}
      ml={4}
      align="center"
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="blue.700" mb={-1} />}
        />
        <Input
          placeholder="Search for communities"
          fontSize={"12pt"}
          _placeholder={{ color: "blue.700" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.700",
          }}
          _focus={{
            outline: "none",
            border: "2px solid",
            borderColor: "blue.300",
          }}
          height="45px"
          bg="gray.100"
        />
      </InputGroup>
    </Flex>
  );
}
