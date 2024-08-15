import style from "./Button.module.scss";

import add from "../../assets/Images/Add.png";
import search from "../../assets/Images/Search.png";
import del from "../../assets/Images/Delete.png";
import edit from "../../assets/Images/Edit.png";

export interface ButtonProps {
  onClick: () => void;
  type?: {
    search?: boolean;
    add?: boolean;
    del?: boolean;
    edit?: boolean;
  };
  width?: {
    short?: boolean;
    wide?: boolean;
  };
  color?: {
    light?: boolean;
    dark?: boolean;
    unset?: boolean;
  };
}

export default function Button(props: ButtonProps) {
  const { onClick, type = {}, width = {}, color = {} } = props;

  function getButtonImg(): string {
    if (type) {
      if (type.search) {
        return search;
      }
      if (type.add) {
        return add;
      }
      if (type.del) {
        return del;
      }
      if (type.edit) {
        return edit;
      }
    }
    return "";
  }

  const buttonClassNames: string = [
    style.button,
    width.short ? style.short : "",
    width.wide ? style.wide : "",
    color.light ? style.light : "",
    color.dark ? style.dark : "",
    color.unset ? style.unset : "",
  ].join(" ");

  return (
    <button className={buttonClassNames} onClick={onClick}>
      <img src={getButtonImg()} className={style.button__img} />
    </button>
  );
}

