import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Box, Button, Flex, Link } from "@chakra-ui/core";
import { Wrapper } from "../../components/Wrapper";
import { InputField } from "../../components/InputField";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";
import { NextPage } from "next";
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from "../../generated/graphql";
import NextLink from "next/link";
import { withApollo } from "../../utils/withApollo";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            variables: {
              newPassword: values.newPassword,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.changePassword.user,
                },
              });
              cache.evict({ fieldName: "posts:{}" });
            },
          });

          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="newPassword"
                placeholder="New Password"
                label="Password"
                type="password"
                textarea={false}
              />
              {tokenError ? (
                <Flex>
                  <Box mr={2} color="red">
                    {tokenError}
                  </Box>
                  <NextLink href="/forgot-password">
                    <Link> Create a new Password </Link>
                  </NextLink>
                </Flex>
              ) : null}
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(ChangePassword);
