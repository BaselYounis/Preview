import type { CSSProperties } from "@mui/material";
import { useEffect, useState, type FunctionComponent } from "react";
import { theme } from "../Constants/Colors";

interface DropDownComponentProps {
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

const DropDownComponent: FunctionComponent<DropDownComponentProps> = ({
  children,
  ...props
}) => {
  const [translationOffset, setTranslationOffset] = useState(0);
  const baseStyle: CSSProperties = {
    position: "absolute",
    transform: `translateY(${translationOffset}px)`,
    ...props.style,
  };

  useEffect(() => {
    setTranslationOffset(10);
  }, []);

  return (
    <div>
      <div
        className={`flex flex-col z-20 transition-all duration-500 ease-in-out rounded-[10px] border-2 border-gray-600 ${props.className}`}
        style={baseStyle}
      >
        {children}
        Hello World
      </div>
    </div>
  );
};

interface DropdownMenuProps {
  sizeFactor?: number;
  widthFactor?: number;
  heightFactor?: number;
  fontFactor?: number;
  children?: React.ReactNode;
  dropDownChildren?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  dropDownStyle?: CSSProperties;
  dropDownClassName?: string;
  selections?: string[];
  selected?: string;
  setSelected?: (selection: string) => void;
  onTrigger?: () => void;
  offTrigger?: () => void;
}

const DropdownMenu: FunctionComponent<DropdownMenuProps> = ({
  heightFactor = 1,
  sizeFactor = 1,
  widthFactor = 1,
  fontFactor = 1,
  onTrigger,
  offTrigger,
  className,
  style,
  ...props
}) => {
  const [triggered, setTriggered] = useState(false);
  const primaryDarkColor = theme.colors.primaryDark();
  const shadowColor = primaryDarkColor.startsWith("#")
    ? `rgba(${parseInt(primaryDarkColor.slice(1, 3), 16)}, ${parseInt(primaryDarkColor.slice(3, 5), 16)}, ${parseInt(primaryDarkColor.slice(5, 7), 16)}, 0.3)`
    : primaryDarkColor;
  const [isHovered, setHovered] = useState(false);
  const baseStyle = {
    width: `${widthFactor * sizeFactor * 20}rem`,
    height: `${heightFactor * sizeFactor * 3}rem`,
    fontSize: `${fontFactor * sizeFactor}rem`,
    boxShadow: isHovered ? `0px 0px 4px ${shadowColor}` : "none",
    borderRadius: "0.5rem",
    border: isHovered
      ? `1px solid ${theme.colors.primaryLight()}`
      : "1px solid #ccc",
    transition: "all 0.3s ease-in-out",
    ...style,
  };
  return (
    <div className="flex flex-col">
      <div
        className={"flex flex-row items-center justify-center" + className}
        style={baseStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          setTriggered(!triggered);
          if (triggered) {
            offTrigger?.();
          } else {
            onTrigger?.();
          }
        }}
      >
        {props.children}
        <div>Hello World</div>
      </div>

      {triggered && (
        <DropDownComponent
          children={props.dropDownChildren}
          style={props.dropDownStyle}
          className={props.dropDownClassName}
        />
      )}
    </div>
  );
};

export default DropdownMenu;
