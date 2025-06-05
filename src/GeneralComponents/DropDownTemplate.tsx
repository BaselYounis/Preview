import {
  type CSSProperties,
  useEffect,
  useState,
  type FunctionComponent,
} from "react";
import { theme } from "../Constants/Colors";

// DropDown Component Props
interface DropDownComponentProps {
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

const DropDownComponent: FunctionComponent<DropDownComponentProps> = ({
  children,
  style,
  className,
}) => {
  const [translationOffset, setTranslationOffset] = useState(0);

  useEffect(() => {
    setTranslationOffset(10);
  }, []);

  return (
    <div>
      <div
        className={`flex flex-col bg-white z-20 transition-all duration-500 ease-in-out 
          border-[1px] border-gray-200  ${className || ""}`}
        style={{
          position: "absolute",
          transform: `translateY(${translationOffset}px)`,
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

// DropDown Template Props
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
  triggered: boolean;
  
}

const DropDownTemplate: FunctionComponent<DropDownTemplateProps> = ({
  heightFactor = 1,
  sizeFactor = 1,
  widthFactor = 1,
  fontFactor = 1,
  onTrigger,
  offTrigger,
  className = "",
  style,
  children,
  dropDownChildren,
  dropDownStyle,
  dropDownClassName,
  triggered,
 
  
}) => {
  const [isHovered, setHovered] = useState(false);

  // Calculate styles based on factors
  const customWidth = `${widthFactor * sizeFactor * 15}rem`;
  const customFontSize = `${fontFactor * sizeFactor}rem`;
  const customBorderRadius = `${0.3 * sizeFactor}rem`;

  // Calculate shadow color
  const primaryDarkColor = theme.colors.primaryDark();
  const shadowColor = primaryDarkColor.startsWith("#")
    ? `rgba(${parseInt(primaryDarkColor.slice(1, 3), 16)}, ${parseInt(
        primaryDarkColor.slice(3, 5),
        16
      )}, ${parseInt(primaryDarkColor.slice(5, 7), 16)}, 0.3)`
    : primaryDarkColor;

  const handleClick = () => {
    if (triggered) {

      offTrigger?.();
    } else {

      onTrigger?.();
    }
  };

  return (
    <div className="flex flex-col" style={{ width: customWidth }}>
      <div
        className={`flex flex-row items-center p-2 ${className}`}
        style={{
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
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        {children}
      </div>

      {triggered && (
        <DropDownComponent
          style={{
            width: customWidth,
            borderRadius: customBorderRadius,
            fontSize: customFontSize,
            ...dropDownStyle,
          }}
          className={dropDownClassName}
        >
          {dropDownChildren}
        </DropDownComponent>
      )}
    </div>
  );
};

export default DropDownTemplate;
