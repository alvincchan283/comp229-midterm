const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    major: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'updatedDate'
    }
});

module.exports = {
    Student: mongoose.model('Student', StudentSchema),
    StudentSchema
}