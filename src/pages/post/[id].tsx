import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useDeletePostMutation, usePostQuery } from "../../generated/graphql";
import { Box, Heading } from "@chakra-ui/layout";
import { Layout } from "../../components/Layout";
// import EditDeleteCreatorPostButtons from "../../components/EditDeleteCreatorPostButtons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

const Post = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id == "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = usePostQuery({
    variables: {
      id: intId,
    },
  });

  const [, deletePost] = useDeletePostMutation();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find the post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading>{data?.post?.title}</Heading>
      {data?.post?.text}
      <Flex justifyContent={"left"}>
        {/* <EditDeleteCreatorPostButtons
          postID={data.post._id}
          username={data.post.creator?.username}
        /> */}
        <Flex
          flexDirection={"column"}
          gap={"10px"}
          alignItems={"center"}
          ml={"auto"}
        >
          <Text fontSize={"smaller"}>{data.post.creator?.username}</Text>

          <Box>
            <NextLink
              href={"/post/edit/[id]"}
              as={`/post/edit/${data?.post._id}`}
            >
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
                deletePost({ id: data?.post?._id as number });
              }}
            />
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
