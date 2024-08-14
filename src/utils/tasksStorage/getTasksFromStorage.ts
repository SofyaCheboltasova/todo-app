import { ModalProps } from "../../components/Modal/Modal";
import { Status } from "../../entities";
import TaskStorage from "./TaskStorage";

export function getAllTasksFromStorage(): TaskStorage {
  const storedTasks = localStorage.getItem("tasks");
  const tasks: TaskStorage = storedTasks
    ? JSON.parse(storedTasks)
    : {
        [Status.done]: {},
        [Status.progress]: {},
        [Status.notStarted]: {},
      };

  return tasks;
}

export function getStatusTasksFromStorage(status: Status): ModalProps[] {
  const storedTasks = localStorage.getItem("tasks");
  const tasks: TaskStorage = storedTasks
    ? JSON.parse(storedTasks)
    : {
        [Status.done]: {},
        [Status.progress]: {},
        [Status.notStarted]: {},
      };

  return Object.values(tasks[status]);
}

