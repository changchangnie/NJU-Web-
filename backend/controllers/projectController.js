const Project = require('../models/projectModel');

exports.createProject = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: '项目名称和描述是必需的' });
    }
    try {
        const newProject = new Project({ name, description });
        await newProject.save();
        res.status(201).json({ message: '项目创建成功', project: newProject });
    } catch (error) {
        console.error('创建项目时出错:', error);
        res.status(500).json({ message: '服务器错误', error });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error('获取项目时出错:', error);
        res.status(500).json({ message: '服务器错误', error });
    }
};

exports.getProjectById = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: '项目未找到' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error('获取项目时出错:', error);
        res.status(500).json({ message: '服务器错误', error });
    }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const project = await Project.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!project) {
            return res.status(404).json({ message: '项目未找到' });
        }
        res.status(200).json({ message: '项目更新成功', project });
    } catch (error) {
        console.error('更新项目时出错:', error);
        res.status(500).json({ message: '服务器错误', error });
    }
};

exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ message: '项目未找到' });
        }
        res.status(200).json({ message: '项目已删除' });
    } catch (error) {
        console.error('删除项目时出错:', error);
        res.status(500).json({ message: '服务器错误', error });
    }
};