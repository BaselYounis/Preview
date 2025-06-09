import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CSSProperties } from "@mui/material";
import { useEffect, useState, type FunctionComponent } from "react";
interface PopUpComponentProps {
  children?: React.ReactNode;
  isOpen: boolean;
  style?: CSSProperties;
  className?: string;
  onClose?: () => void;
}

const PopUpComponent: FunctionComponent<PopUpComponentProps> = ({
  ...props
}) => {
  const [scale, setScale] = useState(0.9);
  useEffect(() => {
    if (props.isOpen === true) {
      setTimeout(() => {
        setScale(1);
      }, 250);
    }
  }, [props.isOpen]);
  if (!props.isOpen) return null;
  const style: CSSProperties = {
    ...props.style,
    scale: scale,
  };

  return (
    <div className="flex flex-col h-[100vh] w-[100vw] fixed bg-black/50 backdrop-blur-sm z-[190] left-0 top-0 items-center justify-center ">
      <div
        className={`flex flex-col  h-100 w-100 bg-white p-5 rounded-[10px] transition-all duration-300 ${props.className}`}
        style={style}
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="ml-auto cursor-pointer text-gray-500 hover:text-primary-dark hover:scale-130 transition-all duration-300"
          onClick={() => {
            setScale(0.9);

            setTimeout(() => {
              props.onClose?.();
            }, 300);
          }}
        />
        {props.children}
      </div>
    </div>
  );
};

export default PopUpComponent;
