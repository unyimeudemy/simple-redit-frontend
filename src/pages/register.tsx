import React from "react";
import { Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [{}, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Box mt="30px">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const res = await register(values);
            if (res.data?.register.errors) {
              setErrors(toErrorMap(res.data?.register.errors));
              console.log(toErrorMap(res.data?.register.errors));
            } else if (res.data?.register.user) {
              // redirect to the landing page
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                label="username"
                placeholder="username"
                type="text"
              />
              <Box mt="20px">
                <InputField
                  name="email"
                  label="email"
                  placeholder="email"
                  type="email"
                />
              </Box>
              <Box mt="20px">
                <InputField
                  name="password"
                  label="password"
                  placeholder="password"
                  type="password"
                />
              </Box>
              <Button
                mt="20px"
                bg="teal"
                type="submit"
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);

//////////////////////////////////////////////////////////
