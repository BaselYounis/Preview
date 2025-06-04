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
  const [opacity, setOpacity] = useState(0);
  const baseStyle: CSSProperties = {
    position: "absolute",
    transform: `translateY(${translationOffset}px)`,
    opacity: opacity,
    border: "0.5px solid #ccc",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
    ...props.style,
  };

  useEffect(() => {
    setTranslationOffset(10);
    setOpacity(1);
  }, []);

  return (
    <div>
      <div
        className={`flex flex-col bg-white z-20 transition-all duration-500 ease-in-out 
          border-0.5 border-[1px] border-gray-200 p-2 ${props.className}`}
        style={baseStyle}
      >
        {children}
      </div>
    </div>
  );
};

interface DropDownTemplateProps {
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

const DropDownTemplate: FunctionComponent<DropDownTemplateProps> = ({
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
  const customWidth = `${widthFactor * sizeFactor * 15}rem`;
  const customFontSize = `${fontFactor * sizeFactor}rem`;
  const customBorderRadius = `${0.3 * sizeFactor}rem`;
  const [triggered, setTriggered] = useState(false);
  const primaryDarkColor = theme.colors.primaryDark();
  const shadowColor = primaryDarkColor.startsWith("#")
    ? `rgba(${parseInt(primaryDarkColor.slice(1, 3), 16)}, ${parseInt(primaryDarkColor.slice(3, 5), 16)}, ${parseInt(primaryDarkColor.slice(5, 7), 16)}, 0.3)`
    : primaryDarkColor;
  const [isHovered, setHovered] = useState(false);
  const baseStyle = {
    width: "100%",
    height: `${heightFactor * sizeFactor * 3}rem`,
    fontSize: customFontSize,
    boxShadow: triggered ? `0px 0px 4px ${shadowColor}` : "none",
    borderRadius: customBorderRadius,
    border:
      isHovered || triggered
        ? `1px solid ${theme.colors.primaryLight()}`
        : "1px solid #ccc",
    transition: "all 0.3s ease-in-out",
    ...style,
  };
  return (
    <div className="flex flex-col" style={{ width: customWidth }}>
      <div
        className={"flex flex-row items-center  p-2 " + className}
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
      </div>

      {triggered && (
        <DropDownComponent
          children={props.dropDownChildren}
          style={{
            width: customWidth,
            borderRadius: customBorderRadius,
            ...props.dropDownStyle,
            fontSize: customFontSize,
          }}
          className={props.dropDownClassName}
        />
      )}
    </div>
  );
};

export default DropDownTemplate;
