import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Box, Button, ButtonGroup, Typography } from '@material-ui/core';
import withModal from './with-modal';
import PublishFloater from '../floaters/publish-floater';
import { useEditorContext } from '../../context/editor';
import { TagSearch } from '../forms/tag-search';

function Trigger() {
    return <PublishFloater />
}

function Body({ onInteraction, handleClose }) {
    const {
        blog,
        onTagSelect,
        publish
    } = useEditorContext();
    return (
        <div >
            <h2 id="simple-modal-title">Choose tag & Enter new one!</h2>
            <TagSearch
                onSelectCallback={onTagSelect}
                defaultValue={blog.tags}
            />
            <Box mt={3}>
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button onClick={publish}>
                        <Typography>Publish</Typography>
                    </Button>
                    <Button onClick={handleClose}>
                        <Typography>Cancel</Typography>
                    </Button>
                </ButtonGroup>
            </Box>
        </div>
    );
}

const PublishModal = withModal(Body, Trigger)

export default PublishModal