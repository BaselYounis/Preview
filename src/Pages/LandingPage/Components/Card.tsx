import { WorkOutlineOutlined } from "@mui/icons-material";

import type { CSSProperties, FunctionComponent, JSX } from "react";

interface CardProps {
  style?: CSSProperties;
  Icon?: JSX.ElementType;
}

const Card: FunctionComponent<CardProps> = ({  Icon=WorkOutlineOutlined,...props}) => {
  const baseStyle: CSSProperties = {

    ...props.style,
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-100 border-1 border-gray-200"
      style={baseStyle}
    >
      <Icon/>
      
    </div>
  );
};

export default Card;
