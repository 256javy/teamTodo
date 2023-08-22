const mongoose = require('mongoose');
const winston = require('../config/winston');

main().catch(err => winston.error(err));

async function main() {
    const uri = process.env.MONGODB_URI;
    winston.debug('Trying to connect: '+ uri);
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    winston.info('Connected to MongoDB...');
}

module.exports = mongoose;