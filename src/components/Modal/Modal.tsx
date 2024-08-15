import { useEffect, useRef, useState } from "react";

import style from "./Modal.module.scss";

import Input from "../Input/Input";
import Select from "../Select/Select";
import FormField from "../FormField/FormField";

import { Priority, Status } from "../../entities";
import { getRemainingTime, postToStorage, putInStorage } from "../../utils";
import Button, { ButtonProps } from "../Button/Button";

export interface ModalProps {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dateEnd: string;
  isOpen: boolean;
  onDelete?: (task: ModalProps) => void;
  onClose?: () => void;
  onUpdate?: () => void;
}

export default function Modal(props: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [task, setTask] = useState<ModalProps>(props);
  const [isOpened, setIsOpened] = useState<boolean>(props.isOpen);
  const { onDelete, onClose, onUpdate } = props;
  const state = isOpened ? "opened" : "closed";

  const buttonProps: ButtonProps = {
    width: { short: true },
    color: { unset: true },
    onClick: () => {},
  };

  useEffect(() => {
    onUpdate && onUpdate();
  }, [task]);

  function getStyleClass(className: string): string {
    return `${style[className]} ${style[state]}`;
  }

  function getUpdatedTask<T>(key?: keyof ModalProps, value?: T): ModalProps {
    return key ? { ...task, [key]: value } : task;
  }

  function handleClose(e: React.MouseEvent<HTMLElement>): void {
    if (e.target === e.currentTarget && onClose) {
      setIsOpened(false);
      const updatedTask: ModalProps = getUpdatedTask();
      postToStorage(updatedTask);
      setTask(updatedTask);
    }
  }

  function handleSubmit<T>(key: keyof ModalProps, value: T): void {
    const updatedTask: ModalProps = getUpdatedTask(key, value);
    putInStorage(updatedTask);
    setTask(updatedTask);
  }

  function handleDelete() {
    onDelete && onDelete(task);
  }

  function handleEdit() {
    if (!isOpened) {
      setIsOpened(true);
    }
  }

  return (
    <div ref={modalRef}>
      {isOpened && (
        <div
          className={getStyleClass("background")}
          onClick={handleClose}
        ></div>
      )}

      <div className={getStyleClass("wrapper")}>
        <div className={getStyleClass("header")}>
          <Input
            value={task.title || "Add task"}
            type="text"
            onSubmit={(value: string) => handleSubmit("title", value)}
            largeText={isOpened}
          />
          <p onClick={() => setIsOpened(true)}>Add description</p>
          {isOpened && (
            <Input
              value={task.description || "Add description"}
              type="text"
              onSubmit={(value: string) => handleSubmit("description", value)}
              darkText
            />
          )}
        </div>

        <div className={getStyleClass("info")}>
          <FormField
            label={"Priority"}
            input={
              <Select<Priority>
                defaultValue={task.priority}
                options={Object.values(Priority)}
                onChange={(value: string) => handleSubmit("priority", value)}
              />
            }
          />
          <FormField
            label={"Status"}
            input={
              <Select<Status>
                defaultValue={task.status}
                options={Object.values(Status)}
                onChange={(value: string) => handleSubmit("status", value)}
              />
            }
          />
        </div>

        <div className={getStyleClass("date")}>
          <FormField
            label={"Deadline"}
            input={
              <Input
                value={task.dateEnd}
                type="date"
                onSubmit={(value: string) => handleSubmit("dateEnd", value)}
              />
            }
          />
          <FormField
            label={"Expires in"}
            input={getRemainingTime(task.dateEnd)}
          />
        </div>

        <div className={getStyleClass("buttons")}>
          <Button
            {...buttonProps}
            onClick={handleDelete}
            type={{ del: true }}
          />
          <Button {...buttonProps} onClick={handleEdit} type={{ edit: true }} />
        </div>
      </div>
    </div>
  );
}

