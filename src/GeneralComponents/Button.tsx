import { useState, type CSSProperties, type FunctionComponent } from "react";

interface ButtonProps {
  onClick?: () => void;
  label?: string;
  sizeFactor?: number;
  widthFactor?: number;
  heightFactor?: number;
  textColor?: string;
  backgroundColor?: string;
  style?: CSSProperties;
  onHoverColor?: string;
  onHoverTextColor?: string;
}

const Button: FunctionComponent<ButtonProps> = ({
  sizeFactor = 1,
  widthFactor = 1,
  heightFactor = 1,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const baseStyle: CSSProperties = {
    padding: `${sizeFactor * 10}px`,
    borderRadius: `${sizeFactor * 5}px`,
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    backgroundColor:
      isHovered && props.onHoverColor
        ? props.onHoverColor
        : props.backgroundColor || "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    color:
      isHovered && props.onHoverTextColor
        ? props.onHoverTextColor
        : props.textColor || "#000000",
    fontFamily: "sans-serif",
    fontWeight: "400",

    width: `${widthFactor * 75}px`,
    height: `${heightFactor * 40}px`,
    fontSize: `${sizeFactor * 18}px`,
    ...props.style,
  };
  return (
    <div
      style={baseStyle}
      onClick={props.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="transition-all duration-300 ease-in-out"
    >
      {props.label || "Login"}
    </div>
  );
};

export default Button;
