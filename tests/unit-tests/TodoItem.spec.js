import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import TodoItem from '../../components/TodoItem';

const setup = () => {
  const props = {
    todo: {
      aggregateId: 0,
      text: 'Use Redux',
      completed: false
    },
    editTodo: jest.fn(),
    deleteTodo: jest.fn(),
    completeTodo: jest.fn()
  };

  const shallowrenderer = new ReactShallowRenderer();
  shallowrenderer.render(<TodoItem {...props} />);
  let output = shallowrenderer.getRenderOutput();

  const component = renderer.create(<TodoItem {...props} />);
  const tree = component.toJSON();

  return {
    props,
    output,
    tree
  };
};

describe('components', () => {
  describe('TodoItem', () => {
    it('initial render', () => {
      const { tree } = setup();
      expect(tree).toMatchSnapshot();
    });

    it('input onChange should call completeTodo', () => {
      const { output, props } = setup();
      const input = output.props.children.props.children[0];
      input.props.onChange({});
      expect(props.completeTodo).toBeCalledWith(0);
    });

    it('button onClick should call deleteTodo', () => {
      const { output, props } = setup();
      const button = output.props.children.props.children[2];
      button.props.onClick({});
      expect(props.deleteTodo).toBeCalledWith(0);
    });

  });
});
