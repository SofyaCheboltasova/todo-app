import { Priority, Status } from "../../entities";
import getRefactoredDate from "../getRefactoredDate/getRefactoredDate";
import { getAllTasks } from "./getFromStorage";
import { TaskStorage, TaskProps } from "./TaskStorage";

import { v4 as uuidv4 } from "uuid";

const defaultTask: TaskProps = {
  id: "",
  title: "",
  description: "",
  priority: Priority.high,
  status: Status.notStarted,
  dateEnd: getRefactoredDate(),
};

export default function postToStorage(status: Status) {
  const tasks: TaskStorage = getAllTasks();
  const task = { ...defaultTask, id: uuidv4(), status: status };

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

