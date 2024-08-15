import { useEffect, useState } from "react";
import style from "./TaskSection.module.scss";

import Button, { ButtonProps } from "../Button/Button";
import Modal, { ModalProps } from "../Modal/Modal";
import { Status } from "../../entities";
import { deleteFromStorage, postToStorage, TaskProps } from "../../utils";

interface TaskSectionProps {
  sectionName: Status;
  onUpdate: () => void;
  tasks?: TaskProps[];
}

export default function TaskSection(props: TaskSectionProps) {
  const { sectionName, onUpdate } = props;
  const [tasks, setTasks] = useState<TaskProps[] | undefined>(props.tasks);

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

  const addButtonProps: ButtonProps = {
    type: { add: true },
    width: { wide: true },
    color: { unset: true },
    onClick: handleAdd,
  };

  function handleAdd(): void {
    postToStorage(sectionName);
    onUpdate();
  }

  function handleDelete(task: TaskProps): void {
    deleteFromStorage(task);
    onUpdate();
  }

  function getModalTag(task: TaskProps): React.ReactElement<ModalProps> {
    return (
      <Modal
        {...task}
        isOpen={false}
        onUpdate={onUpdate}
        onDelete={handleDelete}
      />
    );
  }

  const colorTheme: string = {
    [Status.done]: style.done,
    [Status.progress]: style.progress,
    [Status.notStarted]: style.notStarted,
  }[props.sectionName];

  return (
    <>
      <section className={`${style.taskSection} ${colorTheme}`}>
        <h2>{sectionName}</h2>
        <Button {...addButtonProps} />
        <ul className={style.list}>
          {tasks &&
            tasks.map((task) => <li key={task.id}>{getModalTag(task)}</li>)}
        </ul>
      </section>
    </>
  );
}

