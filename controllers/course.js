import CourseModel from '../models/course.model';

const calculateTotalParsToLayouts = (data = {}) => {
  const { layouts } = data;
  if (!data || !layouts || !layouts.length) return data;
  const layoutsWithTotalPars = layouts.map((layout) => {
    if (!layout.holes || !layout.holes.length) return layout;
    const total = layout.holes.reduce((a, b) => ({
      par: parseInt(a.par, 10) + parseInt(b.par, 10),
    }));
    if (total && total.par && parseInt(total.par, 10) > 0) {
      return { ...layout, totalPar: total.par };
    }
    return layout;
  });
  return { ...data, layouts: layoutsWithTotalPars };
};
/**
 * Create course
 * @param {Object} data, course data from client.
 * @returns {Promise} Object Bundle
 */

// eslint-disable-next-line import/prefer-default-export
export const createCourse = async (data) => {
  try {
    const dataWithTotalPars = calculateTotalParsToLayouts(data);
    const course = await new CourseModel(dataWithTotalPars);
    const result = await course.save();
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
