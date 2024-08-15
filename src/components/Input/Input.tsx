import { useEffect, useRef, useState } from "react";

import style from "./Input.module.scss";
import { getRefactoredDate } from "../../utils";

interface InputProps {
  value: string;
  onSubmit: (value: string) => void;
  largeText?: boolean;
  darkText?: boolean;
  type?: "textarea" | "date";
}

export default function Input(props: InputProps) {
  const { type = "textarea", onSubmit } = props;
  const [value, setValue] = useState<string>(props.value);
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    const element = ref.current;
    element &&
      element.addEventListener("keydown", handleKeyDown as EventListener);

    return () => {
      element &&
        element.removeEventListener("keydown", handleKeyDown as EventListener);
    };
  }, [value]);

  function getStyleClass(): string {
    const { largeText, darkText } = props;
    return `${largeText && style["large"]} ${darkText && style["dark"]}`;
  }

  function capitalizeLetter(): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      if (type === "textarea") {
        onSubmit(capitalizeLetter());
        ref.current?.scrollTo({ top: 0 });
      }
      ref.current?.blur();
    }
  }

  function handleBlur(): void {
    if (type === "date") {
      onSubmit(getRefactoredDate(value));
    }
    ref.current?.blur();
  }

  function getTag() {
    switch (type) {
      case "textarea": {
        return (
          <textarea
            ref={ref as React.RefObject<HTMLTextAreaElement>}
            value={value}
            placeholder="Start typing"
            className={`${style.input} ${getStyleClass()}`}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
          />
        );
      }
      default: {
        return (
          <input
            ref={ref as React.RefObject<HTMLInputElement>}
            value={value}
            type={type}
            placeholder="Start typing"
            className={`${style.input} ${getStyleClass()}`}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
          />
        );
      }
    }
  }

  return getTag();
}
