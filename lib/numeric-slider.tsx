import classNames from "classnames";
import React from "react";
import { float, NumericRange, slugify } from "./util";

export type NumericSliderProps = NumericRange & {
  id?: string;
  label: string;
  onChange: (value: number) => void;
  value: number;
  valueSuffix?: string;
  disabled?: boolean;
};

/**
 * Returns the given number to a "reasonable-looking" human
 * representation (for our purposes) that is not ridiculously
 * long.
 */
function toReasonableDecimal(value: number, maxDecimalDigits = 2): string {
  const str = value.toString();
  const fixedStr = value.toFixed(maxDecimalDigits);

  return str.length < fixedStr.length ? str : fixedStr;
}

export const NumericSlider: React.FC<NumericSliderProps> = (props) => {
  const id = props.id || slugify(props.label);

  return (
    <div
      className={classNames("thingy", "numeric-slider", {
        disabled: props.disabled,
      })}
    >
      <label htmlFor={id}>{props.label}: </label>
      <span className="slider">
        <input
          type="range"
          id={id}
          min={props.min}
          max={props.max}
          value={props.value}
          step={props.step}
          disabled={props.disabled}
          onChange={(e) => props.onChange(float(e.target.value))}
        />
        <span className="slider-value">
          {" "}
          {toReasonableDecimal(props.value)}
          {props.valueSuffix}
        </span>
      </span>
    </div>
  );
};
