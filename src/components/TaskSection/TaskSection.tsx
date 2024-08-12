import { useState } from "react";

import style from "./TaskSection.module.scss";
import common from "../../styles/common.module.scss";

import { Priority, Status } from "../../entities";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

interface TaskSectionProps {
  title: Status;
  modals?: React.ReactElement[];
}

export default function TaskSection(props: TaskSectionProps) {
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

  return (
    <>
      {isModalOpened && (
        <Modal
          title={""}
          description={""}
          priority={Priority.high}
          status={props.title}
          dateEnd={new Date(Date.now())}
          isOpen={true}
          onClose={() => setIsModalOpened(false)}
        />
      )}

      <section className={`${style.taskSection} ${colorTheme}`}>
        <h2 className={common.title}>{props.title}</h2>
        <Button {...buttonProps} />
        <ul className={style.list}>
          {props.modals &&
            props.modals.map((modal, index) => <li key={index}>{modal}</li>)}
        </ul>
      </section>
    </>
  );
}

