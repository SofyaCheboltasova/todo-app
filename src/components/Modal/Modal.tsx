import { useState } from "react";

import style from "./Modal.module.scss";
import common from "../../styles/common.module.scss";

import { getRemainingTime } from "../../utils";
import { Priority, Status } from "../../entities";

export interface ModalProps {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dateEnd: Date;
  isOpen: boolean;
  onClose?: () => void;
}

export default function Modal(props: ModalProps) {
  const [, setIsPriorityChange] = useState<boolean>(false);
  const [, setIsStatusChange] = useState<boolean>(false);

  const state = props.isOpen ? "opened" : "closed";

  function handlePriority() {
    setIsPriorityChange(true);
  }

  function handleStatus() {
    setIsStatusChange(true);
  }

  function handleClose(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.target === event.currentTarget && props.onClose) {
      props.onClose();
    }
  }

  return (
    <div
      className={`${style.background} ${style[state]}`}
      onClick={handleClose}
    >
      <div className={`${style.wrapper} ${style[state]}`}>
        <div>
          <h2 className={common.title}>{props.title}</h2>
          <p className={style.description}>{props.description}</p>
        </div>

        <div className={style.info}>
          <p>
            Priority:
            <span className={style.priority} onClick={handlePriority}>
              {props.priority}
            </span>
          </p>
          <div>
            Status:
            <span className={style.status} onClick={handleStatus}>
              {props.status}
            </span>
          </div>
        </div>

        <div className={style.date}>
          <div>Deadline: {props.dateEnd.toDateString()}</div>
          <div>Expires in: {getRemainingTime(props.dateEnd)}</div>
        </div>
      </div>
    </div>
  );
}

