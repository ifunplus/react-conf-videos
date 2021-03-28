import * as React from 'react'

import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'

import { Logo } from './Logo'

describe('Logo', () => {
  it('should render', () => {
    // arrange
    // act
    const comp = mount(<Logo />)

    // assert
    expect(toJSON(comp)).toMatchSnapshot()
  })
})
