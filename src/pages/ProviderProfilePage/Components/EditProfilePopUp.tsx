import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type FunctionComponent } from "react";
import PopUpComponent from "../../../GeneralComponents/PopUpComponent";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../GeneralComponents/Button";
import { theme } from "../../../Constants/Colors";
import ErrorComponent from "../../../GeneralComponents/ErrorComponent";
import { HitAuthBackend } from "../../../API/Communication";
import { ManpowerSupplierAPI } from "../../../API/BackendModules/ManpowerSupplier";
import { getProviderData } from "../page";

async function onRemovePhotoClicked(
  setErrorMessage: (message: string) => void
) {
  const providerData = getProviderData();
  if (providerData) {
    HitAuthBackend({
      method: "PUT",
      url: ManpowerSupplierAPI.URLManager.getURL("Update/", "Current/"),
      data: { profile_picture: null },
    }).then((response) => {
      if (response.success) {
        localStorage.setItem(
          ManpowerSupplierAPI.CacheAddress,
          JSON.stringify({
            ...providerData,
            profile_picture: null,
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
      formData.append("profile_picture", file);

      HitAuthBackend({
        method: "PUT",
        url: ManpowerSupplierAPI.URLManager.getURL("Update/", "Current/"),
        data: formData,
      }).then((response) => {
        if (response.success) {
          const providerData = getProviderData();
          if (providerData) {
            localStorage.setItem(
              ManpowerSupplierAPI.CacheAddress,
              JSON.stringify({
                ...providerData,
                profile_picture: response.data.profile_picture,
              })
            );
            window.location.reload(); // Reload to reflect the new cover image
          }
        } else {
          if (response.message) setErrorMessage(response.message);
        }
      });
    }
  };
  input.click();
}
interface EditProfilePopUpProps {
  isOpen: boolean;
  onClose?: () => void;
}

const EditProfilePopUp: FunctionComponent<EditProfilePopUpProps> = ({
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
            label="Remove Profile Photo"
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

export default EditProfilePopUp;
