import { ModalProps } from "../../components/Modal/Modal";
import { getAllTasks } from "./getFromStorage";
import TaskStorage, { TaskType } from "./TaskStorage";

export default function deleteFromStorage(task: ModalProps) {
  const tasks: TaskStorage = getAllTasks();
  const statusList: TaskType = tasks[task.status];
  delete statusList[task.id];

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

