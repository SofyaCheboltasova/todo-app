import { useState } from "react";

import style from "./App.module.scss";

import { Status } from "./entities";
import { getTasksByStatus, TaskProps } from "./utils";
import TaskSection from "./components/TaskSection/TaskSection";

export default function App() {
  const [doneTasks, setDoneTasks] = useState<TaskProps[]>(
    getTasksByStatus(Status.done)
  );
  const [progressTasks, setProgressTasks] = useState<TaskProps[]>(
    getTasksByStatus(Status.progress)
  );
  const [notStartedTasks, setNotStartedTasks] = useState<TaskProps[]>(
    getTasksByStatus(Status.notStarted)
  );

  function updateLists(): void {
    setDoneTasks([...getTasksByStatus(Status.done)]);
    setProgressTasks([...getTasksByStatus(Status.progress)]);
    setNotStartedTasks([...getTasksByStatus(Status.notStarted)]);
  }

  return (
    <section className={style.app__wrapper}>
      <div className={style.app__sections}>
        <TaskSection
          sectionName={Status.done}
          tasks={doneTasks}
          onUpdate={updateLists}
        />
        <TaskSection
          sectionName={Status.progress}
          tasks={progressTasks}
          onUpdate={updateLists}
        />
        <TaskSection
          sectionName={Status.notStarted}
          tasks={notStartedTasks}
          onUpdate={updateLists}
        />
      </div>
    </section>
  );
}

