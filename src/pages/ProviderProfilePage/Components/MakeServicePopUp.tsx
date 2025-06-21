import { useState, type FunctionComponent } from "react";
import type { PopUpComponentProps } from "../../../GeneralComponents/PopUpComponent";
import PopUpComponent from "../../../GeneralComponents/PopUpComponent";
import type { serviceData } from "../HelperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import MainCategoryDropdown from "./MainCategoryDropdown";
import SubCategoryDropdown from "./SubCategoryDropdown";

interface MakeServicePopUpComponentProps extends PopUpComponentProps {
  service?: serviceData;
}

const MakeServicePopUpComponent: FunctionComponent<
  MakeServicePopUpComponentProps
> = ({ ...props }) => {
  const [service, setService] = useState<serviceData | undefined>(
    props.service
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateServiceField = (field: keyof serviceData, value: any) => {
    setService((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <PopUpComponent {...props} className="items-center w-150 h-150">
      <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-primary-light">
        <FontAwesomeIcon icon={faTools} className="text-white text-2xl" />
      </div>
      <div className="font-[Poppins] text-2xl text-primary-light mt-5">
        Create Service
      </div>
      <MainCategoryDropdown
        mainCategory={service?.main_category}
        setMainCategory={(category) =>
          updateServiceField("main_category", category)
        }
        className="mt-5"
      />
      <SubCategoryDropdown
        mainCategory={service?.main_category}
        subCategory={service?.sub_category}
        setSubCategory={(category) =>
          updateServiceField("sub_category", category)
        }
      />
    </PopUpComponent>
  );
};

export default MakeServicePopUpComponent;
