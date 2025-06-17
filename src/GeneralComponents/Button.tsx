import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  icon?: IconDefinition;
  className?: string;
}

const Button: FunctionComponent<ButtonProps> = ({
  sizeFactor = 1,
  widthFactor = 1,
  heightFactor = 1,
  ...props
}) => {
  const changeScaleWhenClicked = () => {
    setScale(0.95);
    setTimeout(() => {
      setScale(1);
    }, 200);
  };
  const [scale, setScale] = useState(1);
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
    scale: `${scale}`,
    width: `${widthFactor * 75}px`,
    height: `${heightFactor * 40}px`,
    fontSize: `${sizeFactor * 18}px`,
    ...props.style,
  };

  return (
    <div
      style={baseStyle}
      onClick={() => {
        changeScaleWhenClicked();
        props.onClick?.();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`transition-all duration-300 ease-in-out gap-x-2 ${props.className}`}
    >
      {props.icon && <FontAwesomeIcon icon={props.icon} />}
      {props.label}
    </div>
  );
};

export default Button;
