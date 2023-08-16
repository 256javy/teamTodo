const mongoose = require('mongoose');
const winston = require('../config/winston');

main().catch(err => winston.error(err));

async function main() {
    await mongoose.connect('mongodb://root:rootpassword@localhost:27017');
    winston.info('Connected to MongoDB...');
}

module.exports = mongoose;