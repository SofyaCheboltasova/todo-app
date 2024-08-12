import { useState } from "react";
import style from "./Modal.module.scss";
import { getRemainingTime } from "../../utils";

interface ModalProps {
  title: string;
  description: string;
  priority: string;
  status: string;
  dateEnd: Date;
  isOpen: boolean;
}

export default function Modal(props: ModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  const state = isOpen ? "opened" : "closed";

  return (
    <div className={`${style.modal} ${style[state]}`} onClick={handleClick}>
      <div>
        <h2 className={style.title}>{props.title}</h2>
        <p className={style.description}>{props.description}</p>
      </div>

      <div className={`${style.info} ${style[state]}`}>
        <p>
          Priority: <span className={style.priority}>{props.priority}</span>
        </p>
        <div>
          Status: <span className={style.status}>{props.status}</span>
        </div>
      </div>

      <div className={`${style.date} ${style[state]}`}>
        <div>Deadline: {props.dateEnd.toDateString()}</div>
        <div>Expires in: {getRemainingTime(props.dateEnd)}</div>
      </div>
    </div>
  );
}

