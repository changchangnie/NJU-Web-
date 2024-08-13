const mongoose = require("mongoose");

const Task = require('./taskModel');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String, required: true
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

const Project = mongoose.model("Project",projectSchema);

module.exports = Project;