import { Col } from 'antd';
import AdvancedSearchRatingSelect from './AdvancedSearchRatingSelect';
import AdvancedSearchSurfaceShapeTypesSelect from './AdvancedSearchSurfaceShapeTypesSelect';
import AdvancedSearchCourseTypesSelect from './AdvancedSearchCourseTypesSelect';
import AdvancedSearchRangeSlider from './AdvancedSearchRangeSlider';

function AdvancedSearchFilters() {
  return (
    <>
      <Col md={12} xs={24}>
        <AdvancedSearchRatingSelect />
      </Col>
      <Col md={12} xs={24}>
        <AdvancedSearchSurfaceShapeTypesSelect />
      </Col>
      <Col md={12} xs={24}>
        <AdvancedSearchCourseTypesSelect />
      </Col>
      <Col md={12} xs={24}>
        <AdvancedSearchRangeSlider />
      </Col>
    </>
  );
}

export default AdvancedSearchFilters;
