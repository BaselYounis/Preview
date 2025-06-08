import { useEffect, useState } from "react";
import ProviderDashboardPageHeaderFooter from "../../GeneralComponents/ProviderDashboardHeaderFooter";
import defaultUserProfilePicture from "../../assets/images/defaultUserImage.png";
import defaultWideProfileBackground from "../../assets/images/defaultProfileWideBackgroundBlack.png";
import Button from "../../GeneralComponents/Button";
import {
  faCamera,
  faEdit,
  faEye,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../Constants/Colors";
import { HitAuthBackend } from "../../API/Communication";
import { ManpowerSupplierAPI } from "../../API/BackendModules/ManpowerSupplier";
import PopUpComponent from "../../GeneralComponents/PopUpComponent";

type providerData = {
  organization_name: string;
  profile_picture: string | null;
  location: { governorate: string; industrial_zone: string };
  wide_profile_background: string | null;
};

async function onEditProfileClicked(providerData: providerData | null) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      // Handle the uploaded file here
      console.log("Selected file:", file);
      // Create FormData for proper file upload
      const formData = new FormData();
      formData.append("profile_picture", file);

      HitAuthBackend({
        method: "PUT",
        url: ManpowerSupplierAPI.URLManager.getURL("Update/", "Current/"),
        data: formData,
      }).then((response) => {
        if (response.success) {
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
          console.error("Failed to update profile picture:", response.message);
        }
      });
    }
  };
  input.click();
}
async function onChangeCoverClicked(providerData: providerData | null) {
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
          if (providerData) {
            localStorage.setItem(
              ManpowerSupplierAPI.CacheAddress,
              JSON.stringify({
                ...providerData,
                wide_profile_background: response.data.wide_profile_background,
              })
            );
            window.location.reload(); // Reload to reflect the new cover image
          }
        } else {
          console.error("Failed to update cover image:", response.message);
        }
      });
    }
  };
  input.click();
}

function getProviderData(): providerData | null {
  const cachedData = localStorage.getItem("manpowerSupplierData");
  if (cachedData) {
    return JSON.parse(cachedData);
  } else {
    return null;
  }
}

function HeroSection() {
  const [providerData, setProviderData] = useState<providerData | null>(null);

  useEffect(() => {
    const data = getProviderData();
    setProviderData(data);
  }, []);
  return (
    <div
      className="flex flex-col h-[495px]  w-full bg-[#E0E0E0] rounded-[15px] overflow-clip mt-20 border-[#E0E0E0]"
      style={{ boxShadow: "0px 0px 10px rgba(50, 50, 50, 0.1)" }}
    >
      <div
        className="h-full w-full bg-transparent"
        style={{
          backgroundImage: `url(${providerData?.wide_profile_background || defaultWideProfileBackground})`,
          backgroundSize: "100% 150%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <div className="flex flex-row ml-[1400px]  items-center  gap-x-2 mt-[40px] absolute">
        <Button
          style={{
            border: `1px solid ${theme.colors.primaryLight()}`,
          }}
          widthFactor={2.3}
          sizeFactor={0.9}
          icon={faCamera}
          onHoverColor={theme.colors.primaryLight()}
          onHoverTextColor="white"
          label="Change Cover"
          onClick={() => onChangeCoverClicked(providerData)}
        />
      </div>
      <div className="flex flex-row h-[200px] w-full bg-[#FFFFFF]  mt-auto">
        <div className="flex flex-col ml-55 ">
          <div className="font-[Poppins] text-2xl text-primary-dark  font-[600] mt-[20px]">
            {providerData?.organization_name || "Organization Name"}
          </div>
          <div className="font-[Poppins] flex flex-row gap-x-2 items-center text-[#6B7280]">
            <FontAwesomeIcon icon={faLocationDot} />
            {providerData?.location.governorate || "Governorate"}
            {" - "}
            {providerData?.location.industrial_zone}
          </div>
        </div>
        <div className="flex flex-row  gap-x-2 ml-auto mr-10  mt-[20px]">
          <Button
            style={{
              width: "fit-content",
              border: `1px solid ${theme.colors.primaryLight()}`,
            }}
            label="View Public Profile"
            backgroundColor="white"
            textColor={theme.colors.primaryLight()}
            onHoverColor={theme.colors.primaryLight()}
            onHoverTextColor="white"
            widthFactor={1.5}
            sizeFactor={0.9}
            icon={faEye}
          />
          <PopUpComponent isOpen={true} />
          <Button
            style={{
              width: "fit-content",
            }}
            backgroundColor={theme.colors.primaryLight()}
            textColor="white"
            label="Edit Profile"
            widthFactor={1.5}
            sizeFactor={0.9}
            icon={faEdit}
            onClick={() => onEditProfileClicked(providerData)}
          />
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center absolute bg-white
            h-[137px] w-[137px]  mt-[275px] ml-[50px] rounded-[15px]"
        style={{ boxShadow: "0px 2px 4px rgba(50, 50, 50, 0.1)" }}
      >
        <img
          className="h-[120px] w-[120px]  bg-white rounded-[10px]"
          src={providerData?.profile_picture || defaultUserProfilePicture}
          alt="User Profile"
        />
      </div>
    </div>
  );
}

function ProviderProfilePage() {
  return (
    <ProviderDashboardPageHeaderFooter>
      <HeroSection />
    </ProviderDashboardPageHeaderFooter>
  );
}

export default ProviderProfilePage;
