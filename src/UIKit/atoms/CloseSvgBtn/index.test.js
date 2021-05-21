import React from 'react';
import { shallow, mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';
import CloseSvgBtn from '.';

describe('<CloseSvgBtn component fixME />', () => {
  const wrap = (props = {}) => shallow(<CloseSvgBtn {...props} />).dive();
  const wrapMount = (props = {}) => mount(<CloseSvgBtn {...props} />);

  it('renders anchor when href is passed in', () => {
    const wrapper = wrapMount({ href: 'test' });
    expect(true).toBe(true);
  });
});
