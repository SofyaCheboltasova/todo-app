import getRemainingTime from "./getRemainingTime/getRemainingTime";
import postToStorage from "./tasksStorage/postToStorage";
import putInStorage from "./tasksStorage/putInStorage";
import getRefactoredDate from "./getRefactoredDate/getRefactoredDate";
import deleteFromStorage from "./tasksStorage/deleteFromStorage";
import { getAllTasks, getTasksByStatus } from "./tasksStorage/getFromStorage";

export {
  getRemainingTime,
  getAllTasks,
  getTasksByStatus,
  postToStorage,
  putInStorage,
  getRefactoredDate,
  deleteFromStorage,
};
