// import { useTranslation } from 'next-i18next';
import AdvancedSearchQuery from './AdvancedSearchQuery';
import AdvancedSearchFilters from './AdvancedSearchFilters';
import { Row } from 'antd';
import useAdvancedQuery from '../../hooks/useAdvancedQuery';
import { allObjectKeysAreEmpty } from '../../helpers/utils';

function AdvancedSearch() {
  // const { t } = useTranslation(['common']);
  const { query } = useAdvancedQuery();
  if (allObjectKeysAreEmpty(query.filter)) {
    return (
      <Row gutter={[16, 16]}>
        <AdvancedSearchFilters />
      </Row>
    );
  }
  return (
    <Row gutter={[16, 16]}>
      <AdvancedSearchFilters />
      <AdvancedSearchQuery />
    </Row>
  );
}

export default AdvancedSearch;
