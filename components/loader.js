import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useAppContext } from '../context/app';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
    },
}));
export default function Loader() {
    const classes = useStyles();
    const { isLoading } = useAppContext();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={isLoading}
            closeAfterTransition
        >
            <Fade in={isLoading}>
                <CircularProgress />
            </Fade>
        </Modal>
    );
}