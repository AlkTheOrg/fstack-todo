import { ComponentStory, ComponentMeta } from '@storybook/react';
import SubmitOrCancel from '../components/SubmitOrCancel';

export default {
  title: 'SubmitOrCancel',
  component: SubmitOrCancel,
} as ComponentMeta<typeof SubmitOrCancel>;

const Template: ComponentStory<typeof SubmitOrCancel> = (args) => <SubmitOrCancel {...args} />

export const Regular = Template.bind({});
Regular.args = {
  onClickCancel: () => {},
  onClickSubmit: () => {}
}