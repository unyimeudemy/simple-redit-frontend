import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
  useDeletePostMutation,
  usePostsQuery,
  useVoteMutation,
} from "../generated/graphql";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import NextLink from "next/link";
import EditDeleteCreatorPostButtons from "../components/EditDeleteCreatorPostButtons";

const Index = () => {
  const [, vote] = useVoteMutation();
  const [variables, setVariables] = useState({
    limit: 10,
    // cursor: null as string | null,
    cursor: "",
  });
  const [{ data, fetching }] = usePostsQuery({ variables });

  const [, deletePost] = useDeletePostMutation();

  if (!data && !fetching) {
    return <div>404 page not found</div>;
  }

  return (
    <Layout>
      <Box>
        <Flex justifyContent={"space-between"} marginBottom="10px">
          <Heading>Recent Post</Heading>
        </Flex>
        <Stack spacing={8} direction="column">
          {fetching && !data ? (
            <div>loading..</div>
          ) : (
            data?.posts.map((post) =>
              !post ? null : (
                <Flex key={post._id} p={5} shadow="md" borderWidth="1px">
                  <Flex
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    mr="10px"
                    gap={"10px"}
                    alignItems={"center"}
                    justifyItems={"center"}
                  >
                    <IconButton
                      onClick={() => {
                        console.log("upvote status: ", post.voteStatus);
                        if (post.voteStatus == 1) {
                          return null;
                        }
                        vote({
                          postID: post._id,
                          value: 1,
                          userID: 1,
                        });
                      }}
                      colorScheme={post.voteStatus ? "green" : undefined}
                      icon={<ChevronUpIcon />}
                      aria-label="upvote"
                    />
                    <Text>{post.points}</Text>
                    <IconButton
                      colorScheme={post.voteStatus ? "red" : undefined}
                      icon={<ChevronDownIcon />}
                      aria-label="downvote"
                      onClick={async () => {
                        console.log("downvote status: ", post.voteStatus);
                        if (post.voteStatus == -1) {
                          return null;
                        }
                        await vote({
                          postID: post._id,
                          value: -1,
                          userID: 1,
                        });
                      }}
                    />
                  </Flex>
                  <Box>
                    <Flex justifyContent={"space-between"}>
                      <NextLink href={"/post[id]"} as={`/post/${post._id}`}>
                        <Heading fontSize="xl">{post.title}</Heading>
                      </NextLink>
                    </Flex>
                    <Text mt={4}>{post.textSnippet}</Text>
                  </Box>
                  <EditDeleteCreatorPostButtons
                    postID={post._id}
                    username={post.creator?.username}
                  />
                </Flex>
              )
            )
          )}
        </Stack>
        {data ? (
          <Flex justifyContent={"center"}>
            <Button
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor: data.posts[data.posts.length - 1].createdAt as string,
                });
              }}
              isLoading={fetching}
              mt="30px"
            >
              Load more
            </Button>
          </Flex>
        ) : null}
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
