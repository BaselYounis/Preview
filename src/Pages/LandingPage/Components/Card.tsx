
import type { CSSProperties, FunctionComponent, JSX } from "react";
import { theme } from "../../../Constants/Colors";

interface CardProps {
  style?: CSSProperties;
  Icon: JSX.ElementType;
  title: string;
  description: string;
}

const Card: FunctionComponent<CardProps> = ({
  Icon,
  ...props
}) => {
  const baseStyle: CSSProperties = {
    ...props.style,
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-125 border-1 border-gray-200 rounded-lg p-2"
      style={baseStyle}
    >
      <Icon style={{ fontSize: "4rem", color: theme.colors.primaryLight() }} />
      <div className="text-2xl mt-1 text-shadow-black" style={{ fontWeight: "500" }}>
      {props.title}
      </div>
      <div className="px-4 mt-2 text-center text-sm text-gray-600">
        {props.description}
      </div>
    </div>
  );
};

export default Card;
