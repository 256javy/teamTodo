// router para el modelo Task: full CRUD

const express = require('express');
const router = express.Router();
const logger = require('../config/winston');

const Task = require('../models/task');

// GET all tasks
router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        next(err);
    }
}
);

// GET task by id
router.get('/:id', getTask, (req, res) => {
    logger.info("GET /tasks/:id"+req.params.id);
    res.json(res.task);
}
);

// POST create one task
router.post('/', async (req, res, next) => {
    const task = new Task({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        userId: req.body.userId,
        categoryId: req.body.categoryId,
        createdBy: req.body.createdBy
    });
    try {

        const newTask = await task.save();
        logger.info("POST /tasks");
        logger.info("created new task: " + JSON.stringify(newTask));
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
}
);

// PATCH update one task
// TODO https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
router.patch('/:id', getTask, async (req, res, next) => {
    if (req.body.name != null) {
        res.task.name = req.body.name;
    }
    if (req.body.description != null) {
        res.task.description = req.body.description;
    }
    if (req.body.status != null) {
        res.task.status = req.body.status;
    }
    if (req.body.priority != null) {
        res.task.priority = req.body.priority;
    }
    if (req.body.dueDate != null) {
        res.task.dueDate = req.body.dueDate;
    }
    if (req.body.userId != null) {
        res.task.userId = req.body.userId;
    }
    if (req.body.categoryId != null) {
        res.task.categoryId = req.body.categoryId;
    }
    if (req.body.createdBy != null) {
        res.task.createdBy = req.body.createdBy;
    }
    if (req.body.updatedBy != null) {
        res.task.updatedBy = req.body.updatedBy;
    }
    try {
        const updatedTask = await res.task.save();
        res.json(updatedTask);
    } catch (err) {
        next(err);
    }
}
);

// DELETE one task
router.delete('/:id', getTask, async (req, res, next) => {
    try {
        await res.task.remove();
        res.json({ message: 'Deleted task' });
    } catch (err) {
        next(err);
    }
}
);

// middleware function to get resource by id
async function getTask(req, res, next) {
    try {
        task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.task = task;
    next();
}

module.exports = router;
