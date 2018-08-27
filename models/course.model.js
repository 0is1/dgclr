import mongoose from 'mongoose';
import { courseSchema } from '../schemas/course.schema';

const courseModel = courseSchema();

courseModel.pre('update', () => courseModel.update(
  {},
  {
    $set: {
      updatedAt: new Date(),
    },
  },
));
courseModel.index(
  {
    name: 1,
    'locationInfo.city': 'text',
  },
  { default_language: 'finnish' },
);
export default mongoose.model('Course', courseModel);
