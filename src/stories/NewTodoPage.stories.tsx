import { ComponentStory, ComponentMeta } from '@storybook/react';
import NewTodoPage from '../components/side/NewTodoPage';

export default {
  title: 'NewTodoPage',
  component: NewTodoPage,
} as ComponentMeta<typeof NewTodoPage>;

const Template: ComponentStory<typeof NewTodoPage> = (args) => <NewTodoPage {...args} />

export const Regular = Template.bind({});
Regular.args = {
  onSubmit: (name: string) => {},
  onCancel: () => {},
  onClickOutside: () => {},
  isLoading: false
}