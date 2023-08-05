import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Link from "next/link";

export const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [{}, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Box mt="30px">
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const res = await login(values);
            if (res.data?.login.errors) {
              setErrors(toErrorMap(res.data?.login.errors));
            } else if (res.data?.login.user) {
              // redirect to the landing page
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="usernameOrEmail"
                label="username or password"
                placeholder="username or email"
                type="text"
              />
              <Box mt="20px">
                <InputField
                  name="password"
                  label="password"
                  placeholder="password"
                  type="password"
                />
              </Box>
              <Box
                mt={"5px"}
                fontFamily={"initial"}
                fontSize={"smaller"}
                color={"blue"}
              >
                <Link href={"/forgot-password"}>
                  Click here to change password
                </Link>
              </Box>
              <Button
                mt="20px"
                bg="teal"
                type="submit"
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);

//////////////////////////////////////////////////////////
