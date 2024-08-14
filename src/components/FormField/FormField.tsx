import { ReactElement } from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";

import style from "./FormField.module.scss";

interface FormFieldProps {
  label?: string;
  input?: ReactElement<typeof Input | typeof Select> | string;
}

export default function FormField(props: FormFieldProps) {
  return (
    <div className={`${style.form__wrapper} ${props.label && style.labeled}`}>
      {props.label && <p className={style.form__label}>{props.label}: </p>}
      <div className={style.form__input}>{props.input}</div>
    </div>
  );
}

