import { useState, type FunctionComponent } from "react";
import type { PopUpComponentProps } from "../../../GeneralComponents/PopUpComponent";
import PopUpComponent from "../../../GeneralComponents/PopUpComponent";
import type { serviceData } from "../HelperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTools } from "@fortawesome/free-solid-svg-icons";
import MainCategoryDropdown from "./MainCategoryDropdown";
import SubCategoryDropdown from "./SubCategoryDropdown";
import TextArea from "../../../GeneralComponents/TextArea";
import TextField from "../../../GeneralComponents/TextField";
import RemoteOnSiteDropdown from "./RemoteOnSiteDropdown";
import DateField from "../../../GeneralComponents/DateField";
import Button from "../../../GeneralComponents/Button";
import { theme } from "../../../Constants/Colors";

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
    <PopUpComponent {...props} className="items-center w-150 h-fit">
      <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-primary-light">
        <FontAwesomeIcon icon={faTools} className="text-white text-2xl" />
      </div>
      <div className="font-[Poppins] text-2xl text-primary-light mt-5">
        Create Service
      </div>
      <MainCategoryDropdown
        mainCategory={service?.main_category}
        setMainCategory={(category) => {
          updateServiceField("main_category", category);
          updateServiceField("sub_category", undefined); // Reset sub-category when main category changes
        }}
        className="mt-5"
      />
      <SubCategoryDropdown
        mainCategory={service?.main_category}
        subCategory={service?.sub_category}
        setSubCategory={(category) =>
          updateServiceField("sub_category", category)
        }
      />
      <RemoteOnSiteDropdown
        on_site={service?.on_site}
        setOnSite={(onSite) => updateServiceField("on_site", onSite)}
      />
      <TextField
        className="mt-5"
        value={service?.pay_rate?.toString() || ""}
        setValue={(value) =>
          updateServiceField("pay_rate", parseFloat(value) || 0)
        }
        placeholder="Enter pay rate"
        widthFactor={1.125}
      />
      <DateField
        date={service?.available_on}
        setDate={(date) => updateServiceField("available_on", date)}
        widthFactor={1.125}
        className="mt-5"
        label="Available On"
      />
      <TextArea
        text={service?.description}
        setText={(text) => updateServiceField("description", text)}
        className="mt-5"
        placeholder="Enter service description"
      />
      <Button
        label="Create Service"
        icon={faAdd}
        backgroundColor={theme.colors.primaryLight()}
        textColor="white"
        widthFactor={2}
        fontFactor={0.8}
        className="mt-5"
      />
    </PopUpComponent>
  );
};

export default MakeServicePopUpComponent;
