import { useState } from "react";
import style from "./Modal.module.scss";
import common from "../../styles/common.module.scss";
import { getRemainingTime } from "../../utils";

export interface ModalProps {
  title: string;
  description: string;
  priority: string;
  status: string;
  dateEnd: Date;
  isOpen: boolean;
}

export default function Modal(props: ModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const [, setIsPriorityChange] = useState<boolean>(false);
  const [, setIsStatusChange] = useState<boolean>(false);
  const state = isOpen ? "opened" : "closed";

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handlePriority() {
    setIsPriorityChange(true);
  }

  function handleStatus() {
    setIsStatusChange(true);
  }

  return (
    <div className={`${style.modal} ${style[state]}`} onClick={handleClick}>
      <div>
        <h2 className={common.title}>{props.title}</h2>
        <p className={style.description}>{props.description}</p>
      </div>

      <div className={`${style.info} ${style[state]}`}>
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

      <div className={`${style.date} ${style[state]}`}>
        <div>Deadline: {props.dateEnd.toDateString()}</div>
        <div>Expires in: {getRemainingTime(props.dateEnd)}</div>
      </div>
    </div>
  );
}

