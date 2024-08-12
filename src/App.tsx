import TaskSection from "./components/TaskSection/TaskSection";
import { Status } from "./entities";
import style from "./App.module.scss";

export default function App() {
  return (
    <section className={style.app__wrapper}>
      <div className={style.app}>
        <TaskSection title={Status.done} />
        <TaskSection title={Status.progress} />
        <TaskSection title={Status.notStarted} />
      </div>
    </section>
  );
}

