import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FiSearch } from 'react-icons/fi';
import Search from '../components/Search';

export default {
  title: 'Search',
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />

export const Regular = Template.bind({});
Regular.args = {
  onChange: (val :string) => console.log(val),
  SearchIcon: FiSearch
}