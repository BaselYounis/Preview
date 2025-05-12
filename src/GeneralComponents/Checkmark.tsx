import { CheckBox } from "@mui/icons-material";
import type { CSSProperties } from "@mui/material";
import { type FunctionComponent } from "react";
interface CheckmarkProps {
  sizeFactor?: number;
  value: boolean;
  label?: string;
  style?: CSSProperties;
  setValue: (value: boolean) => void;
  className?: string;
}

const Checkmark: FunctionComponent<CheckmarkProps> = ({
  sizeFactor = 1,
  ...props
}) => {
  const baseStyle = {
    height: `${sizeFactor * 1}rem`,
    width: `${sizeFactor * 1}rem`,
    borderRadius: `${sizeFactor * 0.2}rem`,
    ...props.style,
  };

  return (
    <div className={`flex flex-row  items-center gap-x-2  ${props.className}`}>
      <div
        style={baseStyle}
        className="flex flex-col h-fit w-fit border-1 border-gray-light text-gray-light p-2 items-center justify-center "
        onClick={() => {
          props.setValue(!props.value);
        }}
      >
        {props.value && <CheckBox />}
      </div>
      {props.label && (
        <div
          className="text-gray-600"
          style={{ fontFamily: "Poppins", fontSize: `${sizeFactor * 0.9}rem` }}
        >
          {props.label}
        </div>
      )}
    </div>
  );
};

export default Checkmark;
