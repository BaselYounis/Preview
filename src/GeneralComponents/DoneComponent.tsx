import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type FunctionComponent } from "react";
interface DoneComponentProps {
  message: string;
}

const DoneComponent: FunctionComponent<DoneComponentProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <FontAwesomeIcon
        icon={faCheckCircle}
        className="text-green-500 text-2xl"
      />
      <p className="mt-2 text-gray-600 font-[Poppins]">{message}</p>
    </div>
  );
};

export default DoneComponent;
