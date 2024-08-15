import { Status } from "../../entities/Status/Status";
import { getAllTasks } from "./getFromStorage";
import { TaskProps, TaskStorage } from "./TaskStorage";

export default function putInStorage(updatedTask: TaskProps): void {
  const tasks: TaskStorage = getAllTasks();

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

