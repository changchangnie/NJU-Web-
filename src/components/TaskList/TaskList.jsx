import {useEffect, useState} from "react";
import "./TaskList.css";
import Task from "../Task/Task";
import FloatingActionButtons from "../PlusButton";
import BasicTextFields from "../TextField";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState(""); // 任务标题
    const [description, setDescription] = useState(""); // 任务内容

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("todo"));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    const updateLocalStorage = (updatedTasks) => {
        localStorage.setItem("todo", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const addTask = () => {
        if (title.trim() !== "" && description.trim() !== "") {
            const newTask = {
                id: Date.now(),
                title,
                description,
                createdAt: new Date().toLocaleString(), // 添加创建时间
                completed: false
            };
            const updatedTasks = [...tasks, newTask];
            updateLocalStorage(updatedTasks);
            setTitle(""); // 清空输入框
            setDescription(""); // 清空输入框
        }
    };

    const deleteTask = (id) => {
        console.log("删除");
        const updatedTasks = tasks.filter((item) => item.id !== id);
        updateLocalStorage(updatedTasks);
    };

    const toggleTask = (id, newTitle, newDescription) => {
        const updatedTasks = tasks.map((item) =>
            item.id === id ? {...item, title: newTitle, description: newDescription} : item
        );
        updateLocalStorage(updatedTasks);
    };

    return (
        <div className="todo-container">
            <Paper>
                <h1>待办：{tasks.length}</h1>
                <Divider/>
                <div className="add-todo" style={{display: 'flex', alignItems: 'center'}}>
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
                <Divider/>
                <div className="todo-list">
                    <ul>
                        {tasks.map((item) => (
                            <Task
                                key={item.id}
                                propTitle={item.title} // 传递标题
                                propDescription={item.description} // 传递内容
                                propTime={item.createdAt} // 传递创建时间
                                onDelete={() => deleteTask(item.id)} // 删除任务
                                onToggle={(newTitle, newDescription) => toggleTask(item.id, newTitle, newDescription)} // 更新任务
                            />
                        ))}
                    </ul>
                </div>
            </Paper>
        </div>
    );
};

export default TaskList;
