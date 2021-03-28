import { mount } from 'enzyme';
import * as React from 'react';

import { Header } from './Header';

describe('Header', () => {
  it('should render', () => {
    // arrange
    // act
    mount(
      <Header title="A title" tagline="A tagline" titleLink="/a-link" />
    );
  });
});
