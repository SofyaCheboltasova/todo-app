import { ModalProps } from "../../components/Modal/Modal";
import { Status } from "../../entities";
import { getAllTasksFromStorage } from "./getTasksFromStorage";
import TaskStorage from "./TaskStorage";

export default function saveTaskToStorage(task: ModalProps) {
  const tasks: TaskStorage = getAllTasksFromStorage();

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

