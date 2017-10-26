import mongoose from 'mongoose';
import {courseSchema} from '../schemas/course.schema';

const courseModel = courseSchema();
courseModel.pre('update', () => courseModel.update({}, {
    $set: {
        updatedAt: new Date(),
    },
}));

export default mongoose.model('Course', courseModel);
