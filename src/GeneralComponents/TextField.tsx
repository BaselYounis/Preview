import React, { useState, type FunctionComponent } from "react";
import { theme } from "../Constants/Colors";
import ErrorComponent, { type ErrorComponentProps } from "./ErrorComponent";
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  sizeFactor?: number;
  widthFactor?: number;
  heightFactor?: number;
  fontFactor?: number;
  label?: string;
  placeholder?: string;
  className?: string;
  value: string;
  setValue: (value: string) => void;
  inputCleaner?: (value: string) => string;
  inputValidator?: (value: string) => { success: boolean; message: string };
  ErrorComp?: React.ComponentType<ErrorComponentProps>;
}

const TextField: FunctionComponent<TextFieldProps> = ({
  sizeFactor = 1,
  widthFactor = 1,
  heightFactor = 1,
  fontFactor = 1,
  ErrorComp = ErrorComponent,
  ...props
}) => {
  const [isHovered, setHovered] = useState(false);
  const [allowValidation, setAllowValidation] = useState(false);
  const primaryDarkColor = theme.colors.primaryDark();
  // Convert the primary dark color to rgba format with lower opacity
  const shadowColor = primaryDarkColor.startsWith("#")
    ? `rgba(${parseInt(primaryDarkColor.slice(1, 3), 16)}, ${parseInt(primaryDarkColor.slice(3, 5), 16)}, ${parseInt(primaryDarkColor.slice(5, 7), 16)}, 0.3)`
    : primaryDarkColor;

  const baseStyle = {
    width: `${widthFactor * sizeFactor * 20}rem`,
    height: `${heightFactor * sizeFactor * 3}rem`,
    fontSize: `${fontFactor * sizeFactor}rem`,
    boxShadow: isHovered ? `0px 0px 4px ${shadowColor}` : "none",
    borderRadius: "0.5rem",
    border: isHovered
      ? `1px solid ${theme.colors.primaryLight()}`
      : "1px solid #ccc",
    ...props.style,
  };
  return (
    <div className={props.className}>
      {props.label && (
        <div
          style={{
            fontFamily: "Poppins",
            fontSize: `${sizeFactor * fontFactor * 0.9}rem`,
          }}
          className="text-primary-light"
        >
          {props.label}
        </div>
      )}
      <div
        style={baseStyle}
        className="flex flex-col p-2 items-center  justify-center mt-1 transition-all duration-200 ease-in-out"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <input
          {...props}
          value={props.value}
          onChange={(e) => {
            props.onChange?.(e);
            setAllowValidation(true);
            if (props.inputCleaner)
              e.target.value = props.inputCleaner(e.target.value);

            props.setValue(e.target.value);
          }}
          placeholder={props.placeholder || "Enter text here..."}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            fontSize: `${sizeFactor * fontFactor}rem`,
          }}
          className="bg-white"
        />
      </div>
      {allowValidation &&
        props.inputValidator &&
        !props.inputValidator(props.value).success &&
        ErrorComp && (
          <ErrorComp errorMessage={props.inputValidator(props.value).message} />
        )}
    </div>
  );
};

export default TextField;
