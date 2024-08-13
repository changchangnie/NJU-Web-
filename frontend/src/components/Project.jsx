import React, { useState } from "react";
import TaskList from "./TaskList";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Add } from '@mui/icons-material';

const Project = () => {
    const [todoTasks, setTodoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(true); // 控制对话框的打开状态
    const [projectTitle, setProjectTitle] = useState(''); // 存储项目标题

    const moveTask = (taskId, fromList, toList) => {
        let taskToMove;
        let updatedFromList;

        // 根据来源列表找到任务并移除
        if (fromList === "待办") {
            taskToMove = todoTasks.find(task => task.id === taskId);
            updatedFromList = todoTasks.filter(task => task.id !== taskId);
            setTodoTasks(updatedFromList);
        } else if (fromList === "进行中") {
            taskToMove = inProgressTasks.find(task => task.id === taskId);
            updatedFromList = inProgressTasks.filter(task => task.id !== taskId);
            setInProgressTasks(updatedFromList);
        } else if (fromList === "已完成") {
            taskToMove = completedTasks.find(task => task.id === taskId);
            updatedFromList = completedTasks.filter(task => task.id !== taskId);
            setCompletedTasks(updatedFromList);
        }

        // 将任务添加到目标列表
        if (toList === "已完成") {
            setCompletedTasks(prevTasks => [...prevTasks, taskToMove]);
        } else if (toList === "进行中") {
            setInProgressTasks(prevTasks => [...prevTasks, taskToMove]);
        } else if (toList === "待办") {
            setTodoTasks(prevTasks => [...prevTasks, taskToMove]);
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false); // 关闭对话框
    };

    const handleTitleSubmit = () => {
        // 在这里可以执行其他操作，比如保存项目标题
        console.log('项目标题:', projectTitle);
        handleDialogClose(); // 关闭对话框
    };

    const handleTitleChange = (event) => {
        setProjectTitle(event.target.innerText);
        console.log(projectTitle);
    }

    const handleCreateProject = () => {
        const confirmCreate = window.confirm("确认创建新项目吗？这会导致你当前项目的丢失。");
        setDialogOpen(true);
        setTodoTasks([]); // 清空待办任务列表
        setInProgressTasks([]); // 清空进行中任务列表
        setCompletedTasks([]); // 清空已完成任务列表
    };

    const handleOpenProjectList = () => {
        // 处理打开项目列表的逻辑
        console.log("打开项目列表");
    };

    return (
        <div>
            <Stack direction="row" justifyContent="center" spacing={80}>
            <Button variant="contained" color="primary" onClick={handleCreateProject}>
                创建新项目
            </Button>
            <Typography align="center" variant="h3" contentEditable suppressContentEditableWarning onBlur={handleTitleChange}>{projectTitle || "项目标题"}</Typography>
            <Button style={{ display: 'flex', alignItems: 'center' }}/>
            </Stack>
            <Stack justifyContent="center" direction="row" spacing={2}>
                <TaskList TaskListTitle={"待办"} tasks={todoTasks} setTasks={setTodoTasks} moveTask={moveTask} fromList="待办" />
                <TaskList TaskListTitle={"进行中"} tasks={inProgressTasks} setTasks={setInProgressTasks} moveTask={moveTask} fromList="进行中" />
                <TaskList TaskListTitle={"已完成"} tasks={completedTasks} setTasks={setCompletedTasks} moveTask={moveTask} fromList="已完成" />
            </Stack>
            {/* 项目标题输入对话框 */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>输入项目标题</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="项目标题"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)} // 更新项目标题
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={handleTitleSubmit} color="primary">
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Project;
