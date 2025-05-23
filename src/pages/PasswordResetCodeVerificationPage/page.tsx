import { useNavigate } from "@tanstack/react-router";
import { theme } from "../../Constants/Colors";
import Button from "../../GeneralComponents/Button";
import Header from "../../GeneralComponents/Header";
import { Route as loginRoute } from "../../routes/login";
import Footer from "../../GeneralComponents/Footer";
import FooterContent from "../LoginPage/Components/FooterContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState, type CSSProperties, useEffect } from "react";
import VerificationCodeField from "../ActivateAccountPage/Components/VerificationCodeField";
import { Route } from "../../routes/password-reset-code/verify";

function PasswordResetCodeVerificationPage() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState<string>("");

  // Method 1: Get the email from search parameters
  const { email } = Route.useSearch();

  // Method 3: To use navigation state, you would need to:
  // 1. Import useRouterState: import { useRouterState } from '@tanstack/react-router'
  // 2. Access state like this:
  // const routerState = useRouterState();
  // const { email: emailFromState, timestamp } = routerState.location.state as any || {};

  useEffect(() => {
    // Log the email received from previous page
    console.log("Email from search params:", email);

    // When using state method:
    // console.log("Email from state:", emailFromState);
    // console.log("Timestamp:", timestamp);
  }, [email]); // Add state properties to dependencies when using them

  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <Button
          style={{ marginLeft: "auto", marginRight: "2rem" }}
          sizeFactor={0.8}
          backgroundColor={theme.colors.primaryDark()}
          onHoverColor={theme.colors.primaryLight()}
          textColor={"white"}
          onClick={() => {
            navigate({
              from: "/",
              to: loginRoute.path,
            });
          }}
        />
      </Header>
      <div
        className="flex flex-col h-fit w-[490px] bg-white rounded-[10px] border-1 border-gray-200 mx-auto mt-35 p-6 py-8 gap-y-4 items-center"
        style={formStyle}
      >
        <div className="flex flex-col bg-gray-200 rounded-full h-15 w-15 items-center justify-center">
          <FontAwesomeIcon
            icon={faLock}
            className="text-2xl text-primary-light"
          />
        </div>
        <div className="flex flex-col  items-center justify-center">
          <p className="font-[Poppins] text-2xl font-[500] ">
            Reset Your Password
          </p>

          <p className="font-[Poppins] font-[400] text-gray-500 mt-2 ">
            Password reset code has been sent to 
          </p>
          <p className="font-[Poppins] font-[400] text-primary-light">
            {email}.
          </p>
        </div>
        <VerificationCodeField
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
        />
      </div>
      <Footer>
        <FooterContent />
      </Footer>
    </div>
  );
}

const formStyle: CSSProperties = {
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
};

export default PasswordResetCodeVerificationPage;
