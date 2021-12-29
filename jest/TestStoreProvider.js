// @flow
/* eslint-env jest */
import React from 'react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from 'redux-mock-store';

import type { Node } from 'react';

export const mockStore = configureStore();

type Props = {
  children: Node,
  storeData: {},
};

function TestStoreProvider({ children, storeData }: Props) {
  const store = mockStore(storeData);
  return <Provider store={store}>{children}</Provider>;
}

export default TestStoreProvider;
