const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 用户注册
router.post('/register', userController.registerUser);

// 用户登录
router.post('/login', userController.loginUser);

// 获取用户及其项目
router.get('/:id/projects', userController.getUserWithProjects);

// 添加项目到用户
router.post('/addProject', userController.addProjectToUser);

// 从用户中删除项目
router.post('/removeProject', userController.removeProjectFromUser);

module.exports = router;