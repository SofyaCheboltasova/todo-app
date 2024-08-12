import { ModalProps } from "../../components/Modal/Modal";
import { Status } from "../../entities";

interface TaskStorage {
  notStarted: ModalProps[];
  inProgress: ModalProps[];
  done: ModalProps[];
}

export default function saveTaskToStorage(task: ModalProps) {
  const storedTasks = localStorage.getItem("tasks");
  const tasks: TaskStorage = storedTasks
    ? JSON.parse(storedTasks)
    : {
        notStarted: [],
        inProgress: [],
        done: [],
      };

  switch (task.status) {
    case Status.notStarted:
      tasks.notStarted.push(task);
      break;
    case Status.progress:
      tasks.inProgress.push(task);
      break;
    case Status.done:
      tasks.done.push(task);
      break;
    default:
      console.error("Unknown status:", task.status);
      return;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

