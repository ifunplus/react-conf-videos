import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import * as React from 'react'

import { ResultDetails } from './ResultDetails'

describe('ResultDetails', () => {
  it('should render', () => {
    // arrange
    const props = {
      numberOfVideos: 5, numberOfConferences: 13
    }

    // act
    const comp = mount(<ResultDetails {...props} />)

    // assert
    expect(toJSON(comp)).toMatchSnapshot()
  })
})
