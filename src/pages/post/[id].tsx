import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { usePostQuery } from "../../generated/graphql";
import { Box, Heading } from "@chakra-ui/layout";
import { Layout } from "../../components/Layout";
import EditDeleteCreatorPostButtons from "../../components/EditDeleteCreatorPostButtons";
import { Flex } from "@chakra-ui/react";

const Post = ({}) => {
  const router = useRouter();
  console.log("", router.query);
  const intId =
    typeof router.query.id == "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = usePostQuery({
    variables: {
      id: intId,
    },
  });
  console.log(data);

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
        <EditDeleteCreatorPostButtons
          postID={data.post._id}
          username={data.post.creator?.username}
        />
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
