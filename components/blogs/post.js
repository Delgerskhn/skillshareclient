import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import { constBlog } from '../../shared/constants';
import PostController from './post-controller';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
    height: "100%"
  },
});

export function Post(props) {
  const classes = useStyles();
  const { post, hasController } = props;
  const getJumpUrl = () => {
    if (post?.blogStatusPk === constBlog.State.Published)
      return '/blog?pk=' + post.pk
    return '/editor?pk=' + post.pk
  }

  return (
    <Grid item xs={12} md={6}>
      <Link href={getJumpUrl()}>
        <CardActionArea component="a">
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {new Date(post.createdOn).toISOString().split('T')[0]}
                </Typography>
                <Box component="div" display={{ xs: 'none', md: 'block' }}>
                  <Typography variant="subtitle1" paragraph>
                    {post.description}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" color="primary">
                  Continue reading...
              </Typography>
              </CardContent>
            </div>
            <Box component="div" display={{ xs: 'none', md: 'block' }} p={1} m={1} bgcolor="background.paper">
              <CardMedia className={classes.cardMedia} image={post.img} title={post.title} />
            </Box>
            {/*<Hidden xsDown>
          </Hidden>*/}
          </Card>
        </CardActionArea>
      </Link>
      <PostController visible={hasController} post={post} />
    </Grid>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};