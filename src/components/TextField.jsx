import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ placeholder, value, onChange }) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-basic"
                size={"small"}
                label={placeholder}
                variant="outlined"
                value={value}
                onChange={onChange} // 绑定 onChange 事件
            />
        </Box>
    );
}
