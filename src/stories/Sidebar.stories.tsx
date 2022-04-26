import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FC } from "react";
import { Provider } from "react-redux";
import Sidebar from "../components/side/Sidebar";
import { store } from "../store";

const StoreWrapper: FC<any> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default {
  title: "Sidebar",
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => (
  <Sidebar {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  classes: ["Sidebar"]
}
Regular.decorators = [
  (story) => <StoreWrapper>{story()}</StoreWrapper>,
];
