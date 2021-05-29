import React, { useEffect } from 'react';
import Alert from '@material-ui/core/Alert';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 180,
    },
    wrapper: {
        position: 'absolute',
        top: 0,
        width: '100%'
    },
    paper: {
        zIndex: 1,
        position: 'relative',
        margin: theme.spacing(1),
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    autoSaveWrap: {
        position: 'fixed',
        bottom: '5%',
        left: '5%'
    }
}));
const Error = ({ msg }) => {
    return <Alert severity = "error">{ msg }</Alert>;
}

const Success = ({ msg }) => {
    return <Alert severity="success">{msg}</Alert>;
}

 function withFader(Alert) {
     return function AlertWithFader({  msg }) {
         const classes = useStyles();
         return (
             <div className={classes.wrapper} style={{zIndex: msg? 1500: 0}}>
                 <Fade in={msg.length > 0}  >
                     <Paper elevation={4} className={classes.paper}>
                         <Alert msg={msg} />
                     </Paper>
                 </Fade>

             </div>
                 )
     }
}

function AutoSaveAlert({ isVisible, setIsVisible }) {
    const classes = useStyles();
    useEffect(() => {
        if (isVisible) setTimeout(() => setIsVisible(false), 2000)
    }, [isVisible])
    return (
        <Fade in={isVisible} className={classes.autoSaveWrap}>
            <Paper elevation={4} >
                Draft saved..
            </Paper>
        </Fade>
        )
}



const SuccessAlert = withFader(Success);
const ErrorAlert = withFader(Error);

export { SuccessAlert, ErrorAlert, AutoSaveAlert }