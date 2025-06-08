import { useEffect, useState, type FunctionComponent } from "react";
import Footer from "./Footer";
import FooterContent from "../pages/LoginPage/Components/FooterContent";
import Header from "./Header";
import DashboardButton from "./DashboardButton";
import defaultUserProfilePicture from "../assets/images/defaultUserImage.png";
import { HitAuthBackend } from "../API/Communication";
import { ManpowerSupplierAPI } from "../API/BackendModules/ManpowerSupplier";
interface DashboardPageHeaderFooterProps {
  children?: React.ReactNode;
}

const getManpowerSupplierData = async () => {
  const url = ManpowerSupplierAPI.URLManager.getURL("Read/", "Current/");
  return await HitAuthBackend({
    method: "GET",
    url: url,
  });
};
const ProviderDashboardPageHeaderFooter: FunctionComponent<
  DashboardPageHeaderFooterProps
> = ({ children }) => {
  const [providerName, setProviderName] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    // Try to get data from localStorage first
    const cachedData = localStorage.getItem(ManpowerSupplierAPI.CacheAddress);
    const cachedTimestamp = localStorage.getItem(
      ManpowerSupplierAPI.CacheTimestampAddress
    );
    const cacheExpiry = 1 * 60 * 1000; // 1 minutes in milliseconds

    // Check if we have valid cached data
    if (cachedData && cachedTimestamp) {
      const parsedData = JSON.parse(cachedData);
      const timestamp = parseInt(cachedTimestamp, 10);

      // Use cached data if it's not expired
      if (Date.now() - timestamp < cacheExpiry) {
        if (parsedData.organization_name) {
          setProviderName(parsedData.organization_name);
          setProfilePicture(parsedData.profile_picture);
        }
        return;
      }
    }

    // If no valid cache, fetch from API
    getManpowerSupplierData().then((response) => {
      if (response.success) {
        if (response.data) {
          setProviderName(response.data.organization_name);

          // Cache the data
          localStorage.setItem(
            "manpowerSupplierData",
            JSON.stringify(response.data)
          );
          localStorage.setItem(
            "manpowerSupplierDataTimestamp",
            Date.now().toString()
          );
        }
      } else {
        console.error(
          "Failed to fetch manpower supplier data:",
          response.message
        );
      }
    });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header>
        <div className="flex flex-row gap-x-1 ml-10">
          <DashboardButton label="Profile" />
          <DashboardButton label="Market Place" />
          <DashboardButton label="Messages" />
        </div>
        <div className="flex flex-row items-center gap-x-2 ml-auto">
          <img
            src={profilePicture || defaultUserProfilePicture}
            alt={providerName || "Provider"}
            className="w-10 h-10 rounded-full border-1 border-primary-light"
            style={profilePictureStyle}
          />
          <p className="text-primary-light  text-[12px] font-[Poppins]">
            {providerName || "N/A"}
          </p>
        </div>
      </Header>
      <div className="flex flex-col w-[1610px] bg-transparent h-fit mx-auto mt-19">
        {children}
      </div>
      <Footer>
        <FooterContent />
      </Footer>
    </div>
  );
};

const profilePictureStyle: React.CSSProperties = {
  boxShadow: "0px 2px 4px rgba(50, 50, 50, 0.1)",
};
export default ProviderDashboardPageHeaderFooter;
