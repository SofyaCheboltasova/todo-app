import { Meta, StoryFn } from "@storybook/react";
import Modal from "./Modal";
import { Priority, Status } from "../../entities";

const meta: Meta<typeof Modal> = {
  title: "Example/Modal",
  component: Modal,
  // argTypes: {
  //   onClick: { action: 'clicked' },
  // },
};

export default meta;

const Template: StoryFn<typeof Modal> = (args) => <Modal {...args} />;

export const ModalClosed = Template.bind({});
ModalClosed.args = {
  title: "Attend Nischal’s Birthday Party",
  description:
    "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
  priority: Priority.high,
  status: Status.done,
  dateEnd: new Date("2024-08-19"),
  isOpen: false,
};

