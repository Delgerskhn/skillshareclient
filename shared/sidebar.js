import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import { useBlogContext } from '../context/blog';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Box, Button } from '@material-ui/core';
import { likeBlog as sendLikeRequest } from '../api/blogs'

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { archives, description, social, title } = props;
  const { blog } = useBlogContext()
  const [likes, setLikes] = useState(0)

  const likeBlog = () => {
    setLikes(likes + 1)
    sendLikeRequest(blog.pk)
  }

  useEffect(() => {
    setLikes(blog.likes)
  }, [blog])
  return (
    <Grid item xs={12} md={4}>
      <Box m={3}>
        <Button onClick={likeBlog}>
          <FavoriteIcon fontSize="large" />
          <Typography variant="h4">
            {likes}
          </Typography>
        </Button>
      </Box>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          Tags
        </Typography>
        {blog?.tags?.map(r =>
          <Link href={"/?tag=" + r?.pk}>
            <Chip
              key={r.pk}
              label={r.name}
              clickable
              className={classes.chip}
              color="primary"
            />
          </Link>
        )}
      </Paper>

    </Grid>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};