import { Priority } from "../../entities";
import { Status } from "../../entities/Status/Status";

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dateEnd: string;
}

export type TaskType = Record<string, TaskProps>;

export interface TaskStorage {
  [Status.done]: TaskType;
  [Status.progress]: TaskType;
  [Status.notStarted]: TaskType;
}

