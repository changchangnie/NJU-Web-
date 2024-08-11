import * as React from 'react';
import { useState } from 'react';
import MultipleSelectCheckmarks from "../selector";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CommentIcon from '@mui/icons-material/Comment';
import { IconButton } from "@mui/material";
import Comment from '../Comment';
import comment from "../Comment"; // 导入 Comment 组件

export default function Task({ propTitle, propDescription, propTime, onDelete }) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));

    const [title, setTitle] = useState(propTitle);
    const [description, setDescription] = useState(propDescription);
    const [comments, setComments] = useState([]); // 添加评论状态
    const [showComments, setShowComments] = useState(false); // 控制评论显示状态
    const handleEdit = (setter) => (event) => {
        setter((event.target.textContent) !== "" ? event.target.textContent : "请输入内容...");
    };

    const handleAddComment = (newComment) => {
        const timestamp = new Date().toLocaleString(); // 获取当前时间
        if(!showComments) {toggleComments();}
        setComments([...comments, { text: newComment, time: timestamp }]); // 添加时间戳
    };

    const handleDeleteComment = (index) => {
        const updatedComments = comments.filter((_, i) => i !== index); // 删除特定评论
        setComments(updatedComments);
    };

    const toggleComments = () => {
        setShowComments(!showComments); // 切换评论显示状态
    };

    const FullWidthGrid = () => {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4} md={12}>
                        <Item>创建时间：{propTime}</Item>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    return (
        <Card variant="outlined" sx={{ maxWidth: 400, mb: 2 }}>
            <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        contentEditable
                        suppressContentEditableWarning
                        align="center"
                        onBlur={handleEdit(setTitle)} // 当失去焦点时更新标题
                        style={{ fontSize: '30px' }}
                    >
                        {title}
                    </Typography>
                    <IconButton color="error" aria-label="delete" size="large" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
                <Typography
                    variant="body2"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleEdit(setDescription)} // 当失去焦点时更新描述
                    align="left"
                    style={{ fontSize: '18px' }}
                >
                    {description}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Button variant="outlined" startIcon={<AttachFileIcon />}>
                        添加附件
                    </Button>
                    <Button variant="outlined" startIcon={<CommentIcon />} onClick={() => handleAddComment("新评论内容")}>
                        添加评论
                    </Button>
                    <Button variant="outlined" startIcon={<CommentIcon />} onClick={toggleComments}>
                        {showComments ? '隐藏评论' : '查看评论'}
                    </Button>
                </Stack>
            </Box>
            <Divider />
            <FullWidthGrid />
            <Box sx={{ p: 2 }}>
                <MultipleSelectCheckmarks />
            </Box>
            {showComments && (
                <Box sx={{p: 2}}>
                    {comments.map((comment, index) => (
                        <div>
                            <Comment
                                initialDescription={comment.text}
                                onUpdate={(newDescription) => {
                                    const updatedComments = [...comments];
                                    updatedComments[index].text = newDescription; // 更新评论内容
                                    setComments(updatedComments);
                                }}
                            />
                            <Typography variant="caption" color="textSecondary">
                                评论于：{comment.time} {/* 显示评论时间 */}
                            </Typography>
                            <IconButton color="error" onClick={() => handleDeleteComment(index)}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
            ))}
        </Box>
    )
}
</Card>
)
    ;
}
