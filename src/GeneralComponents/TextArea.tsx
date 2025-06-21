import type { CSSProperties } from "@mui/material";
import { useState, type FunctionComponent } from "react";
interface TextAreaProps {
  text?: string;
  setText?: (text: string) => void;
  placeholder?: string;
  sizeFactor?: number;
  widthFactor?: number;
  heightFactor?: number;
  fontFactor?: number;
  style?: CSSProperties;
  className?: string;
}

const TextArea: FunctionComponent<TextAreaProps> = ({ ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const style: CSSProperties = {
    width: props.widthFactor ? `${props.widthFactor * 100}px` : "400px",
    height: props.heightFactor ? `${props.heightFactor * 100}px` : "250px",
    fontSize: props.fontFactor ? `${props.fontFactor}rem` : "1rem",
    ...props.style,
    boxShadow: isHovered ? "0px 0px 5px 2px rgba(50, 50, 50, 0.25)" : "none",
    transition: "box-shadow 0.3s ease-in-out",
  };
  return (
    <textarea
      className={`outline-0 resize-none text-primary-light scrollbar-hide border-1 border-primary-light p-2 rounded-[10px] ${props.className}`}
      style={style}
      value={props.text}
      placeholder={props.placeholder}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onChange={(e) => {
        if (props.setText) {
          console.log("TextArea onChange: " + props.text);
          props.setText(e.target.value);
        }
      }}
    />
  );
};

export default TextArea;
