import { useState, type FunctionComponent } from "react";
import PopUpComponent from "../../../GeneralComponents/PopUpComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../GeneralComponents/Button";
import { theme } from "../../../Constants/Colors";
import { HitAuthBackend } from "../../../API/Communication";
import { ManpowerSupplierAPI } from "../../../API/BackendModules/ManpowerSupplier";
import { getProviderData, updateProviderData } from "../HelperFunctions";
import ErrorComponent from "../../../GeneralComponents/ErrorComponent";
async function onRemovePhotoClicked(
  setErrorMessage: (message: string) => void
) {
  const providerData = getProviderData();
  if (providerData) {
    HitAuthBackend({
      method: "PUT",
      url: ManpowerSupplierAPI.URLManager.getURL("Update/", "Current/"),
      data: { wide_profile_background: null },
    }).then((response) => {
      if (response.success) {
        localStorage.setItem(
          ManpowerSupplierAPI.CacheAddress,
          JSON.stringify({
            ...providerData,
            wide_profile_background: null,
          })
        );
        window.location.reload(); // Reload to reflect the new cover image
      } else {
        if (response.message) setErrorMessage(response.message);
      }
    });
  }
}
async function onUploadPhotoClicked(
  setErrorMessage: (message: string) => void
) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("wide_profile_background", file);
      HitAuthBackend({
        method: "PUT",
        url: ManpowerSupplierAPI.URLManager.getURL("Update/", "Current/"),
        data: formData,
      }).then((response) => {
        if (response.success) {
          updateProviderData(
            "wide_profile_background",
            response.data.wide_profile_background
          );
          window.location.reload();
        } else {
          if (response.message) {
            console.log(response.message);
            setErrorMessage(response.message);
          }
        }
      });
    }
  };
  input.click();
}

interface ChangeCoverPopUpProps {
  isOpen: boolean;
  onClose?: () => void;
}

const ChangeCoverPopUp: FunctionComponent<ChangeCoverPopUpProps> = ({
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  return (
    <PopUpComponent
      isOpen={props.isOpen}
      onClose={props.onClose}
      className="h-fit"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col h-20 w-20 bg-primary-light rounded-full items-center justify-center">
          <FontAwesomeIcon icon={faCamera} className="text-2xl text-white" />
        </div>
        <div className="flex flex-row gap-x-2 mt-10">
          <Button
            label="Remove Cover Photo"
            style={{
              width: "fit-content",
              border: `1px solid ${theme.colors.primaryLight()}`,
            }}
            textColor={theme.colors.primaryLight()}
            backgroundColor="white"
            onHoverColor={theme.colors.primaryLight()}
            onHoverTextColor="white"
            onClick={() => onRemovePhotoClicked(setErrorMessage)}
            sizeFactor={0.8}
            icon={faXmark}
          />
          <Button
            label="Upload Photo"
            style={{ width: "fit-content" }}
            textColor="white"
            backgroundColor={theme.colors.primaryLight()}
            onClick={() => onUploadPhotoClicked(setErrorMessage)}
            sizeFactor={0.8}
          />
        </div>
        {errorMessage && (
          <ErrorComponent
            errorMessage={errorMessage}
            style={{ marginTop: "10px" }}
          />
        )}
      </div>
    </PopUpComponent>
  );
};

export default ChangeCoverPopUp;
