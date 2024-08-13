import { useEffect, useState } from "react";
import Task from "./Task";
import FloatingActionButtons from "./PlusButton";
import BasicTextFields from "./TextField";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

const TaskList = ({ TaskListTitle, tasks, setTasks, moveTask, fromList }) => {
    const [title, setTitle] = useState(""); // 任务标题
    const [description, setDescription] = useState(""); // 任务内容

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem(TaskListTitle)) || [];
        setTasks(storedTasks);
    }, [TaskListTitle, setTasks]);

    const updateLocalStorage = (updatedTasks) => {
        localStorage.setItem(TaskListTitle, JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const addTask = () => {
        if (title.trim() !== "" && description.trim() !== "") {
            const newTask = {
                id: Date.now(),
                title,
                description,
                createdAt: new Date().toLocaleString(), // 添加创建时间
                attachments:[],
                comments:[],
            };
            const updatedTasks = [...tasks, newTask];
            updateLocalStorage(updatedTasks);
            setTitle(""); // 清空输入框
            setDescription(""); // 清空输入框
        }
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((item) => item.id !== id);
        updateLocalStorage(updatedTasks);
    };

    const toggleTask = (id, newTitle, newDescription,newComments,newAttachments) => {
        const updatedTasks = tasks.map((item) =>
            item.id === id ? { ...item, title: newTitle, description: newDescription,comments: newComments,attachments: newAttachments} : item
        );
        updateLocalStorage(updatedTasks);
    };
    const moveTaskToList = (id, toList) => {
        if(fromList === toList) return;
        moveTask(id, fromList, toList);
    };

    return (
        <div className="todo-container">
            <Card sx={{ width: "535px" }}>
                <h1 align="center">{TaskListTitle}：{tasks.length}</h1>
                <Divider />
                <div className="add-todo" style={{ display: 'flex', alignItems: 'center' }}>
                    <BasicTextFields
                        placeholder={"新建任务标题"}
                        value={title} // 传递标题的值
                        onChange={(e) => setTitle(e.target.value)} // 处理标题的变化
                    />
                    <BasicTextFields
                        placeholder={"新建任务内容"}
                        value={description} // 传递内容的值
                        onChange={(e) => setDescription(e.target.value)} // 处理内容的变化
                    />
                    <FloatingActionButtons onClick={addTask}></FloatingActionButtons>
                </div>
                <Divider />
                <div className="todo-list">
                    <ul>
                        {tasks.map((item) => (
                            <Task
                                key={item.id}
                                propTitle={item.title} // 传递标题
                                propDescription={item.description} // 传递内容
                                propTime={item.createdAt} // 传递创建时间
                                onDelete={() => deleteTask(item.id)} // 删除任务
                                onToggle={(newTitle, newDescription,newComments,newAttachments) => toggleTask(item.id, newTitle, newDescription,newComments,newAttachments)} // 更新任务
                                onMoveToList={(toList) => moveTaskToList(item.id, toList)} // 移动到指定状态
                                initialState={TaskListTitle}
                            />
                        ))}
                    </ul>
                </div>
            </Card>
        </div>
    );
};

export default TaskList;
