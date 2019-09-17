import React from 'react';
import { shallow } from 'enzyme';
import Map from './Map';
import { defaultCoordinates as coordinates } from './AdvancedSearchMap';
import { filterQueryResultsForMapMock } from './mock/map-data.mock';

const mockProps = (props = {}) => ({
  advancedSearch: true,
  coordinates,
  data: {
    name: `Keskipiste: ${coordinates.lat}, ${coordinates.lng}`,
    queryResults: filterQueryResultsForMapMock,
  },
  onDragEnd: jest.fn(),
  onZoomChange: jest.fn(),
  radius: 20000,
  zoom: 9,
  ...props,
});

describe('<Map />', () => {
  describe('snapshots', () => {
    it('renders with default props', () => {
      const props = mockProps();
      const subject = shallow(<Map {...props} />);
      expect(subject).toMatchSnapshot();
    });
  });
});
