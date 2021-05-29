import React from 'react'
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Box, Button, ButtonGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PublishIcon from '@material-ui/icons/Publish';
import { constBlog } from '../../shared/constants';
import { useRouter } from 'next/router';
import { useAppContext } from '../../context/app';
import { deleteBlog, publishBlog as sendPublishRequest } from '../../api/blogs'

export default function PostController({ visible, post }) {
    const router = useRouter()
    const { setIsLoading, setErrorMsg } = useAppContext()
    const navigateEditor = () => {
        router.push('/editor?pk=' + post.pk)
    }
    const removeBlog = async () => {
        if (window.confirm('Are you sure permanently delete?')) {
            setIsLoading(true)
            const res = await deleteBlog(post.pk)
            setIsLoading(false)
            if (res.Ok) window.location.pathname = '/account/dashboard'
            else setErrorMsg(res.Message)
        }
    }
    const publishBlog = async () => {
        setIsLoading(true)
        const res = await sendPublishRequest(post.pk)
        setIsLoading(false)
        if (res.Ok) router.push('/account/dashboard?status=' + constBlog.State.Pending)
        else setErrorMsg(res.Message)
    }
    return (visible ?
        <Box display="flex" justifyContent="flex-end" flexDirection="row">
            <ButtonGroup>
                {
                    !(post?.blogStatusPk == constBlog.State.Published) &&
                    <Button onClick={publishBlog}>
                        <PublishIcon fontSize="large" />
                    </Button>
                }
                <Button onClick={navigateEditor}>
                    <BorderColorIcon style={{ fontSize: 30, marginTop: 2 }} color="#ba000d" />
                </Button>
                <Button onClick={removeBlog}>
                    <DeleteIcon fontSize="large" />
                </Button>
            </ButtonGroup>
        </Box> : <div></div>
    )
}