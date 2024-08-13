import { useState } from "react";

import style from "./Modal.module.scss";

import Input from "../Input/Input";
import Select from "../Select/Select";

import { Priority, Status } from "../../entities";
import { getRemainingTime, saveTaskToStorage } from "../../utils";

export interface ModalProps {
  title: string | undefined;
  description: string | undefined;
  priority: Priority;
  status: Status;
  dateEnd: Date;
  isOpen: boolean;
  onClose?: (savedModal: ModalProps) => void;
}

export default function Modal(props: ModalProps) {
  const { title, description, priority, status, dateEnd, isOpen, onClose } =
    props;
  const date = new Date(dateEnd);
  const state = isOpen ? "opened" : "closed";

  const [currentTitle, setCurrentTitle] = useState(title || "Task");
  const [currentDesc, setCurrentDesc] = useState(description || "Description");
  const [currentPriority, setCurrentPriority] = useState(priority);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentDate] = useState(dateEnd);

  function handleModalClose(e: React.MouseEvent<HTMLElement>) {
    if (e.target === e.currentTarget && onClose) {
      const modal: ModalProps = {
        title: currentTitle,
        description: currentDesc,
        priority: currentPriority,
        status: currentStatus,
        dateEnd: currentDate,
        isOpen: false,
      };
      console.error(modal);
      saveTaskToStorage(modal);
      onClose(modal);
    }
  }

  function getClass(className: string) {
    return `${style[className]} ${style[state]}`;
  }

  return (
    <>
      {isOpen && (
        <div
          className={getClass("background")}
          onClick={handleModalClose}
        ></div>
      )}

      <div className={getClass("wrapper")}>
        <div className={getClass("header")}>
          <Input value={currentTitle} onSubmit={setCurrentTitle} largeText />
          <Input value={currentDesc} onSubmit={setCurrentDesc} darkText />
        </div>

        <div className={getClass("info")}>
          <Select<Priority>
            title={"Priority"}
            defaultValue={currentPriority}
            options={Object.values(Priority)}
            onChange={setCurrentPriority}
          />
          <Select<Status>
            title={"Status"}
            defaultValue={currentStatus}
            options={Object.values(Status)}
            onChange={setCurrentStatus}
          />
        </div>

        <div className={getClass("date")}>
          <p>Deadline: {date.toDateString()}</p>
          <p>Expires in: {getRemainingTime(date)}</p>
        </div>
      </div>
    </>
  );
}

