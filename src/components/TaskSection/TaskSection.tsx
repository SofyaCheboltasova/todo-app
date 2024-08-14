import { useEffect, useState } from "react";
import style from "./TaskSection.module.scss";

import Button, { ButtonProps } from "../Button/Button";
import Modal, { ModalProps } from "../Modal/Modal";
import { getStatusTasksFromStorage } from "../../utils";
import { Status } from "../../entities";

interface TaskSectionProps {
  sectionName: Status;
  onAddTask: (status: Status) => void;
  onUpdate: () => void;
  tasks?: ModalProps[];
}

export default function TaskSection(props: TaskSectionProps) {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [tasks, setTasks] = useState<ModalProps[] | undefined>(props.tasks);

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

  const addButtonProps: ButtonProps = {
    type: { add: true },
    width: { wide: true },
    color: { unset: true },
    onClick: () => props.onAddTask(props.sectionName),
  };

  function handleClose(): void {
    setIsModalOpened(false);
    const updatedTaskList: ModalProps[] = Object.values(
      getStatusTasksFromStorage(props.sectionName)
    );
    setTasks(updatedTaskList);
  }

  function getModalTag(task: ModalProps): React.ReactElement<ModalProps> {
    const { id, title, description, priority, status, dateEnd, isOpen } = task;
    return (
      <Modal
        id={id}
        title={title}
        description={description}
        priority={priority}
        status={status}
        dateEnd={dateEnd}
        isOpen={isOpen}
        onClose={handleClose}
        onUpdate={props.onUpdate}
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
        <h2>{props.sectionName}</h2>
        <Button {...addButtonProps} />
        <ul className={style.list}>
          {tasks &&
            tasks.map((task) => (
              <li key={task.id}>
                {getModalTag({ ...task, isOpen: isModalOpened || false })}
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}

