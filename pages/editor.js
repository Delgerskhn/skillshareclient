import React, { useEffect, useState } from "react";
import { withAuth } from "../shared/with-auth";
import Grid from "@material-ui/core/Grid";
import BlogEditor from "../components/editor/blog-editor";
import { TagSearch } from "../components/forms/tag-search";
import { useEditorContext } from "../context/editor";
import { AutoSaveAlert } from "../components/alert";
import PublishFloater from "../components/floaters/publish-floater";
import PublishModal from "../components/modals/publish-modal";

function Editor({ blogPk }) {
  const {
    autoSaveAlertVisible,
    setVisible,
    blog,
    onNonInteractiveEditor,
    onTagSelect,
    fetchBlog
  } = useEditorContext();
  useEffect(() => {
    fetchBlog(blogPk);
  }, []);
  return (
    <main>
      <AutoSaveAlert
        isVisible={autoSaveAlertVisible}
        setIsVisible={setVisible}
      />
      <PublishModal />
      <Grid container spacing={5} p={4}>
        <Grid item xs={12}>
          <BlogEditor
            content={blog.content}
            readOnly={false}
            onNonInteractiveEditor={onNonInteractiveEditor}
          />
        </Grid>
      </Grid>
    </main>
  );
}

export async function getServerSideProps({ query }) {
  let { pk } = query;
  if (pk === undefined) pk = null;
  return {
    props: {
      blogPk: pk
    }
  };
}

export default withAuth(Editor);
