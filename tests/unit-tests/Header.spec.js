import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import Header from '../../components/Header';

const setup = () => {
  const props = {
    addTodo: jest.fn()
  };

  const shallowrenderer = new ReactShallowRenderer();
  shallowrenderer.render(<Header {...props} />);
  const output = shallowrenderer.getRenderOutput();

  const component = renderer.create(<Header {...props} />);
  const tree = component.toJSON();

  return {
    props,
    output,
    tree
  };
};

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const { tree } = setup();
      expect(tree).toMatchSnapshot();
    });

    it('don`t call addTodo if length of text is 0', () => {
      const { output, props } = setup();
      const input = output.props.children[1];
      input.props.onSave('');
      expect(props.addTodo).not.toBeCalled();
    });

    it('should call addTodo if length of text is greater than 0', () => {
      const { output, props } = setup();
      const input = output.props.children[1];
      input.props.onSave('Use Redux');
      expect(props.addTodo).toBeCalled();
    });
  });
});
