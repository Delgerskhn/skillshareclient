import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAppContext } from '../../context/app';
import { useRouter } from 'next/router';
import { createAccount } from '../../api/auth';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright � '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const router = useRouter()
    const classes = useStyles();
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setemail] = useState("");
    const [validation, setValidation] = useState({email: false, fname:false,lname:false,password:false});
    const [password, setpassword] = useState("");
    const handleemail = (e) => setemail(e.target.value);
    const handlefname = (e) => setfname(e.target.value);
    const handlelname = (e) => setlname(e.target.value);
    const handlepassword = (e) => setpassword(e.target.value);

    const { setErrorMsg, setIsLoading } = useAppContext();

    const signUp = async () => {
        var user = {
            firstname: fname,
            lastname: lname,
            email: email,
            password: password
        }
        setIsLoading(true)
        var res = await createAccount(user);
        setIsLoading(false)
        if(res.Ok) router.push('/auth/login')
        else setErrorMsg(res.Message)
    };
    const validEmail = () => {
        console.log('validate email');
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <div className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={validation.fname}
                                helperText="Must have at least 4 letters"
                                autoComplete="fname"
                                onChange={handlefname}
                                value={ fname}
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                onChange={handlelname}
                                value={lname}
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                error={validation.lname}
                                helperText="Must have at least 4 letters"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                onBlur={validEmail}
                                label="Email Address"
                                onChange={handleemail}
                                value={email}
                                name="email"
                                error={validation.email}
                                helperText="Must be correct email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                onChange={handlepassword}
                                value={password}
                                label="Password"
                                type="password"
                                id="password"
                                error={validation.password}
                                helperText="Must have at least 6 letters"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        onClick={ signUp}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}