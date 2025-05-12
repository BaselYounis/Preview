import { type FunctionComponent } from "react";
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
}

const TextField: FunctionComponent<TextFieldProps> = ({
  sizeFactor = 1,
  widthFactor = 1,
  heightFactor = 1,
  fontFactor = 1,
  ...props
}) => {
  const baseStyle = {
    width: `${widthFactor * sizeFactor * 20}rem`,
    height: `${heightFactor * sizeFactor * 3}rem`,
    fontSize: `${fontFactor*sizeFactor}rem`,

    borderRadius: "0.5rem",
    border: "1px solid #ccc",
    ...props.style,
  };
  return (
    <div className={props.className}>
      {props.label && (
        <div style={{ fontFamily: "Poppins" ,fontSize: `${sizeFactor*fontFactor*0.9}rem` }} className="text-primary-light">
          {props.label}
        </div>
      )}
      <div
        style={baseStyle}
        className="flex flex-col p-2 items-center  justify-center mt-1"
      >
        <input
          {...props}
          value={props.value}
          onChange={(e) => {
            props.onChange?.(e);
            props.setValue(e.target.value);
          }}
          
          placeholder={props.placeholder || "Enter text here..."}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            fontSize: `${sizeFactor*fontFactor}rem`,
          }}
          className="bg-white"
        />
      </div>
    </div>
  );
};

export default TextField;
