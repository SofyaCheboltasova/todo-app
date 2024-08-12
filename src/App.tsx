import style from "./App.module.scss";
import { useState } from "react";

import TaskSection from "./components/TaskSection/TaskSection";
import { Status } from "./entities";
import { getTasksFromStorage } from "./utils";
import Modal, { ModalProps } from "./components/Modal/Modal";

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

  function getModalSaved(task: ModalProps): React.ReactElement {
    const { title, description, priority, status, dateEnd } = task;
    return (
      <Modal
        title={title}
        description={description}
        priority={priority}
        status={status}
        dateEnd={dateEnd}
        isOpen={false}
      />
    );
  }

  return (
    <section className={style.app__wrapper}>
      <div className={style.app__sections}>
        <TaskSection
          title={Status.done}
          modals={doneTasks && doneTasks.map((task) => getModalSaved(task))}
        />
        <TaskSection
          title={Status.progress}
          modals={
            progressTasks && progressTasks.map((task) => getModalSaved(task))
          }
        />
        <TaskSection
          title={Status.notStarted}
          modals={
            notStartedTasks &&
            notStartedTasks.map((task) => getModalSaved(task))
          }
        />
      </div>
    </section>
  );
}

