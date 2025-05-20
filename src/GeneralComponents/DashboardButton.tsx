import type { CSSProperties } from "@mui/material";
import { useState, type FunctionComponent } from "react";
interface DashboardButtonProps {
  className?: string;
  style?: React.CSSProperties;
  label: string;
  onClick?: () => void;
  selected?: boolean;
  sizeFactor?: number;
  widthFactor?: number;
  heightFactor?: number;
  fontFactor?: number;
}

const DashboardButton: FunctionComponent<DashboardButtonProps> = ({
  style,
  className,
  label,
  sizeFactor = 1,
  widthFactor = 1,
  heightFactor = 1,
  fontFactor = 1,
  ...props
}) => {
  const widthConstant = 130;
  const [isHovered, setHovered] = useState(false);
  const baseStyle: CSSProperties = {
    width: `${sizeFactor * widthFactor * widthConstant}px`,
    fontFamily: "Poppins",
    ...style,
  };
  const lineStyle: CSSProperties = {
    width:
      isHovered || props.selected
        ? `${sizeFactor * widthFactor * widthConstant * 0.9}px`
        : "0px",
    height: `${sizeFactor * heightFactor * 1.5}px`,
  };
  return (
    <div
      style={baseStyle}
      className={`flex flex-col   cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p
        className="mx-auto py-1"
        style={{ fontSize: `${sizeFactor * fontFactor * 0.875}rem` }}
      >
        {label}
      </p>
      <div
        onClick={() => {
          props.onClick?.();
        }}
        style={lineStyle}
        className="bg-primary-light transition-all duration-200 ease-in-out mx-auto"
      />
    </div>
  );
};

export default DashboardButton;
