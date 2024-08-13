import { ModalProps } from "../../components/Modal/Modal";
import { Status } from "../../entities";

interface TaskStorage {
  [Status.done]: ModalProps[];
  [Status.progress]: ModalProps[];
  [Status.notStarted]: ModalProps[];
}

export default function saveTaskToStorage(task: ModalProps) {
  const storedTasks = localStorage.getItem("tasks");
  const tasks: TaskStorage = storedTasks
    ? JSON.parse(storedTasks)
    : {
        [Status.done]: [],
        [Status.progress]: [],
        [Status.notStarted]: [],
      };

  switch (task.status) {
    case Status.notStarted:
      tasks[Status.notStarted].push(task);
      break;
    case Status.progress:
      tasks[Status.progress].push(task);
      break;
    case Status.done:
      tasks[Status.done].push(task);
      break;
    default:
      console.error("Unknown status:", task.status);
      return;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

