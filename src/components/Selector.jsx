import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useEffect} from "react";

export default function BasicSelect({initialState,onChange}) {

    const [state, setState] = React.useState(initialState);

    React.useEffect(() => {
        setState(initialState.toString()); // 设置状态
    }, [initialState]);

    const handleChange = (event) => {
        setState(event.target.value);
    };

    useEffect(() => {
        onChange(state);
    }, [state]);

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">完成度</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="state"
                    onChange={handleChange}
                >
                    <MenuItem value={"待办"}>待办</MenuItem>
                    <MenuItem value={"进行中"}>进行中</MenuItem>
                    <MenuItem value={"已完成"}>已完成</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}