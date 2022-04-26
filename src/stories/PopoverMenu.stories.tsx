import { ComponentStory, ComponentMeta } from '@storybook/react';
import PopoverMenu from '../components/PopoverMenu';

export default {
  title: 'PopoverMenu',
  component: PopoverMenu,
} as ComponentMeta<typeof PopoverMenu>;

const Template: ComponentStory<typeof PopoverMenu> = (args) => <PopoverMenu {...args} />

export const Regular = Template.bind({});
Regular.args = {
  baseClass: "",
  popoverClass: "PopoverMenu-popover",
  popoverWrapperClass: "PopoverMenu-popover-wrapper",
  popovers: [
    [
      "Ascending Date",
      () => {}
    ],
    [
      "Descending Date",
      () => {}
    ],
    [
      "Ascending Name",
      () => {}
    ],
    [
      "Descending Name",
      () => {}
    ],
  ],
  showPopover: true,
  setShowPopover: () => {}
}