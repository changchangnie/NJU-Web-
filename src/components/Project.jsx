import React, { useState } from "react";
import TaskList from "./TaskList";
import Stack from "@mui/material/Stack";

const Project = () => {
    const [todoTasks, setTodoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const moveTask = (taskId, fromList, toList) => {
        let taskToMove;
        let updatedFromList;

        // 根据来源列表找到任务并移除
        if (fromList === "todo") {
            taskToMove = todoTasks.find(task => task.id === taskId);
            updatedFromList = todoTasks.filter(task => task.id !== taskId);
            setTodoTasks(updatedFromList);
        } else if (fromList === "inProgress") {
            taskToMove = inProgressTasks.find(task => task.id === taskId);
            updatedFromList = inProgressTasks.filter(task => task.id !== taskId);
            setInProgressTasks(updatedFromList);
        } else if (fromList === "completed") {
            taskToMove = completedTasks.find(task => task.id === taskId);
            updatedFromList = completedTasks.filter(task => task.id !== taskId);
            setCompletedTasks(updatedFromList);
        }

        // 将任务添加到目标列表
        if (toList === "completed") {
            setCompletedTasks(prevTasks => [...prevTasks, taskToMove]);
        } else if (toList === "inProgress") {
            setInProgressTasks(prevTasks => [...prevTasks, taskToMove]);
        } else if (toList === "todo") {
            setTodoTasks(prevTasks => [...prevTasks, taskToMove]);
        }
    };

    return (
        <div>
            <h1 align="center">项目标题</h1>
            <Stack direction="row">
                <TaskList TaskListTitle={"待办"} tasks={todoTasks} setTasks={setTodoTasks} moveTask={moveTask} fromList="todo" />
                <TaskList TaskListTitle={"进行中"} tasks={inProgressTasks} setTasks={setInProgressTasks} moveTask={moveTask} fromList="inProgress" />
                <TaskList TaskListTitle={"已完成"} tasks={completedTasks} setTasks={setCompletedTasks} moveTask={moveTask} fromList="completed" />
            </Stack>
        </div>
    );
};

export default Project;
