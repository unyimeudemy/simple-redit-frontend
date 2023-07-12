import React from "react";
import { NextPage } from "next";
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router, { useRouter } from "next/router";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
// import Link from "next/link";
import NextLink from "next/link";

//
const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [{}, changePassword] = useChangePasswordMutation();
  console.log(router.query);

  return (
    <Wrapper variant="small">
      <Box mt="30px">
        <Formik
          initialValues={{ newPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            const res = await changePassword({
              newPassword: values.newPassword,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            });
            if (res.data?.changePassword.errors) {
              setErrors(toErrorMap(res.data?.changePassword.errors));
              console.log(toErrorMap(res.data?.changePassword.errors));
            } else if (res.data?.changePassword.user) {
              //   redirect to the landing page
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="newPassword"
                label="New password"
                placeholder="new password"
                type="password"
              />
              <Box
                fontFamily={"initial"}
                fontSize={"smaller"}
                color={"blue"}
                mt={"5px"}
              >
                <NextLink href="/forgot-password">
                  {/* <Link href={""}> */}
                  Click here to change password
                  {/* </Link> */}
                </NextLink>
              </Box>
              <Button
                mt="20px"
                bg="teal"
                type="submit"
                isLoading={isSubmitting}
              >
                Change password
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

// how to use getInitialProps
// ChangePassword.getInitialProps = ({ query }) => {
//   return {
//     token: query.token as string,
//   };
// };

export default withUrqlClient(createUrqlClient)(ChangePassword);
