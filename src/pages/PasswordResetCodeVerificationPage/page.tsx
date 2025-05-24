import { useNavigate } from "@tanstack/react-router";
import { theme } from "../../Constants/Colors";
import Button from "../../GeneralComponents/Button";
import Header from "../../GeneralComponents/Header";
import { Route as loginRoute } from "../../routes/login";
import Footer from "../../GeneralComponents/Footer";
import FooterContent from "../LoginPage/Components/FooterContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState, type CSSProperties } from "react";
import VerificationCodeField from "../ActivateAccountPage/Components/VerificationCodeField";
import { Route } from "../../routes/password-reset-code/verify";
import { UserAPI } from "../../API/BackendModules/User";
import { HitBackend } from "../../API/Communication";
import ErrorComponent from "../../GeneralComponents/ErrorComponent";
import DoneComponent from "../../GeneralComponents/DoneComponent";
import TextField from "../../GeneralComponents/TextField";
import { GeneralTextCleaner } from "../../ClientSide/CleanForm";
import {
  confirmPasswordValidator,
  passwordValidator,
} from "../../ClientSide/ValidateForm";

function PasswordResetCodeVerificationPage() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { email } = Route.useSearch();
  const [formErrors, setFormErrors] = useState<boolean[]>(Array(2).fill(false));
  const updateError = (index: number, value: boolean) => {
    setFormErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = value;
      return newErrors;
    });
  };
  const isThereAFormError = () => {
    return formErrors.some((error) => error === true);
  };
  const onResendCodeClicked = async () => {
    const url = UserAPI.URLManager.getURL("Read/", "PasswordResetCode/");
    const response = await HitBackend({
      url,
      method: "GET",
      data: { email: email },
    });
    if (response.success) {
      setDoneMessage("Verification code resent successfully.");
      setTimeout(() => {
        setDoneMessage(null);
      }, 3000);
    } else {
      if (response.message) {
        setErrorMessage(response.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      }
    }
  };
  const onResetPasswordClicked = async () => {
    if (isThereAFormError()) {
      console.log(formErrors);
      setErrorMessage("Please fix the errors in the form.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
      return;
    }
    const url = UserAPI.URLManager.getURL("Update/", "ResetPassword/");
    const response = await HitBackend({
      url,
      method: "PUT",
      data: {
        password_reset_code: verificationCode,
        email: email,
        new_password: newPassword,
      },
    });
    if (response.success) {
      setDoneMessage("Password reset successfully.");
      setTimeout(() => {
        navigate({ from: "/", to: loginRoute.path });
      }, 2000);
    } else {
      if (response.message) {
        setErrorMessage(response.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      }
    }
  };

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
        <p className="font-[Poppins] font-[400] text-xs text-gray-800 mt-4">
          Enter the 6-digit reset code
        </p>
        <VerificationCodeField
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
        />
        <div className="flex flex-row gap-x-1 text-[14px] text-gray-600">
          <p>Didn't receive a code?</p>
          <p className="cursor-pointer underline" onClick={onResendCodeClicked}>
            Resend Code
          </p>
        </div>
        <TextField
          label="New Password"
          value={newPassword}
          setValue={setNewPassword}
          placeholder="Enter your new password."
          widthFactor={1.37}
          inputCleaner={GeneralTextCleaner}
          inputValidator={(arg: string) => passwordValidator(arg)}
          errorIndicator={formErrors[0]}
          setErrorIndicator={(arg: boolean) => {
            updateError(0, arg);
          }}
          type="password"
        />
        <TextField
          label="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          placeholder="Confirm your new password."
          widthFactor={1.37}
          inputCleaner={GeneralTextCleaner}
          inputValidator={(arg: string) =>
            confirmPasswordValidator(newPassword, arg)
          }
          errorIndicator={formErrors[1]}
          setErrorIndicator={(arg: boolean) => {
            updateError(1, arg);
          }}
          type="password"
        />

        <Button
          textColor="white"
          backgroundColor={theme.colors.primaryLight()}
          label="Reset Password"
          style={{ width: "100%", fontSize: "16px", marginTop: "1rem" }}
          onHoverColor={theme.colors.primaryLighter()}
          onClick={onResetPasswordClicked}
        />
        {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
        {doneMessage && <DoneComponent message={doneMessage} />}
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
