import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Fetch from "../helpers/fetch";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { getBlogsByContent, getBlogsByTag, getLatestBlogs } from "../api/blogs";
import { Post } from "../components/blogs/post";
import { SearchInput } from '../components/forms/search-input'
import { useAppContext } from "../context/app";

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  }
}));

export default function Index({ prePosts }) {
  const [posts, setPosts] = useState(prePosts)
  const classes = useStyles();
  const { setIsLoading, setErrorMsg } = useAppContext()
  const searchContent = async (value) => {
    setIsLoading(true)
    try {
      var res = await getBlogsByContent(value)
      setPosts(res)
    } catch (ex) {
      console.log(ex)
      setErrorMsg(ex)
    }
    setIsLoading(false)
  }
  return (
    <main>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Watchu lookinfo?
          </Typography>
          <SearchInput onSubmitCallback={searchContent} />
        </Container>
      </div>

      <Grid container spacing={4}>
        {posts.map(post => <Post key={post.title} post={post} />)}
      </Grid>
    </main>
  );
}

Index.propTypes = {
  posts: PropTypes.array
};

export async function getServerSideProps({ query }) {
  const { tag } = query;
  // Fetch data from external API
  var res = [];
  try {
    if (tag) {
      res = await getBlogsByTag(tag);
      if (!res.length) throw "Not found";
    } else {
      res = await getLatestBlogs();
    }
  } catch {
    res = [];
  }
  // Pass data to the page via props
  return { props: { prePosts: res } };
}
