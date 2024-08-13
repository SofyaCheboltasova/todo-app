import { useState } from "react";

import style from "./TaskSection.module.scss";

import { Priority, Status } from "../../entities";
import Button from "../Button/Button";
import Modal, { ModalProps } from "../Modal/Modal";

interface TaskSectionProps {
  title: Status;
  modals?: ModalProps[];
}

export default function TaskSection(props: TaskSectionProps) {
  const [currentModals, setCurrentModals] = useState<ModalProps[] | undefined>(
    props.modals
  );

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const colorTheme = {
    [Status.done]: style.done,
    [Status.progress]: style.progress,
    [Status.notStarted]: style.notStarted,
  }[props.title];

  const buttonProps = {
    onClick: () => setIsModalOpened(true),
    type: { add: true },
    width: { wide: true },
    color: { unset: true },
  };

  function handleClose(savedModal: ModalProps) {
    setIsModalOpened(false);

    if (currentModals) {
      setCurrentModals([...currentModals, savedModal]);
    } else {
      setCurrentModals([savedModal]);
    }
  }

  function getModal(task: ModalProps): React.ReactElement {
    const { title, description, priority, status, dateEnd, isOpen } = task;
    return (
      <Modal
        title={title}
        description={description}
        priority={priority}
        status={status}
        dateEnd={dateEnd}
        isOpen={isOpen}
        onClose={handleClose}
      />
    );
  }

  const emptyModalProps: ModalProps = {
    title: undefined,
    description: undefined,
    priority: Priority.high,
    status: props.title,
    dateEnd: new Date(Date.now()),
    isOpen: true,
  };

  return (
    <>
      {isModalOpened && getModal(emptyModalProps)}

      <section className={`${style.taskSection} ${colorTheme}`}>
        <h2>{props.title}</h2>
        <Button {...buttonProps} />
        <ul className={style.list}>
          {currentModals &&
            currentModals.map((modal, index) => (
              <li key={index}>{getModal(modal)}</li>
            ))}
        </ul>
      </section>
    </>
  );
}

