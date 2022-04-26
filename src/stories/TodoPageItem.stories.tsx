import { ComponentStory, ComponentMeta } from '@storybook/react';
import TodoPageItem from '../components/side/TodoPageItem';

export default {
  title: 'TodoPageItem',
  component: TodoPageItem,
} as ComponentMeta<typeof TodoPageItem>;

const Template: ComponentStory<typeof TodoPageItem> = (args) => <TodoPageItem {...args} />

export const Regular = Template.bind({});
Regular.args = {
  onEditSubmit: () => {},
  onDelete: () => {},
  onClick: () => {},
  name: 'My Todo Page',
  pageId: '1'
}