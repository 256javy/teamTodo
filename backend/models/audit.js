const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
    documentModel: String,
    documentId: String,
    action: String,
    description: String,
    createdAt: Date,
    userId: mongoose.Schema.Types.ObjectId
});

const Audit = mongoose.model('Audit', auditSchema);

module.exports = Audit;
