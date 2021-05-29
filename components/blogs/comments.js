import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { CommentInput } from '../forms/comment-input'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Comments({ onSubmit, comments }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={8}>
      <List className={classes.root}>
        {comments.map(r => (
          <React.Fragment key={r.pk}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={r?.appUser?.firstName || 'Anonymous'} />
              </ListItemAvatar>
              <ListItemText
                primary={r.content}
                secondary={
                  <React.Fragment>
                    {'by: '}
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {r?.appUser?.firstName || 'Anonymous'}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}

      </List>
      <CommentInput onSubmit={onSubmit} />
    </Grid>
  );
}
