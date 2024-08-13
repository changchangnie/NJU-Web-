const Task = require('../models/taskModel');
const Project = require('../models/projectModel');

exports.createTask = async (req, res) => {
    const { title, content, projectId } = req.body;

    try {
        const newTask = new Task({ title, content, projectId });
        await newTask.save();
        await Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } });

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: '创建任务失败', error });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: '任务未找到' });
        }
        await Project.findByIdAndUpdate(task.projectId, { $pull: { tasks: task._id } });
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: '任务已删除' });
    } catch (error) {
        console.error('删除任务时出错:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};


exports.updateTaskTitle = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { title }, { new: true });
        if (!task) {
            return res.status(404).json({ message: '任务未找到' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('更新任务标题时出错:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};

exports.updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
        if (!task) {
            return res.status(404).json({ message: '任务未找到' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('更新任务状态时出错:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};


exports.updateTaskCompletedTime = async (req, res) => {
    const { id } = req.params;
    const { completedTime } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { completedTime }, { new: true });
        if (!task) {
            return res.status(404).json({ message: '任务未找到' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('更新完成时间时出错:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};

exports.updateTaskContent = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { content }, { new: true });
        if (!task) {
            return res.status(404).json({ message: '任务未找到' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('更新任务内容时出错:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: '任务未找到' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('获取任务时出错:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};


exports.addComment = async (req, res) => {
    const { id } = req.params;
    const { user, content } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { $push: { comments: { user, content } } }, { new: true }); // 添加评论
        if (!task) {
            return res.status(404).json({ message: '任务未找到' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('添加评论时出错:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};


exports.addAttachment = async (req, res) => {
    const { id } = req.params;
    const { fileName, fileType, fileUrl } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { $push: { attachments: { fileName, fileType, fileUrl } } }, { new: true }); // 添加附件
        if (!task) {
            return res.status(404).json({ message: '任务未找到' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('添加附件时出错:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};
