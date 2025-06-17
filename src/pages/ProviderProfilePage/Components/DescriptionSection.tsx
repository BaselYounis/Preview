import { useState, type FunctionComponent } from "react";
import { getProviderData } from "../HelperFunctions";
import { type CSSProperties } from "@mui/material";
import Button from "../../../GeneralComponents/Button";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

interface DescriptionSectionProps {
  description?: string;
  name?: string;
}

const DescriptionSection: FunctionComponent<DescriptionSectionProps> = ({
  ...props
}) => {
  const providerData = getProviderData();
  const [isHovered, setIsHovered] = useState(false);
  const style: CSSProperties = {
    boxShadow: isHovered ? "0px 0px 2px rgba(50, 50, 50, 0.3)" : "none",
    border: isHovered ? "1px solid #E0E0E0" : "1px solid transparent",
  };
  return (
    <div
      className="flex flex-col w-full bg-white hover:border-1 hover:-translate-y-1 mt-10 rounded-[10px] p-2 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
    >
      <div className="flex flex-row items-center w-full">
        <div className="font-[Poppins] font-[500] text-2xl">
          About {providerData?.organization_name}
        </div>
        <Button label={undefined} icon={faEdit} className="ml-auto" widthFactor={0.5}/>
      </div>
      <div className="mt-5">
        {props.description || "No description available."}
      </div>
    </div>
  );
};

export default DescriptionSection;
