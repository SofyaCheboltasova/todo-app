import { ModalProps } from "../../components/Modal/Modal";
import { Status } from "../../entities";
import { getAllTasks } from "./getFromStorage";
import TaskStorage from "./TaskStorage";

export default function postToStorage(task: ModalProps) {
  const tasks: TaskStorage = getAllTasks();

  switch (task.status) {
    case Status.notStarted:
      tasks[Status.notStarted][task.id] = task;
      break;
    case Status.progress:
      tasks[Status.progress][task.id] = task;
      break;
    case Status.done:
      tasks[Status.done][task.id] = task;
      break;
    default:
      console.error("Unknown status:", task.status);
      return;
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

