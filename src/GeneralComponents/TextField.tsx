import { type FunctionComponent } from "react";
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  sizeFactor?: number;
  widthFactor?: number;
  heightFactor?: number;
  label?: string;
  placeholder?: string;
  
}

const TextField: FunctionComponent<TextFieldProps> = (
  {sizeFactor = 1,
  widthFactor = 1,
  heightFactor = 1}
) => {
    const baseStyle = {
        width: `${widthFactor}rem`,
        height: `${heightFactor}rem`,
        fontSize: `${sizeFactor}rem`,
        padding: "0.5rem",
        borderRadius: "0.5rem",
        border: "1px solid #ccc",
    };
  return <div style={baseStyle}>Text Field</div>;
};

export default TextField;
