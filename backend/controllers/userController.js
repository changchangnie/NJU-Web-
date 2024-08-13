const User = require('../models/userModel');
const {json} = require("express"); // 引入用户模型

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('邮箱、密码是必须的');
    }
    if(String(password).length < 6) return res.status(400).json('密码至少需要六位');
    try {
        const newUser = new User({email, password});
        await newUser.save();
        res.status(201).json('注册成功');
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json('邮箱已注册');
        }
        res.status(400).json('注册失败');
    }
};

exports.loginUser = async (req, res) => {
    const {email,password } = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json('邮箱不存在');
        }
        else if(!(await user.comparePassword(password))){
            return res.status(401).json('密码错误');
        }
        res.json({message:"登陆成功"});
    } catch (error) {
        res.status(500).json("服务器错误");
    }
};

exports.getUserWithProjects = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).populate('projects'); // 使用 populate 方法获取用户的项目
        if (!user) {
            return res.status(404).json('用户未找到');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('获取用户时出错:', error);
        res.status(500).json('服务器错误', error);
    }
};

exports.addProjectToUser = async (req, res) => {
    const { userId, projectId } = req.body;

    if (!userId || !projectId) {
        return res.status(400).json('用户 ID 和项目 ID 是必需的');
    }

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json('项目未找到');
        }
        await User.findByIdAndUpdate(userId, { $addToSet: { projects: projectId } });
        res.status(200).json('项目添加成功');
    } catch (error) {
        console.error('添加项目时出错:', error);
        res.status(500).json('服务器错误', error);
    }
};

exports.removeProjectFromUser = async (req, res) => {
    const { userId, projectId } = req.body; // 从请求中获取用户 ID 和项目 ID

    if (!userId || !projectId) {
        return res.status(400).json('用户 ID 和项目 ID 是必需的');
    }

    try {
        // 从用户的 projects 数组中删除项目 ID
        await User.findByIdAndUpdate(userId, { $pull: { projects: projectId } });
        res.status(200).json('项目删除成功');
    } catch (error) {
        console.error('删除项目时出错:', error);
        res.status(500).json('服务器错误', error);
    }
};