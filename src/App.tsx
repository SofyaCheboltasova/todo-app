import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import style from "./App.module.scss";

import { Priority, Status } from "./entities";
import {
  getRefactoredDate,
  getStatusTasksFromStorage,
  saveTaskToStorage,
} from "./utils";
import { ModalProps } from "./components/Modal/Modal";
import TaskSection from "./components/TaskSection/TaskSection";

export default function App() {
  const [doneTasks, setDoneTasks] = useState<ModalProps[]>(
    getStatusTasksFromStorage(Status.done)
  );
  const [progressTasks, setProgressTasks] = useState<ModalProps[]>(
    getStatusTasksFromStorage(Status.progress)
  );
  const [notStartedTasks, setNotStartedTasks] = useState<ModalProps[]>(
    getStatusTasksFromStorage(Status.notStarted)
  );

  function updateLists(): void {
    setDoneTasks([...getStatusTasksFromStorage(Status.done)]);
    setProgressTasks([...getStatusTasksFromStorage(Status.progress)]);
    setNotStartedTasks([...getStatusTasksFromStorage(Status.notStarted)]);
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
    saveTaskToStorage(newTask);
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
        />
        <TaskSection
          sectionName={Status.progress}
          tasks={progressTasks}
          onAddTask={addNewTask}
          onUpdate={updateLists}
        />
        <TaskSection
          sectionName={Status.notStarted}
          tasks={notStartedTasks}
          onAddTask={addNewTask}
          onUpdate={updateLists}
        />
      </div>
    </section>
  );
}

