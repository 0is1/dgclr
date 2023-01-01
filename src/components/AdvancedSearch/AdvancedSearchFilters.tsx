import { Col } from 'antd';
import AdvancedSearchRatingSelect from './AdvancedSearchRatingSelect';
import AdvancedSearchSurfaceShapeTypesSelect from './AdvancedSearchSurfaceShapeTypesSelect';
import AdvancedSearchCourseTypesSelect from './AdvancedSearchCourseTypesSelect';

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
    </>
  );
}

export default AdvancedSearchFilters;
