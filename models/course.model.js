import mongoose from 'mongoose';
import CourseSchema from '../schemas/course.schema';

CourseSchema.pre('update', () => CourseSchema.update({}, {
    $set: {
        updatedAt: new Date(),
    },
}));

export default mongoose.model('Course', CourseSchema);
