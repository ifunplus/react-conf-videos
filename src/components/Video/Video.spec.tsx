import * as React from 'react';

import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import {
  mockConference,
  mockVideo,
} from 'utils/test';
import { VideoInner } from './Video';
import { ConferenceTransformed } from '../../domain/TransformedJSON';

describe('Video', () => {
  const getData = () => {
    const video = mockVideo();
    const conference: ConferenceTransformed = mockConference();
    const presenter = { name: 'Simon Carter' };

    const props = {
      videoId: 'xxx',
      conferenceId: 'yyy',
      video,
      presenter,
      conference
    };
    return { props };
  };

  it('should render and connect', () => {
    // arrange
    const { props } = getData();

    // act
    const wrapper = shallow(<VideoInner {...props} />)

    // assert
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should toggle the isOpen state prop on click', () => {
    // arrange
    const { props } = getData();

    // act
    const wrapper = shallow(<VideoInner {...props} />)
    wrapper.find('.top').simulate('click');
  });
});
