const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// 创建任务
router.post('/tasks', taskController.createTask);

// 删除任务
router.delete('/tasks/:id', taskController.deleteTask);

// 改变任务主题
router.put('/tasks/:id/title', taskController.updateTaskTitle);

// 改变任务状态
router.put('/tasks/:id/status', taskController.updateTaskStatus);

// 改变完成时间
router.put('/tasks/:id/completedTime', taskController.updateTaskCompletedTime);

// 改变任务内容
router.put('/tasks/:id/content', taskController.updateTaskContent);

// 获取任务
router.get('/tasks/:id', taskController.getTaskById);

// 添加评论
router.post('/tasks/:id/comments', taskController.addComment);

// 添加附件
router.post('/tasks/:id/attachments', taskController.addAttachment);

module.exports = router;