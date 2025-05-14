import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type FunctionComponent } from "react";
export interface ErrorComponentProps {
  errorMessage?: React.ReactNode;
}

const ErrorComponent: FunctionComponent<ErrorComponentProps> = ({
  errorMessage="Error Message",
}) => {
  return (
    <div
      className="flex flex-row text-error-red items-center gap-x-1"
      style={{ fontFamily: "Poppins", fontSize: "15px" }}
    >
      <FontAwesomeIcon icon={faCircleExclamation} />
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorComponent;
