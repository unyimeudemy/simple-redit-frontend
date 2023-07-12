import React, { useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import { Box, Button, Textarea } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Link from "next/link";
import router, { Router, useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import login from "./login";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

const createPost: React.FC<{}> = ({}) => {
  const [{}, createPost] = useCreatePostMutation();
  const router = useRouter();
  //   useIsAuth();
  return (
    <Layout variant="small">
      {/* <Wrapper variant="small"> */}
      <Box mt="30px">
        <Formik
          initialValues={{ title: "", text: "" }}
          onSubmit={async (values) => {
            const { error } = await createPost({ input: values });
            if (!error) {
              router.push("/");
            }
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
                Create post
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      {/* </Wrapper> */}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(createPost);
