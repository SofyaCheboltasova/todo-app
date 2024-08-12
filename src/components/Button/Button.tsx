import style from "./Button.module.scss";

import { Paths } from "../../entities/Icons";

interface ButtonProps {
  type?: {
    search?: boolean;
    add?: boolean;
  };
}

export default function Button(props: ButtonProps) {
  function getButtonImg(): string {
    if (props.type) {
      if (props.type.search) {
        return Paths.search;
      }
      if (props.type.add) {
        return Paths.add;
      }
    }
    return "";
  }

  return (
    <button className={style.button__wrapper}>
      <img src={getButtonImg()} className={style.button__img} />
    </button>
  );
}

