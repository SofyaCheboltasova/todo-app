import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import style from "./App.module.scss";

import { Priority, Status } from "./entities";
import {
  getRefactoredDate,
  getTasksByStatus,
  postToStorage,
  deleteFromStorage,
} from "./utils";
import { ModalProps } from "./components/Modal/Modal";
import TaskSection from "./components/TaskSection/TaskSection";

export default function App() {
  const [doneTasks, setDoneTasks] = useState<ModalProps[]>(
    getTasksByStatus(Status.done)
  );
  const [progressTasks, setProgressTasks] = useState<ModalProps[]>(
    getTasksByStatus(Status.progress)
  );
  const [notStartedTasks, setNotStartedTasks] = useState<ModalProps[]>(
    getTasksByStatus(Status.notStarted)
  );

  function updateLists(): void {
    setDoneTasks([...getTasksByStatus(Status.done)]);
    setProgressTasks([...getTasksByStatus(Status.progress)]);
    setNotStartedTasks([...getTasksByStatus(Status.notStarted)]);
  }

  function getDefaultTask(status: Status): ModalProps {
    const defaultTask: ModalProps = {
      id: uuidv4(),
      title: "",
      description: "",
      priority: Priority.high,
      status: status,
      dateEnd: getRefactoredDate(),
      isOpen: false,
    };
    return defaultTask;
  }

  function addNewTask(status: Status): void {
    const newTask = getDefaultTask(status);
    postToStorage(newTask);
    updateLists();
  }

  function deleteTask(task: ModalProps): void {
    deleteFromStorage(task);
    updateLists();
  }

  return (
    <section className={style.app__wrapper}>
      <div className={style.app__sections}>
        <TaskSection
          sectionName={Status.done}
          tasks={doneTasks}
          onAddTask={addNewTask}
          onUpdate={updateLists}
          onDelete={deleteTask}
        />
        <TaskSection
          sectionName={Status.progress}
          tasks={progressTasks}
          onAddTask={addNewTask}
          onUpdate={updateLists}
          onDelete={deleteTask}
        />
        <TaskSection
          sectionName={Status.notStarted}
          tasks={notStartedTasks}
          onAddTask={addNewTask}
          onUpdate={updateLists}
          onDelete={deleteTask}
        />
      </div>
    </section>
  );
}

