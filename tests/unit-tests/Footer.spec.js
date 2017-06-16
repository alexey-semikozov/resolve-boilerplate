import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import Footer from '../../components/Footer';
import {
  SHOW_ALL,
  SHOW_ACTIVE,
  SHOW_COMPLETED
} from '../../components/MainSection';

const setup = propOverrides => {
  const props = Object.assign(
    {
      completedCount: 0,
      activeCount: 0,
      filter: SHOW_ALL,
      onClearCompleted: jest.fn(),
      onShow: jest.fn(),
      titles: {
        [SHOW_ALL]: 'All',
        [SHOW_ACTIVE]: 'Active',
        [SHOW_COMPLETED]: 'Completed'
      }
    },
    propOverrides
  );

  const shallowrenderer = new ReactShallowRenderer();
  shallowrenderer.render(<Footer {...props} />);
  const output = shallowrenderer.getRenderOutput();

  const component = renderer.create(<Footer {...props} />);
  const tree = component.toJSON();

  return {
    props,
    output,
    tree
  };
};

const getTextContent = elem => {
  const children = Array.isArray(elem.props.children)
    ? elem.props.children
    : [elem.props.children];

  return children.reduce(
    (out, child) =>
      // Concatenate the text
      // Children are either elements or text strings
      out + (child.props ? getTextContent(child) : child),
    ''
  );
};

describe('components', () => {
  describe('Footer', () => {
    it('should render container', () => {
      const { tree } = setup();
      expect(tree).toMatchSnapshot();
    });

    it('should display active count when 0', () => {
      const { output } = setup({ activeCount: 0 });
      const [count] = output.props.children;
      expect(getTextContent(count)).toBe('No items left');
    });

    it('should display active count when above 0', () => {
      const { output } = setup({ activeCount: 1 });
      const [count] = output.props.children;
      expect(getTextContent(count)).toBe('1 item left');
    });
  });
});
