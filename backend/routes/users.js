// controller for users
// express router, CRUD endpoints for users

const express = require('express');
const router = express.Router();
const logger = require('../config/winston');

const User = require('../models/user');

// GET all users
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
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
// FIXME !!!
router.delete('/:id', async (req, res, next) => {
    try {
        User.deleteOne({id: req.params.id})

        res.json({ "message": "Deleted user" });
    } catch (err) {
        next(err);
    }
}
);

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

module.exports = router;
