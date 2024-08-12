import style from "./Button.module.scss";

import add from "../../assets/Images/Add.png";
import search from "../../assets/Images/Search.png";

interface ButtonProps {
  onClick: () => void;
  type?: {
    search?: boolean;
    add?: boolean;
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
  function getButtonImg(): string {
    if (props.type) {
      if (props.type.search) {
        return search;
      }
      if (props.type.add) {
        return add;
      }
    }
    return "";
  }

  const buttonClassNames = [
    style.button,
    props.width?.short ? style.short : "",
    props.width?.wide ? style.wide : "",
    props.color?.light ? style.light : "",
    props.color?.dark ? style.dark : "",
    props.color?.unset ? style.unset : "",
  ].join(" ");

  function handleClcik(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    props.onClick();
  }

  return (
    <button className={buttonClassNames} onClick={handleClcik}>
      <img src={getButtonImg()} className={style.button__img} />
    </button>
  );
}

