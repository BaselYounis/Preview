import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type FunctionComponent } from "react";

interface LoadingComponentProps {
  isLoading?: boolean;
  message?: string;
  style?: React.CSSProperties;
  className?: string;
  size?: "small" | "medium" | "large";
  overlay?: boolean;
}

const LoadingComponent: FunctionComponent<LoadingComponentProps> = ({
  isLoading = true,
  message = "Loading...",
  style,
  className,
  size = "medium",
  overlay = true,
}) => {
  if (!isLoading) return null;

  // Define sizes for spinner
  const sizeMap = {
    small: {
      iconSize: "2x",
      fontSize: "1rem",
    },
    medium: {
      iconSize: "4x",
      fontSize: "1.5rem",
    },
    large: {
      iconSize: "6x",
      fontSize: "2rem",
    },
  };

  const selectedSize = sizeMap[size];

  return (
    <div
      className={`${
        overlay
          ? "fixed inset-0 bg-[] bg-opacity-50 z-50 flex flex-col items-center justify-center"
          : "flex flex-col items-center justify-center"
      } ${className}`}
      style={style}
    >
      <div className="bg-white rounded-lg p-8 flex flex-col items-center justify-center">
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="text-primary-light animate-spin"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          size={selectedSize.iconSize as any}
        />
        {message && (
          <p
            className="mt-4 text-primary-light"
            style={{
              fontFamily: "Poppins",
              fontSize: selectedSize.fontSize,
              fontWeight: "500",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingComponent;
