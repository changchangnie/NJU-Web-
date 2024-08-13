const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdTime: {
        type: Date,
        default: Date.now,
    },
});

const attachmentSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    }
});

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['待办', '进行中', '已完成'],
        default: '待办',
    },
    createdTime: {
        type: Date,
        default: Date.now,
    },
    completedTime: {
        type: Date,
        default: null,
    },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    attachments: [attachmentSchema],
    comments: [commentSchema],
},{ timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;