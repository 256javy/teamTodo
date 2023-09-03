// router para el modelo Category: full CRUD

const express = require('express');
const router = express.Router();
const logger = require('../config/winston');

const Category = require('../models/category');

// GET all categories
router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        next(err);
    }
}
);

// GET category by id
router.get('/:id', getCategory, (req, res) => {
    logger.info("GET /categories/:id"+req.params.id);
    res.json(res.category);
}
);

// POST create one category
router.post('/', async (req, res, next) => {
    const category = new Category({
        name: req.body.name,
        userId: req.body.userId,
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy
    });
    try {

        const newCategory = await category.save();
        logger.info("POST /categories");
        logger.info("created new category: " + JSON.stringify(newCategory));
        res.status(201).json(newCategory);
    } catch (err) {
        next(err);
    }
}
);

// PATCH update one category
// TODO https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
router.patch('/:id', getCategory, async (req, res, next) => {
    if (req.body.name != null) {
        res.category.name = req.body.name;
    }
    try {
        const updatedCategory = await res.category.save();
        res.json(updatedCategory);
    } catch (err) {
        next(err);
    }
}
);

// DELETE one category
// TODO https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete()
router.delete('/:id', getCategory, async (req, res, next) => {
    try {
        await res.category.remove();
        res.json({ message: 'Deleted category' });
    } catch (err) {
        next(err);
    }
}
);

// middleware function to get a category by id
async function getCategory(req, res, next) {
    try {
        category = await Category.findById(req.params.id);
        if (category == null) {
            return res.status(404).json({ message: 'Cannot find category' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.category = category;
    next();
}

module.exports = router;



