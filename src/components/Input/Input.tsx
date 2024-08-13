import { useEffect, useRef, useState } from "react";

import style from "./Input.module.scss";

interface InputProps {
  value: string;
  onSubmit: (value: string) => void;
  largeText?: boolean;
  darkText?: boolean;
}

export default function Input(props: InputProps) {
  const [value, setValue] = useState(props.value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textareaElement = textareaRef.current;
    if (textareaElement) {
      textareaElement.addEventListener("keydown", handleKeyDown);
    }
  }, [value, props]);

  function capitalizeLetter() {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      props.onSubmit(capitalizeLetter() || props.value);
      textareaRef.current?.blur();
    }
  }

  function handleBlur() {
    props.onSubmit(capitalizeLetter() || props.value);
    textareaRef.current?.blur();
  }

  return (
    <textarea
      ref={textareaRef}
      value={value}
      placeholder={"Start typing"}
      className={`${style.input} ${props.largeText && style["large"]} ${props.darkText && style["dark"]}`}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
    />
  );
}

