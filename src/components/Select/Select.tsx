import style from "./Select.module.scss";

interface SelectProps<T> {
  title: string;
  defaultValue: T;
  options: T[];
  onChange: (value: T) => void;
}

export default function Select<T>(props: SelectProps<T>) {
  return (
    <label className={style.label}>
      {props.title}:
      <select
        value={props.defaultValue as string}
        onChange={(e) => props.onChange(e.target.value as T)}
        className={style.select}
      >
        {props.options.map((option) => {
          return (
            <option
              key={option as string}
              className={style.option}
              value={option as string}
            >
              {option as string}
            </option>
          );
        })}
      </select>
    </label>
  );
}

