import { useEffect, useRef, useState } from "react";

import style from "./Input.module.scss";
import { getRefactoredDate } from "../../utils";

interface InputProps {
  value: string;
  type: "text" | "date";
  onSubmit: (value: string) => void;
  largeText?: boolean;
  darkText?: boolean;
}

export default function Input(props: InputProps) {
  const [value, setValue] = useState<string>(props.value);
  const textareaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    const textareaElement = textareaRef.current;
    textareaElement &&
      textareaElement.addEventListener("keydown", handleKeyDown);

    return () => {
      textareaElement &&
        textareaElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [value]);

  function getStyleClass(): string {
    const { largeText, darkText } = props;
    return `${largeText && style["large"]} ${darkText && style["dark"]}`;
  }

  function capitalizeLetter(): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === "Enter" && !e.shiftKey) {
      if (props.type === "text") {
        props.onSubmit(capitalizeLetter());
      }
      textareaRef.current?.blur();
    }
  }

  function handleBlur(): void {
    if (props.type === "date") {
      props.onSubmit(getRefactoredDate(value));
    }
    textareaRef.current?.blur();
  }

  return (
    <input
      ref={textareaRef}
      value={value}
      type={props.type}
      placeholder={"Start typing"}
      className={`${style.input} ${getStyleClass()}`}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
    />
  );
}

