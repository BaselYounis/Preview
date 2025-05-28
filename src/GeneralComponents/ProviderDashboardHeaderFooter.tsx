import { type FunctionComponent } from "react";
import Footer from "./Footer";
import FooterContent from "../pages/LoginPage/Components/FooterContent";
import Header from "./Header";
import DashboardButton from "./DashboardButton";
import defaultUserProfilePicture from "../assets/images/defaultUserImage.png";
interface DashboardPageHeaderFooterProps {
  children?: React.ReactNode;
  profilePicture?: string;
  providerName?: string;
}

const ProviderDashboardPageHeaderFooter: FunctionComponent<
  DashboardPageHeaderFooterProps
> = ({ children, ...props }) => {
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
            src={props.profilePicture || defaultUserProfilePicture}
            alt={props.providerName || "Provider"}
            className="w-10 h-10 rounded-full border-1 border-primary-light"
            style={profilePictureStyle}
          />
          <p className="text-primary-light  text-[12px] font-[Poppins]">
            {props.providerName || "Basel Younis"}
          </p>
        </div>
      </Header>
      <div className="flex flex-col w-[1610px] bg-amber-100 h-fit mx-auto mt-19">

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
