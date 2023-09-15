// controller for users
// express router, CRUD endpoints for users

const express = require('express');
const router = express.Router();
const logger = require('../config/winston');

const User = require('../models/user');

// GET all users with deleted = false
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({ deleted: false });
        res.json(users);
    } catch (err) {
        next(err);
    }
}
);

// GET user by id
router.get('/:id', getUser, (req, res) => {
    logger.info("GET /users/:id"+req.params.id);
    res.json(res.user);
}
);

// POST create one user
router.post('/', async (req, res, next) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {

        const newUser = await user.save();
        logger.info("POST /users");
        logger.info("created new user: " + JSON.stringify(newUser));
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
}
);

// PATCH update one user
// TODO https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
router.patch('/:id', getUser, async (req, res, next) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
}
);

// DELETE one user
router.delete('/:id', getUser, async (req, res, next) => {
    try {
        res.user.deleted = true;
        await res.user.save()
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

// middleware function to get a user by id with mongoose
async function getUser(req, res, next) {
    const { id } = req.params;
    let user;
    try {
        user = await User.findById(id).exec();
        if (user == null) {
            return res.status(404).json({ "message": "Cannot find user" });
        }
        logger.info("getUser:" + JSON.stringify(user));
        res.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

// post query user
router.post('/query', async (req, res, next) => {
    try {
        let query = User.find();
        if (req.body.name != null) {
            query = query.where('name').regex(new RegExp(req.body.name, 'i'));
        }
        if (req.body.email != null) {
            query = query.where('email').regex(new RegExp(req.body.email, 'i'));
        }
        const users = await query.exec();
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// get by email
router.get('/email/:email', async (req, res, next) => {
    let user;
    try {
        user = await User.findOne({ email: req.params.email });
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
});



module.exports = router;
