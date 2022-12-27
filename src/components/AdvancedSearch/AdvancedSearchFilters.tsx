import { Col } from 'antd';
import AdvancedSearchRatingSelect from './AdvancedSearchRatingSelect';
import AdvancedSearchSurfaceShapeTypesSelect from './AdvancedSearchSurfaceShapeTypesSelect';
import AdvancedSearchCourseTypesSelect from './AdvancedSearchCourseTypesSelect';

function AdvancedSearchFilters() {
  return (
    <>
      <Col span={12}>
        <AdvancedSearchRatingSelect />
      </Col>
      <Col span={12}>
        <AdvancedSearchSurfaceShapeTypesSelect />
      </Col>
      <Col span={12}>
        <AdvancedSearchCourseTypesSelect />
      </Col>
    </>
  );
}

export default AdvancedSearchFilters;
