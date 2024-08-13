const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// 创建项目
router.post('/', projectController.createProject);

// 获取所有项目
router.get('/', projectController.getProjects);

// 根据 ID 获取项目
router.get('/:id', projectController.getProjectById);

// 更新项目
router.put('/:id', projectController.updateProject);

// 删除项目
router.delete('/:id', projectController.deleteProject);

module.exports = router;