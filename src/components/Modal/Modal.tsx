import { useEffect, useState } from "react";

import style from "./Modal.module.scss";

import Input from "../Input/Input";
import Select from "../Select/Select";
import FormField from "../FormField/FormField";

import { Priority, Status } from "../../entities";
import { getRemainingTime, putInStorage, TaskProps } from "../../utils";
import Button, { ButtonProps } from "../Button/Button";

export interface ModalProps extends TaskProps {
  isOpen: boolean;
  onDelete: (task: TaskProps) => void;
  onUpdate: () => void;
}

export default function Modal(props: ModalProps) {
  const [task, setTask] = useState<TaskProps>(props);
  const [isOpened, setIsOpened] = useState<boolean>(props.isOpen);

  const { onDelete, onUpdate } = props;

  const buttonProps: ButtonProps = {
    width: { short: true },
    color: { unset: true },
    onClick: () => {},
  };

  useEffect(() => {
    onUpdate();
  }, [task]);

  function getStyleClass(className: string): string {
    const state = isOpened ? "opened" : "closed";
    return `${style[className]} ${style[state]}`;
  }

  function getUpdatedTask<T>(key?: keyof TaskProps, value?: T): TaskProps {
    return key ? { ...task, [key]: value } : task;
  }

  function handleChange<T>(key: keyof TaskProps, value: T): void {
    const updatedTask: TaskProps = getUpdatedTask(key, value);
    putInStorage(updatedTask);
    setTask(updatedTask);
  }

  function handleDelete(): void {
    onDelete(task);
  }

  function handleOpen(): void {
    setIsOpened(true);
  }

  function handleClose(): void {
    setIsOpened(false);
  }

  return (
    <>
      {isOpened && (
        <div
          className={getStyleClass("background")}
          onClick={handleClose}
        ></div>
      )}

      <div className={getStyleClass("wrapper")}>
        <div className={getStyleClass("header")}>
          <Input
            value={task.title || "New task"}
            onSubmit={(value: string) => handleChange("title", value)}
            largeText={isOpened}
            darkText={!isOpened}
          />
          {isOpened && (
            <Input
              value={task.description || "Description"}
              onSubmit={(value: string) => handleChange("description", value)}
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
                onChange={(value: string) => handleChange("priority", value)}
              />
            }
          />
          <FormField
            label={"Status"}
            input={
              <Select<Status>
                defaultValue={task.status}
                options={Object.values(Status)}
                onChange={(value: string) => handleChange("status", value)}
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
                onSubmit={(value: string) => handleChange("dateEnd", value)}
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
            type={{ del: true }}
            onClick={handleDelete}
          />
          <Button {...buttonProps} type={{ edit: true }} onClick={handleOpen} />
        </div>
      </div>
    </>
  );
}
