import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/core";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          console.log(values);
          const { errors } = await createPost({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "posts:{}" });
            },
          });
          if (!errors) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="title"
                placeholder="Title"
                label="Title"
                textarea={false}
              />
            </Box>
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="Text...."
                label="Text"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePost);
