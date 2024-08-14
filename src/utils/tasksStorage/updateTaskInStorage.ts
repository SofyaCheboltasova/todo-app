import { ModalProps } from "../../components/Modal/Modal";
import { Status } from "../../entities/Status/Status";
import { getAllTasksFromStorage } from "./getTasksFromStorage";
import TaskStorage from "./TaskStorage";

export function updateTaskInStorage(updatedTask: ModalProps) {
  const tasks: TaskStorage = getAllTasksFromStorage();

  const relatedTask =
    tasks[Status.done][updatedTask.id] ||
    tasks[Status.notStarted][updatedTask.id] ||
    tasks[Status.progress][updatedTask.id];

  if (relatedTask && relatedTask.status !== updatedTask.status) {
    delete tasks[relatedTask.status][updatedTask.id];
  }
  tasks[updatedTask.status][updatedTask.id] = updatedTask;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

