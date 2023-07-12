import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router, { useRouter } from "next/router";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import createPost from "../../create-post";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";

export const UpdatePost = ({}) => {
  const router = useRouter();
  const [, updatePost] = useUpdatePostMutation();
  const intId =
    typeof router.query.id == "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = usePostQuery({
    variables: {
      id: intId,
    },
  });
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
        <Box>Could not find a post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Box mt="30px">
        <Formik
          initialValues={{ title: data.post.title, text: data.post.text }}
          onSubmit={async (values) => {
            await updatePost({ id: intId, ...values });
            router.back();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="title"
                label="Title"
                placeholder="title"
                type="text"
              />
              <Box mt="20px">
                <InputField
                  textarea
                  name="text"
                  label="Text"
                  placeholder="text..."
                  type="text"
                />
              </Box>
              <Button
                mt="20px"
                bg="teal"
                type="submit"
                isLoading={isSubmitting}
              >
                Update post
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(UpdatePost);
