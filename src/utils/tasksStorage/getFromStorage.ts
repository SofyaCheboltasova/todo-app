import { Status } from "../../entities";
import { TaskProps, TaskStorage } from "./TaskStorage";

export function getAllTasks(): TaskStorage {
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

export function getTasksByStatus(status: Status): TaskProps[] {
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

