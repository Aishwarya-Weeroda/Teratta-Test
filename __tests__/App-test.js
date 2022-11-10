/**
 * @format
 */

import 'react-native';
import React from 'react';
import Dashboard from '../src/components/Dashboard/Dashboard';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
};

it('renders correctly', () => {
  renderer.create(<Dashboard {...props} />);
});
