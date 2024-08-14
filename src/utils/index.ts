import getRemainingTime from "./getRemainingTime/getRemainingTime";
import saveTaskToStorage from "./tasksStorage/saveTaskToStorage";
import { updateTaskInStorage } from "./tasksStorage/updateTaskInStorage";
import getRefactoredDate from "./getRefactoredDate/getRefactoredDate";
import {
  getAllTasksFromStorage,
  getStatusTasksFromStorage,
} from "./tasksStorage/getTasksFromStorage";

export {
  getRemainingTime,
  getAllTasksFromStorage,
  getStatusTasksFromStorage,
  saveTaskToStorage,
  updateTaskInStorage,
  getRefactoredDate,
};
