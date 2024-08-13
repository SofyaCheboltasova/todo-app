import { ModalProps } from "../../components/Modal/Modal";
import { Status } from "../../entities";

export default function getTasksFromStorage(props: Status): ModalProps[] {
  const storedTasks = localStorage.getItem("tasks");
  const parsedTasks = storedTasks
    ? JSON.parse(storedTasks)
    : {
        [Status.done]: [],
        [Status.progress]: [],
        [Status.notStarted]: [],
      };

  return parsedTasks[props];
}

