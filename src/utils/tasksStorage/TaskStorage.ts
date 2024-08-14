import { ModalProps } from "../../components/Modal/Modal";
import { Status } from "../../entities/Status/Status";

export type TaskType = Record<string, ModalProps>;

export default interface TaskStorage {
  [Status.done]: TaskType;
  [Status.progress]: TaskType;
  [Status.notStarted]: TaskType;
}

