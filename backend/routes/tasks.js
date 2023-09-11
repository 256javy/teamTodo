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
    let task;
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

// get tastks by user id
// FIXME cuando se envía la petición http://localhost:3000/tasks/user/user/ se obtiene el error
// message": "Cast to ObjectId failed for value \"user\" (type string) at path \"_id\" for model \"Task\""
router.get('/user/:id', async (req, res, next) => {
    try {
        //validar si se recibe el id del usuario
        if (req.params.id == null || req.params.id == "") {
            return res.status(404).json({ message: 'Cannot find user id' });
        }
        const tasks = await Task.find({ userId: req.params.id });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

// get tastks by category id
router.get('/category/:id', async (req, res, next) => {
    try {
        const tasks = await Task.find({ categoryId: req.params.id });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

// get tastks by status
router.get('/status/:status', async (req, res, next) => {
    try {
        const tasks = await Task.find({ status: req.params.status });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

// get tastks by priority
router.get('/priority/:priority', async (req, res, next) => {
    try {
        const tasks = await Task.find({ priority: req.params.priority });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

// post query tasks
router.post('/query', async (req, res, next) => {
    try {
        const query = Task.find();
        query.setOptions({ lean: true });
        query.collection(Task.collection);
        if (req.body.name != null) {
            query.where('name').regex(new RegExp(req.body.name, 'i'));
        }
        if (req.body.description != null) {
            query.where('description').regex(new RegExp(req.body.description, 'i'));
        }
        if (req.body.status != null) {
            query.where('status').equals(req.body.status);
        }
        if (req.body.priority != null) {
            query.where('priority').equals(req.body.priority);
        }
        if (req.body.dueDate != null) {
            query.where('dueDate').equals(req.body.dueDate);
        }
        if (req.body.userId != null) {
            query.where('userId').equals(req.body.userId);
        }
        if (req.body.categoryId != null) {
            query.where('categoryId').equals(req.body.categoryId);
        }
        if (req.body.createdBy != null) {
            query.where('createdBy').equals(req.body.createdBy);
        }
        if (req.body.updatedBy != null) {
            query.where('updatedBy').equals(req.body.updatedBy);
        }
        const tasks = await query.exec();
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
