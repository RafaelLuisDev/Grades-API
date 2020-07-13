import mongoose from 'mongoose';

const gradeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
        min: 0,
    },
    lastModified: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const gradeModel = mongoose.model('grade', gradeSchema, 'grades');

export { gradeModel };
