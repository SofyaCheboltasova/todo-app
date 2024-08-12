import { useState } from "react";
import style from "./Modal.module.scss";
import { getRemainingTime } from "../../utils";

interface ModalProps {
  title: string;
  description: string;
  priority: string;
  dateStart: Date;
  dateEnd: Date;
  isOpen: boolean;
}

export default function Modal(props: ModalProps) {
  const [state, setState] = useState<boolean>(props.isOpen);

  function handleClick() {
    setState(!state);
  }

  return (
    <div className={style[`modal_${state}`]} onClick={handleClick}>
      <div className={style[`header_${state}`]}>
        <h2 className={style[`title_${state}`]}>{props.title}</h2>
        <p className={style[`description_${state}`]}>{props.description}</p>
      </div>

      <div className={style[`info_${state}`]}>
        <div className={style[`priority_${state}`]}>
          Priority: {props.priority}
        </div>
        <div className={style[`date_${state}`]}>
          <div>Deadline: {props.dateEnd.toDateString()}</div>
          <div>Expires in: {getRemainingTime(props.dateEnd)}</div>
        </div>
      </div>
    </div>
  );
}

