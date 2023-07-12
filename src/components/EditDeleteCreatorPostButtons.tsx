import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Box, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useDeletePostMutation } from "../generated/graphql";

interface EditDeleteCreatorPostButtonsProps {
  postID: number;
  username: string;
}

export const EditDeleteCreatorPostButtons: React.FC<
  EditDeleteCreatorPostButtonsProps
> = ({ postID, username }) => {
  const [, deletePost] = useDeletePostMutation();

  return (
    <Flex
      flexDirection={"column"}
      gap={"10px"}
      alignItems={"center"}
      ml={"auto"}
    >
      <Text fontSize={"smaller"}>{username}</Text>

      <Box>
        <NextLink href={"/post/edit/[id]"} as={`/post/edit/${postID}`}>
          <IconButton
            //   as={Link}
            aria-label="edit-button"
            marginRight={"10px"}
            icon={<EditIcon />}
          />
        </NextLink>
        <IconButton
          aria-label="delete-button"
          icon={<DeleteIcon />}
          onClick={() => {
            deletePost({ id: postID });
          }}
        />
      </Box>
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(EditDeleteCreatorPostButtons);
