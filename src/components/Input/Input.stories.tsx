import { Meta, StoryFn } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Example/Input",
  component: Input,
  // argTypes: {
  //   onClick: { action: 'clicked' },
  // },
};

export default meta;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const InputClosed = Template.bind({});
InputClosed.args = {
  placeholder: "Add new task",
  handleEnterPressed: () => {},
};

