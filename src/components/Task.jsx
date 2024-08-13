import * as React from 'react';
import {useEffect, useState} from 'react';
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
import BasicSelect from "./Selector";
import {
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import Comment from './Comment';
import { useDropzone } from 'react-dropzone';

export default function Task({ propTitle, propDescription, propTime, onDelete, initialState,onToggle,onMoveToList}) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));

    const [title, setTitle] = useState(propTitle);
    const [description, setDescription] = useState(propDescription);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [showAttachments, setShowAttachments] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);
    const [listState,setListState] = useState({initialState});

    const handleEdit = (setter) => (event) => { //改变任务内容
        setter((event.target.textContent) !== "" ? event.target.textContent : "请输入内容...");
        onToggle(title,description,comments,attachments);
    };

    const handleAddComment = (newComment) => {
        const timestamp = new Date().toLocaleString();
        if (!showComments) {
            toggleComments();
        }
        setComments([...comments, { text: newComment, time: timestamp }]);
    };

    const handleDeleteComment = (index) => {
        setComments(prevComments => prevComments.filter((_, idx) => idx !== index));
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleToggleAttachment = () => {
        setShowAttachments(!showAttachments);
    };
    const handleAddAttachment = () => {
        setShowAttachments(true);
        setDialogOpen(true);
        onToggle(title,description,comments,attachments);
    }

    const handleDeleteAttachment = (index) => {
        URL.revokeObjectURL(attachments[index].previewer);
        setAttachments(prevAttachments => prevAttachments.filter((_, idx) => idx !== index));
        onToggle(title,description,comments,attachments);
    }
    const handleDrop = (acceptedFiles) => {
        const validFiles = acceptedFiles.filter(file =>
            file.type === 'image/png'
        );

        if (validFiles.length > 0) {
            const filesWithDetailsPromises = validFiles.map(file => {
                return new Promise((resolve) => {
                    const previewer = URL.createObjectURL(file); // 创建预览 URL
                    resolve({
                        name: file.name, // 文件名
                        previewer, // 预览 URL
                        file // 完整的文件对象
                    });
                });
            });

            // 等待所有的 Promise 完成
            Promise.all(filesWithDetailsPromises).then(filesWithDetails => {
                console.log(filesWithDetails[0])
                setAttachments(prev => [...prev, ...filesWithDetails]); // 更新 attachments
                setDialogOpen(false);
                onToggle(title, description, comments, [...attachments, ...filesWithDetails]); // 传递新的 attachments
            });
        } else {
            setDialogOpen(false);
            onToggle(title, description, comments, attachments); // 如果没有有效文件，仍然调用 onToggle
        }
    };
    const handlePreviewFile = (fileName) => {
        setPreviewFile(fileName);
        setPreviewOpen(true);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        accept: {
            'image/png': ['.png']
        }
    });

    const FullWidthGrid = () => {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4} md={12}>
                        <Item>任务创建时间：{propTime}</Item>
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
                        onBlur={handleEdit(setTitle)}
                        style={{ fontSize: '30px' }}
                    >
                        {title}
                    </Typography>
                    <Stack direction="row" spacing={0}>
                        <IconButton color="primary" aria-label="attachments" size="medium" onClick={handleToggleAttachment}>
                            <AttachFileIcon />
                        </IconButton>
                        <IconButton color="error" aria-label="delete" size="medium" onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                </Stack>
                <Typography
                    variant="body2"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleEdit(setDescription)}
                    align="left"
                    style={{ fontSize: '18px' }}
                >
                    {description}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Button variant="outlined" startIcon={<AttachFileIcon />} onClick={handleAddAttachment}>
                        添加附件
                    </Button>
                    <Button variant="outlined" startIcon={<CommentIcon />} onClick={() => handleAddComment("新评论内容")}>
                        添加评论
                    </Button>
                    <Button variant="outlined" startIcon={<CommentIcon />} onClick={toggleComments}>
                        {showComments ? '隐藏评论' : '查看评论'}
                    </Button>
                </Stack>
                <FullWidthGrid />
                <Divider sx={{ my: 2 }} />
                {showComments && (
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6">评论列表</Typography>
                        {comments.map((comment, index) => (
                            <div key={comment.time}>
                                <Typography align="left" fontSize={24} fontFamily={"bold"}>评论{index+1}：</Typography>
                                <Comment
                                    initialDescription={comment.text}
                                    onUpdate={(newDescription) => {
                                        comments[index].text = newDescription;
                                    }}
                                />
                                <Typography variant="caption" color="textSecondary">
                                    评论于：{comment.time}
                                </Typography>
                                <IconButton color="error" onClick={() => handleDeleteComment(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        ))}
                    </Box>
                )}
                <Divider />
                {showAttachments && (
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6">附件列表</Typography>
                        <List>
                            {attachments.map((attachment, index) => (
                                <Stack direction="row">
                                    <ListItem button key={index} onClick={() => handlePreviewFile(attachment)}>
                                      <ListItemText primary={<span style={{ color: 'blue' }}>{attachment.name}</span>} />
                                    </ListItem>
                                    <IconButton color="error" aria-label="delete" size="medium" onClick={() => handleDeleteAttachment(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            ))}
                        </List>
                    </Box>
                )}
            </Box>

            {/* 添加附件对话框 */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>添加附件</DialogTitle>
                <DialogContent>
                    <Box {...getRootProps()} sx={{ border: '2px dashed grey', padding: 2, textAlign: 'center' }}>
                        <input {...getInputProps()} />
                        <Typography>拖拽文件到这里，或点击选择文件（支持.png 格式）</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>取消</Button>
                </DialogActions>
            </Dialog>

            {/* 附件预览对话框 */}
            {attachments.length > 0 && (<Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>附件预览</DialogTitle>
                <DialogContent>
                    {previewFile && previewFile.previewer ? (
                        <img
                            src={previewFile.previewer}
                            alt="Preview"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    ) : (
                        <p>No preview available</p> // 或者其他的占位内容
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPreviewOpen(false)}>关闭</Button>
                </DialogActions>
            </Dialog>)}
            <BasicSelect initialState={initialState} onChange={(state) => onMoveToList(state)}/>
        </Card>
    );
}
