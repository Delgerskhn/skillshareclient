import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { onEnter } from '../../helpers/key-handlers'
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  space: {
    margin: theme.spacing(2)
  }
}));


export const CommentInput = ({ onSubmit }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
  <Box className={classes.space} flexDirection="column" display="flex" justifyContent="flex-start">
    <TextField
      id="filled-multiline-flexible"
      label="Write a comment"
      multiline
      rowsMax={4}
      value={value}
      onChange={handleChange}
      variant="filled"
    />
    <Box>
      <Button onClick={() => onSubmit && onSubmit(value)}>Send</Button>
    </Box>
  </Box>
  )
}
