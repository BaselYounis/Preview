import { useNavigate } from "@tanstack/react-router";
import { theme } from "../../Constants/Colors";
import Button from "../../GeneralComponents/Button";
import Footer from "../../GeneralComponents/Footer";
import Header from "../../GeneralComponents/Header";
import FooterContent from "../LoginPage/Components/FooterContent";
import type { CSSProperties } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProviderForm from "./Components/ProviderForm";
import CustomerForm from "./Components/CustomerForm";
import { Route as loginRoute } from "../../routes/login";
interface AccountFeatureProps {
  label: string;
  className?: string;
  style?: CSSProperties;
}

function AccountFeature({ label, className, style }: AccountFeatureProps) {
  const baseStyle: CSSProperties = {
    fontFamily: "Poppins",
    ...style,
  };
  return (
    <div
      className={`flex flex-row items-center gap-x-2 text-primary-light ${className}`}
      style={baseStyle}
    >
      <FontAwesomeIcon icon={faCheck} className="text-green-600 text-[16px]" />
      {label}
    </div>
  );
}
interface CardProps {
  style?: CSSProperties;
  icon: typeof faScrewdriverWrench;
  headerLabel: string;
  description: string;
  buttonLabel: string;
  children?: React.ReactNode;
  isSelected: boolean;
  onSelection: () => void;
}
function Card({
  style,

  ...props
}: CardProps) {
  const baseStyle: CSSProperties = {
    aspectRatio: "700/600",
    border: props.isSelected ? `2px solid ${theme.colors.primaryDark()}` : "",
    ...style,
  };
  return (
    <div
      className="flex flex-col bg-white w-155   rounded-[10px] border-1 border-gray-300 p-4 px-6
      hover:border-primary-dark hover:-translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer "
      style={baseStyle}
      onClick={props.onSelection}
    >
      <div className="flex flex-col items-center mx-auto justify-center bg-gray-100 rounded-full w-25 h-25">
        <FontAwesomeIcon
          icon={props.icon}
          className="text-primary-dark text-5xl"
        />
      </div>
      <p
        className="text-2xl mt-4 mx-auto"
        style={{ fontFamily: "Poppins", fontWeight: "600" }}
      >
        {props.headerLabel}
      </p>
      <p
        className="text-gray-600  mx-auto mt-2"
        style={{ fontFamily: "Poppins", fontWeight: "400" }}
      >
        {props.description}
      </p>
      <div className="flex flex-col mt-5 ml-2 gap-y-5">{props.children}</div>
      {props.isSelected && (
        <div className="bg-primary-light rounded-full h-5 w-5 flex items-center justify-center mt-5 mx-auto p-4">
          <FontAwesomeIcon icon={faCheck} className="text-white" />
        </div>
      )}
      <Button
        textColor="white"
        backgroundColor={theme.colors.primaryDark()}
        onHoverColor={theme.colors.primaryLight()}
        label={props.buttonLabel}
        style={{
          width: "100%",
          marginTop: "30px",
          height: "50px",
          borderRadius: "10px",
          fontSize: "15px",
        }}
      />
    </div>
  );
}

function SignUpPage() {
  const navigate = useNavigate();
  const [selection, setSelection] = useState(2);

  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <Button
          style={{ marginLeft: "auto", marginRight: "2rem" }}
          sizeFactor={0.8}
          backgroundColor={theme.colors.primaryDark()}
          onHoverColor={theme.colors.primaryLight()}
          label="Login"
          textColor={"white"}
          onClick={() => {
            navigate({
              from: "/",
              to: loginRoute.path,
            });
          }}
        />
      </Header>
      <div className="flex flex-col h-fit w-full items-center justify-center mt-25">
        <div
          style={{ fontFamily: "Poppins", fontWeight: "600" }}
          className="text-4xl"
        >
          Join the XPerdiem Community
        </div>
        <div
          style={{ fontFamily: "Poppins", fontWeight: "400" }}
          className="flex flex-col items-center justify-center text-xl text-gray-600 mt-2 "
        >
          Connect with industrial businesses or offer your services on the
          leading marketplace for <div>industrial services</div>
        </div>
        <div
          style={{ fontFamily: "Poppins", fontWeight: "500" }}
          className="text-2xl mt-10"
        >
          I want to sign up as a...
        </div>
        <div className="flex flex-row gap-x-10">
          <Card
            isSelected={selection === 0}
            onSelection={() => {
              setSelection(0);
            }}
            style={{ marginTop: "20px" }}
            headerLabel="Service Provider"
            description="Offer your industrial services to businesses and grow your client base"
            buttonLabel="Select Provider Account"
            icon={faScrewdriverWrench}
          >
            <AccountFeature label="Create a professional service profile" />
            <AccountFeature label="Receive project requests and inquiries" />
            <AccountFeature label="Manage multiple clients and projects" />
            <AccountFeature label="Get paid securely through our platform" />
          </Card>
          <Card
            isSelected={selection === 1}
            onSelection={() => {
              setSelection(1);
            }}
            style={{ marginTop: "20px" }}
            headerLabel="Business Customer"
            description="Find and hire qualified service providers for your industrial needs"
            buttonLabel="Select Customer Account"
            icon={faBuilding}
          >
            <AccountFeature label="Access to verified industrial service providers" />
            <AccountFeature label="Post projects and receive competitive bids" />
            <AccountFeature label="Read reviews and ratings from other businesses" />
            <AccountFeature label="Manage all your service needs in one place" />
          </Card>
        </div>
        {selection === 0 && <ProviderForm className="mt-10" />}
        {selection === 1 && <CustomerForm className="mt-10" />}
      </div>
      <span className="h-15" />
      <Footer children={<FooterContent />} />
    </div>
  );
}

export default SignUpPage;
