import { Formik, Form } from "formik";
import React from "react";
import { Box, Button } from "@chakra-ui/core";
import { Layout } from "../../../components/Layout";
import { InputField } from "../../../components/InputField";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";
import { useUpdatePostMutation } from "../../../generated/graphql";
import { useGetIntId } from "../../../utils/useGetIntId";
import { useRouter } from "next/router";
import { withApollo } from "../../../utils/withApollo";

const EditPost = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const { data, loading } = useGetPostFromUrl();
  const [updatePost] = useUpdatePostMutation();
  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
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
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          console.log(values);
          await updatePost({ variables: { id: intId, ...values } });
          router.back();
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
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(EditPost);
