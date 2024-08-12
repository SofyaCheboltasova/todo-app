import { Meta, StoryFn } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
};

export default meta;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Search = Template.bind({});
Search.args = {
  type: {
    search: true,
  },
};

export const Add = Template.bind({});
Add.args = {
  type: {
    add: true,
  },
};

