import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import { constBlog } from '../../shared/constants';
import { getBlogsByStatus } from '../../api/blogs';
import { useAppContext } from '../../context/app';
import Profile from '../../components/account/profile';
import { useAuth } from '../../context/auth';
import { Post } from '../../components/blogs/post';
import { withAuth } from '../../shared/with-auth';
import { withdrawSalary } from '../../api/account';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));
function Dashboard() {
    const classes = useStyles();
    const router = useRouter()
    const [status, setStatus] = React.useState(0);
    const [posts, setPosts] = React.useState([])
    const { setIsLoading, setSuccessMsg } = useAppContext()
    const { user } = useAuth()

    useEffect(() => {
        const { query } = router
        query.status = parseInt(query.status)
        if (Number.isInteger(query.status)) {
            handleChange(null, query.status - 1)
        } else handleChange(null, 0)
        return () => setIsLoading(false);
    }, [router.query])

    const fetchPosts = async (status) => {
        setIsLoading(true)
        var res = await getBlogsByStatus(status)
        setIsLoading(false)
        setPosts(res)
    }

    const handleChange = (event, newValue) => {
        fetchPosts(newValue + 1)
        setStatus(newValue);
    };

    const onWithdraw = async () => {
        setIsLoading(true);
        let res = await withdrawSalary()
        setSuccessMsg('Withdraw successful!')
        setIsLoading(false);
    }

    return (
        <div className={classes.root}>
            <Grid mt={3} container spacing={4}>
                <Grid item xs={12}>
                    <Profile onClick={onWithdraw} user={user} reputation={user?.withdrawReputation} />
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <Tabs
                            value={status}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Pending" />
                            <Tab label="Published" />
                            <Tab label="Declined" />
                            <Tab label="Draft" />
                        </Tabs>
                    </Paper>
                </Grid>
                {posts.map((post) => (
                    <Post key={post.pk} post={post} hasController />
                ))}
            </Grid>

        </div>
    );
}


export default withAuth(Dashboard)