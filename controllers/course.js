import Promise from 'bluebird';
import CourseModel from '../models/course.model';

/**
 * Create course
 * @param {Object} data, course data from client.
 * @returns {Promise} Object Bundle
 */

// eslint-disable-next-line import/prefer-default-export
export const createCourse = (data) => {
    const course = new CourseModel(data);
    return Promise.resolve(course)
        .then(newCourse => newCourse.save())
        .then(result => result)
        .catch(err => Promise.reject(err));
};
