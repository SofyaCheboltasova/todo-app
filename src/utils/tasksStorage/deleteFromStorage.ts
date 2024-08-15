import { getAllTasks } from "./getFromStorage";
import { TaskProps, TaskStorage, TaskType } from "./TaskStorage";

export default function deleteFromStorage(task: TaskProps): void {
  const tasks: TaskStorage = getAllTasks();
  const statusList: TaskType = tasks[task.status];
  delete statusList[task.id];

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

