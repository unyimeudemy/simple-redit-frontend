import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [{}, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Box mt="30px">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            await forgotPassword(values);
            setComplete(true);
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Box>Check the provided email address, we sent an email</Box>
            ) : (
              <Form>
                <InputField
                  name="email"
                  label="Email"
                  placeholder="email"
                  type="email"
                />
                <Button
                  mt="20px"
                  bg="teal"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Forgot password
                </Button>
              </Form>
            )
          }
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
// commit should work
