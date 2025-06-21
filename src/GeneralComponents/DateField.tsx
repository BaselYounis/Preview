import React, { useState, type FunctionComponent } from "react";
import { theme } from "../Constants/Colors";
import ErrorComponent, { type ErrorComponentProps } from "./ErrorComponent";

interface DateFieldProps {
  date?: Date;
  setDate: (date: Date) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  sizeFactor?: number;
  widthFactor?: number;
  heightFactor?: number;
  fontFactor?: number;
  inputValidator?: (value: Date) => { success: boolean; message: string };
  ErrorComp?: React.ComponentType<ErrorComponentProps>;
  outline?: boolean;
  errorIndicator?: boolean;
  setErrorIndicator?: (value: boolean) => void;
}

const DateField: FunctionComponent<DateFieldProps> = ({
  date,
  setDate,
  label,
  placeholder = "Select a date",
  disabled = false,
  className = "",
  sizeFactor = 1,
  widthFactor = 1,
  heightFactor = 1,
  fontFactor = 1,
  inputValidator,
  ErrorComp = ErrorComponent,
  outline,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errorIndicator,
  setErrorIndicator,
}) => {
  const [isHovered, setHovered] = useState(false);
  const [allowValidation, setAllowValidation] = useState(false);
  const primaryDarkColor = theme.colors.primaryDark();

  const shadowColor = primaryDarkColor.startsWith("#")
    ? `rgba(${parseInt(primaryDarkColor.slice(1, 3), 16)}, ${parseInt(primaryDarkColor.slice(3, 5), 16)}, ${parseInt(primaryDarkColor.slice(5, 7), 16)}, 0.3)`
    : primaryDarkColor;
  // Convert Date to string format for input[type="date"]
  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };
  // Handle date change from input
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      const newDate = new Date(value);
      setAllowValidation(true);

      if (inputValidator && setErrorIndicator) {
        setErrorIndicator(!inputValidator(newDate).success);
      }

      setDate(newDate);
    }
  };

  const baseStyle = {
    width: `${widthFactor * sizeFactor * 20}rem`,
    height: `${heightFactor * sizeFactor * 3}rem`,
    fontSize: `${fontFactor * sizeFactor}rem`,
    boxShadow: isHovered || outline ? `0px 0px 4px ${shadowColor}` : "none",
    borderRadius: "0.5rem",
    border:
      isHovered || outline
        ? `1px solid ${theme.colors.primaryLight()}`
        : "1px solid #ccc",
  };

  return (
    <div className={className}>
      {label && (
        <div
          style={{
            fontFamily: "Poppins",
            fontSize: `${sizeFactor * fontFactor * 0.9}rem`,
          }}
          className="text-primary-light"
        >
          {label}
        </div>
      )}
      <div
        style={baseStyle}
        className="flex flex-col p-2 items-center justify-center mt-1 transition-all duration-200 ease-in-out"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <input
          type="date"
          value={date ? formatDateForInput(date) : ""}
          onChange={handleDateChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            fontSize: `${sizeFactor * fontFactor}rem`,
            fontFamily: "Poppins",
          }}
          className="bg-white"
        />
      </div>
      {allowValidation &&
        date &&
        inputValidator &&
        !inputValidator(date).success &&
        ErrorComp && <ErrorComp errorMessage={inputValidator(date).message} />}
    </div>
  );
};

export default DateField;
