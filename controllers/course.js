import CourseModel from '../models/course.model';

/**
 * Create course
 * @param {Object} data, course data from client.
 * @returns {Promise} Object Bundle
 */

// eslint-disable-next-line import/prefer-default-export
export const createCourse = async (data) => {
  try {
    const course = await new CourseModel(data);
    const result = await course.save();
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
