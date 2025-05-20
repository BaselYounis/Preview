import { type FunctionComponent } from "react";
import Footer from "./Footer";
import FooterContent from "../pages/LoginPage/Components/FooterContent";
import Header from "./Header";
import DashboardButton from "./DashboardButton";
interface DashboardPageHeaderFooterProps {
  children?: React.ReactNode;
}

const DashboardPageHeaderFooter: FunctionComponent<
  DashboardPageHeaderFooterProps
> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header>
        <div className="flex flex-row gap-x-1">
          <DashboardButton label="Dashboard" />
          <DashboardButton label="Market Place" />
          <DashboardButton label="Messages" />
        </div>
      </Header>
      {children}
      <Footer>
        <FooterContent />
      </Footer>
    </div>
  );
};

export default DashboardPageHeaderFooter;
