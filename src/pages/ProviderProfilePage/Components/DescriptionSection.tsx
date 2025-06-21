import { Fragment, useState, type FunctionComponent } from "react";
import { getProviderData } from "../HelperFunctions";
import { type CSSProperties } from "@mui/material";
import Button from "../../../GeneralComponents/Button";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../../Constants/Colors";
import EditDescriptionPopUp from "./EditDescriptionPopUp";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DescriptionSectionProps {}

const DescriptionSection: FunctionComponent<DescriptionSectionProps> = () => {
  const providerData = getProviderData();
  const [isHovered, setIsHovered] = useState(false);
  const style: CSSProperties = {
    boxShadow: isHovered ? "0px 0px 2px rgba(50, 50, 50, 0.3)" : "none",
    border: isHovered ? "1px solid #E0E0E0" : "1px solid transparent",
  };
  const [isEditDescriptionOpen, setIsEditDescriptionOpen] = useState(false);
 
  return (
    <Fragment>
      <EditDescriptionPopUp
        isOpen={isEditDescriptionOpen}
        onCancel={() => setIsEditDescriptionOpen(false)}
        onClose={() => setIsEditDescriptionOpen(false)}

      />
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
          <Button
            label={undefined}
            icon={faEdit}
            className="ml-auto"
            widthFactor={0.5}
            onHoverColor={theme.colors.primaryLight()}
            onHoverTextColor="white"
            sizeFactor={0.7}
            onClick={() => {
              setIsEditDescriptionOpen(true);
            }}
          />
        </div>
        <div className="mt-5 text-[#374151]">
          {providerData?.description || "No description available."}
        </div>
      </div>
    </Fragment>
  );
};

export default DescriptionSection;
