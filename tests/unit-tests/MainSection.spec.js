import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import MainSection from '../../components/MainSection';

const setup = propOverrides => {
  const props = Object.assign(
    {
      todos: [
        {
          text: 'Use Redux',
          completed: false,
          aggregateId: 0
        },
        {
          text: 'Run the tests',
          completed: true,
          aggregateId: 1
        }
      ],
      filter: 'all',
      actions: {
        editTodo: jest.fn(),
        deleteTodo: jest.fn(),
        completeTodo: jest.fn(),
        completeAll: jest.fn(),
        clearCompleted: jest.fn()
      }
    },
    propOverrides
  );

  const shallowrenderer = new ReactShallowRenderer();
  shallowrenderer.render(<MainSection {...props} />);
  const output = shallowrenderer.getRenderOutput();

  const component = renderer.create(<MainSection {...props} />);
  const tree = component.toJSON();

  return {
    props,
    output,
    tree
  };
};

describe('components', () => {
  describe('MainSection', () => {
    it('should render container', () => {
      const { tree } = setup();
      expect(tree).toMatchSnapshot();
    });

    it('should be checked if all todos completed', () => {
        const { output } = setup({
          todos: [
            {
              text: 'Use Redux',
              completed: true,
              aggregateId: 0
            }
          ]
        });
        const [toggle] = output.props.children;
        expect(toggle.props.checked).toBe(true);
      });
  });
});
