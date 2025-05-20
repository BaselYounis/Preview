import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type FunctionComponent } from "react";
export interface ErrorComponentProps {
  errorMessage: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const ErrorComponent: FunctionComponent<ErrorComponentProps> = ({
  errorMessage = "Error Message",
  style,
  className,
}) => {
  return (
    <div
      className={`flex flex-row text-error-red items-center gap-x-1 ${className}`}
      style={{ fontFamily: "Poppins", fontSize: "15px", ...style }}
    >
      <FontAwesomeIcon icon={faCircleExclamation} />
      <div className="flex flex-col">
        {typeof errorMessage === "string"
          ? errorMessage.split("\n").map((line, index) => {
              const indentMatch = line.match(/^(\s+)/);
              const indent = indentMatch ? indentMatch[0].length : 0;
              return (
                <p
                  key={index}
                  style={{
                    marginLeft: `${indent * 0.5}rem`,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {line.trim()}
                </p>
              );
            })
          : errorMessage}
      </div>
    </div>
  );
};

export default ErrorComponent;
