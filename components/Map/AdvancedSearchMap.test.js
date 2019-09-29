import React from 'react';
import { shallow } from 'enzyme';
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { AdvancedSearchMap } from './AdvancedSearchMap';

const mockProps = (props = {}) => ({
  handleChange: jest.fn(),
  mapVisible: true,
  defaultValue: [
    {
      coordinates: { lat: 60.190599999999996, lng: 24.89741416931156 },
      radius: 20000,
    },
  ],
  queryResults: mockCoursesData,
  zoom: 10,
  setFilter: jest.fn(),
  setMapZoom: jest.fn(),
  t: jest.fn(value => value),
  ...props,
});

describe('<AdvancedSearchMap />', () => {
  describe('snapshots', () => {
    it('renders with default props', () => {
      const props = mockProps();
      const subject = shallow(<AdvancedSearchMap {...props} />);
      expect(subject).toMatchSnapshot();
    });
    it('renders with error', () => {
      const props = mockProps();
      const subject = shallow(<AdvancedSearchMap {...props} />);
      subject.setState({ error: 'Tapahtui virhe', waitingLocation: false });
      expect(subject).toMatchSnapshot();
    });
  });
});
