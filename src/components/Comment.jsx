import React, {useEffect, useState} from 'react';
import { Typography, Box } from '@mui/material';

const Comment = ({ initialDescription, time, onUpdate }) => {
    const [description, setDescription] = useState(initialDescription);
    const [isEditing, setIsEditing] = useState(false);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = (event) => {
        setIsEditing(false);
        setDescription(event.currentTarget.textContent);
    };

    useEffect(() => {
        if (!isEditing) {
            onUpdate(description); // 在编辑结束后调用 onUpdate
        }
    }, [isEditing, onUpdate]); // 依赖项包括 description 和 isEditing

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}} border={"black"}>
            <Typography variant="body1" onClick={handleClick} onBlur={handleBlur} sx={{ flexGrow: 1 }} contentEditable align={"left"} suppressContentEditableWarning>
                {description}
            </Typography>
            <Typography variant="caption" color="textSecondary" sx={{ ml: 2 }} >
                {time} {/* 显示评论时间 */}
            </Typography>
        </Box>
    );
};

export default Comment;
