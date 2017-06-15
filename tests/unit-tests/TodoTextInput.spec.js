import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import TodoTextInput from '../../components/TodoTextInput';

const setup = propOverrides => {
  const props = Object.assign(
    {
      onSave: jest.fn(),
      text: 'Use Redux',
      placeholder: 'What needs to be done?',
      editing: false,
      newTodo: false
    },
    propOverrides
  );

  const shallowrenderer = new ReactShallowRenderer();
  shallowrenderer.render(<TodoTextInput {...props} />);
  let output = shallowrenderer.getRenderOutput();

  const component = renderer.create(<TodoTextInput {...props} />);
  const tree = component.toJSON();

  return {
    props,
    output,
    tree
  };
};

describe('components', () => {
  describe('TodoTextInput', () => {
    it('should render correctly', () => {
      const { tree } = setup();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly when editing=true', () => {
      const { output } = setup({ editing: true });
      expect(output.props.className).toEqual('edit');
    });

    it('should render correctly when newTodo=true', () => {
      const { output } = setup({ newTodo: true });
      expect(output.props.className).toEqual('new-todo');
    });
  });
});
