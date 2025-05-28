import Header from "../../GeneralComponents/Header";
import { theme } from "../../Constants/Colors";
import Button from "../../GeneralComponents/Button";
import { useNavigate } from "@tanstack/react-router";
import Footer from "../../GeneralComponents/Footer";
import FooterContent from "../LoginPage/Components/FooterContent";
import type { CSSProperties } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { HitAuthBackend } from "../../API/Communication";
import { UserAPI } from "../../API/BackendModules/User";
import { useEffect, useState } from "react";
import VerificationCodeField from "./Components/VerificationCodeField";
import { Route as dashboardRoute } from "../../routes/provider-profile";
import ErrorComponent from "../../GeneralComponents/ErrorComponent";
import DoneComponent from "../../GeneralComponents/DoneComponent";
async function getUserEmail() {
  const url = UserAPI.URLManager.getURL("Read/", "Current/");
  const response = (await HitAuthBackend({ url, method: "GET" })).data;
  console.log(response); // for debugging reasons...
  return response.email;
}
function ActivateAccountPage() {
  const [email, setEmail] = useState<string | null>(null);

  const [verificationCode, setVerificationCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);
  const fetchEmail = async () => {
    const userEmail = await getUserEmail();
    setEmail(userEmail);
  };
  const askForVerificationCode = async () => {
    const url = UserAPI.URLManager.getURL("Read/", "ActivationCode/");
    await HitAuthBackend({ url, method: "GET" });
  };
  const onResendCodeClcicked = async () => {
    const url = UserAPI.URLManager.getURL("Read/", "ActivationCode/");
    const response = await HitAuthBackend({ url, method: "GET" });
    if (response.success) {
      setDoneMessage("Verification code resent successfully.");
    } else {
      if (response.message) setErrorMessage(response.message);
    }
  };
  const verifyAccount = async () => {
    const url = UserAPI.URLManager.getURL("Update/", "Activate/");
    const response = await HitAuthBackend({
      url,
      method: "PUT",
      data: { activation_code: verificationCode },
    });
    if (response.success) {
      setDoneMessage("Account activated successfully.");
      if (response.message) setDoneMessage(response.message);

      setTimeout(() => {
        navigate({ from: "/", to: dashboardRoute.path });
      }, 1000);
    } else {
      if (response.message) setErrorMessage(response.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchEmail();
    askForVerificationCode();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <Header></Header>

      <div
        className="flex flex-col h-[550px] w-[490px] bg-white rounded-[10px] border-1 border-gray-200 mx-auto mt-35 p-4 py-8 gap-y-4 items-center"
        style={formStyle}
      >
        <div className="flex flex-col bg-gray-200 rounded-full h-15 w-15 items-center justify-center">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-2xl text-primary-light"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-[Poppins] text-2xl font-[500]">
            Verify Your Email
          </p>
          <p className="font-[Poppins] font-[400] text-gray-500 mt-2">
            We have sent a verification code to:
          </p>
          <p className="font-[Poppins] font-[400] text-gray-800">
            {email || "Loading..."}
          </p>
        </div>
        <p className="font-[Poppins] font-[400] text-xs text-gray-800 mt-4">
          Enter the 6-digit verification code
        </p>
        <VerificationCodeField
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
        />

        <Button
          label="Verify Account"
          backgroundColor={theme.colors.primaryLight()}
          onHoverColor={theme.colors.primaryLighter()}
          textColor="white"
          style={buttonStyle}
          onClick={verifyAccount}
        />

        {doneMessage && <DoneComponent message={doneMessage || ""} />}

        {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
        <div className="flex flex-row gap-x-1 text-[14px] text-gray-600">
          <p>Didn't receive a code?</p>
          <p
            className="cursor-pointer underline"
            onClick={onResendCodeClcicked}
          >
            Resend Code
          </p>
        </div>
      </div>
      <div
        className="flex-col bg-[#eff6ff] w-[490px] border-1 rounded-[10px] p-4
       border-[#dbeafe] mx-auto my-10"
      >
        <div className="flex flex-row  gap-x-2">
          <FontAwesomeIcon
            className="text-[#3b82f6] mt-1"
            icon={faInfoCircle}
          />
          <div className="flex flex-col gap-y-2">
            <p className="text-blue-700">What happens next?</p>
            <p className="text-blue-600">
              After verifying your email, you'll be able to complete your
              profile setup and start using XPerdiem's services right away.
            </p>
          </div>
        </div>
      </div>
      <Footer>
        <FooterContent />
      </Footer>
    </div>
  );
}

export default ActivateAccountPage;
const formStyle: CSSProperties = {
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
};
const buttonStyle: CSSProperties = {
  width: "100%",
  fontSize: "16px",
  height: "50px",
  borderRadius: "10px",
  marginTop: "20px",
};
