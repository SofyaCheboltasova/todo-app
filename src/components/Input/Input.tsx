import { useEffect, useRef, useState } from "react";

import style from "./Input.module.scss";

interface InputProps {
  placeholder: string;
  handleEnterPressed: (value: string) => void;
  short?: boolean;
  long?: boolean;
}

export default function Input(props: InputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      props.handleEnterPressed(value);
    }
  }

  function handleClickOutside(e: MouseEvent) {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      props.handleEnterPressed(value);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [value]);

  return (
    <input
      type="text"
      value={value}
      ref={inputRef}
      className={style.input}
      placeholder={props.placeholder}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

