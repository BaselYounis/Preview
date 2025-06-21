import { useState, type FunctionComponent } from "react";
import PopUpComponent, {
  type PopUpComponentProps,
} from "../../../GeneralComponents/PopUpComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faX } from "@fortawesome/free-solid-svg-icons";
import TextArea from "../../../GeneralComponents/TextArea";
import Button from "../../../GeneralComponents/Button";
import { theme } from "../../../Constants/Colors";
import { HitAuthBackend } from "../../../API/Communication";
import ErrorComponent from "../../../GeneralComponents/ErrorComponent";
import { ManpowerSupplierAPI } from "../../../API/BackendModules/ManpowerSupplier";
import { updateProviderData } from "../HelperFunctions";
interface EditDescriptionPopUpProps extends PopUpComponentProps {
  onCancel?: () => void;
  description?: string;
}

async function onConfirmClicked(
  description: string,
  setErrorMessage: (message: string | undefined) => void
) {
  const url = ManpowerSupplierAPI.URLManager.getURL("Update/", "Current/");
  await HitAuthBackend({
    url: url,
    method: "PUT",
    data: { description },
  }).then((res) => {
    if (res.success) {
      updateProviderData("description", description);
      // console.log(res.data)
      window.location.reload();
    } else {
      setErrorMessage(res.message);
      setTimeout(() => {
        setErrorMessage(undefined);
      }, 3000);
    }
  });
}

const EditDescriptionPopUp: FunctionComponent<EditDescriptionPopUpProps> = ({
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [description, setDescription] = useState<string | undefined>(
    props.description
  );
  return (
    <PopUpComponent {...props} className="w-125 h-fit items-center">
      <div className="flex flex-col bg-primary-light rounded-[100px] h-20 w-20 items-center justify-center mt-5">
        <FontAwesomeIcon icon={faEdit} className="text-white text-2xl" />
      </div>
      <div className="font-[Poppins] text-2xl text-primary-light mt-5">
        Edit Description
      </div>
      <TextArea
        text={description || ""}
        setText={setDescription}
        placeholder="Enter description"
        className="mt-5 font-[Poppins] text-primary-light"
      />
      <div className="flex flex-row gap-x-4 mt-5">
        <Button
          label="Cancel"
          icon={faX}
          className="border-1"
          onHoverColor={theme.colors.primaryLight()}
          onHoverTextColor="white"
          widthFactor={1.5}
          onClick={props.onCancel}
          sizeFactor={0.8}
        />
        <Button
          label="Confirm"
          icon={faCheck}
          backgroundColor={theme.colors.primaryLight()}
          textColor="white"
          sizeFactor={0.8}
          widthFactor={2.3}
          onClick={() => {
            if (description) onConfirmClicked(description, setErrorMessage);
          }}
        />
      </div>
      {errorMessage && (
        <ErrorComponent errorMessage={errorMessage} className="mt-5" />
      )}
    </PopUpComponent>
  );
};

export default EditDescriptionPopUp;
