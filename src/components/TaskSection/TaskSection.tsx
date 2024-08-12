import style from "./TaskSection.module.scss";
import common from "../../styles/common.module.scss";
import { Status } from "../../entities";

interface TaskSectionProps {
  title: Status;
  modals: React.ReactElement[];
}

export default function TaskSection(props: TaskSectionProps) {
  const colorTheme = {
    [Status.done]: style.done,
    [Status.progress]: style.progress,
    [Status.notStarted]: style.notStarted,
  }[props.title];

  return (
    <section className={`${style.taskSection} ${colorTheme}`}>
      <h2 className={common.title}>{props.title}</h2>
      <ul className={style.list}>
        {props.modals.map((modal, index) => (
          <li key={index}>{modal}</li>
        ))}
      </ul>
    </section>
  );
}

