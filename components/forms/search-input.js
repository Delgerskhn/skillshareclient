import { TextField } from '@material-ui/core';
import React, { useState } from 'react'



export const SearchInput = ({ onSubmitCallback }) => {
    const [value, setValue] = useState('')
    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitCallback && onSubmitCallback(value)
    }
    return (
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
            <TextField
                style={{ width: '100%' }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id="standard-name"
                placeholder="Search content..."
                size="large"
            />
        </form>
    )

}