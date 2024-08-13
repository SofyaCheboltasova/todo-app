import { useState } from "react";

import style from "./App.module.scss";

import { Status } from "./entities";
import { getTasksFromStorage } from "./utils";
import { ModalProps } from "./components/Modal/Modal";
import TaskSection from "./components/TaskSection/TaskSection";

export default function App() {
  const [doneTasks] = useState<ModalProps[] | []>(
    getTasksFromStorage(Status.done)
  );
  const [progressTasks] = useState<ModalProps[] | []>(
    getTasksFromStorage(Status.progress)
  );
  const [notStartedTasks] = useState<ModalProps[] | []>(
    getTasksFromStorage(Status.notStarted)
  );

  console.error(doneTasks);

  return (
    <section className={style.app__wrapper}>
      <div className={style.app__sections}>
        <TaskSection title={Status.done} modals={doneTasks} />
        <TaskSection title={Status.progress} modals={progressTasks} />
        <TaskSection title={Status.notStarted} modals={notStartedTasks} />
      </div>
    </section>
  );
}

