import { Box, Button, makeStyles } from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles((theme) => ({
    floatingPoint: {
        position: 'fixed',
        bottom: '5%',
        right: '5%',
        zIndex: 10,
        height: "60px",
        border: '1px solid',
        borderRadius: '50%'
    }
}));

export default function PublishFloater({onClick }) {
    const classes = useStyles();

    return (
        <Button className={classes.floatingPoint}>
            <PublishIcon color="primary" fontSize="large"/>
        </Button>
        );
}