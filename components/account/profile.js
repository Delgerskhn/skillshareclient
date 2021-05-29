import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Button, Grid, Typography } from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';

const styles = {
};

const useStyles = makeStyles(styles);
export default function Profile({ user, reputation, onClick }) {
    const classes = useStyles();
    return (
        <Box
            display="flex"
            justifyContent="flex-start"
            direction="row"
            mb={2}
            alignItems="center"
        >
            <Box
                alignItems="center"
                display="flex"
            >
                <Box mr={2}>
                    <Avatar alt="Avatar" />
                </Box>
                <Typography variant="subtitle1" color="textSecondary">
                    {user?.email}
                </Typography>
            </Box>
            <Box
                alignItems="center"
                display="flex"
                ml={5}
            >
                <Button disabled={!onClick} onClick={onClick}>
                    <StarIcon fontSize="large" />
                    <Typography variant="subtitle1" color="textSecondary">
                        {reputation}
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
}



