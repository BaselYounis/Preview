import { useNavigate } from "@tanstack/react-router";
import { theme } from "../../Constants/Colors";
import Button from "../../GeneralComponents/Button";
import Header from "../../GeneralComponents/Header";
import Footer from "../../GeneralComponents/Footer";
import FooterContent from "../LoginPage/Components/FooterContent";
import { useState, type CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import TextField from "../../GeneralComponents/TextField";
import { UserAPI } from "../../API/BackendModules/User";
import { HitBackend } from "../../API/Communication";
import { Route as loginRoute } from "../../routes/login";
import { Route as verifyCodeRoute } from "../../routes/password-reset-code/verify";
import ErrorComponent from "../../GeneralComponents/ErrorComponent";

function PasswordResetCodePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const askForPasswordResetCode = async () => {
    const url = UserAPI.URLManager.getURL("Read/", "PasswordResetCode/");
    const response = await HitBackend({
      url,
      method: "GET",
      data: { email: email },
    });
    if (response.success) {
      navigate({
        from: "/",
        to: verifyCodeRoute.path,
      });
    } else {
      if (response.message) {
        console.log(response.message);
        setErrorMessage(response.message);
      }
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
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
        <div className="flex flex-col items-center">
          <p className="font-[Poppins] text-2xl font-[500]">
            Reset Your Password
          </p>
          <div className="flex flex-col items-center">
            <p className="font-[Poppins] font-[400] text-gray-500 mt-2">
              Enter your email address and we'll send you a link to
            </p>
            <p className="font-[Poppins] font-[400] text-gray-500 ">
              reset your password.
            </p>
          </div>
        </div>
        <TextField
          value={email}
          setValue={setEmail}
          label="Email Address"
          widthFactor={1.37}
          placeholder="Enter your email address"
          className="w-full mt-5"
        />
        <Button
          style={sendCodeButtonStyle}
          backgroundColor={theme.colors.primaryLight()}
          onHoverColor={theme.colors.primaryLighter()}
          textColor="white"
          label="Send Reset Code"
          onClick={askForPasswordResetCode}
        />
        {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
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
export default PasswordResetCodePage;
const sendCodeButtonStyle: CSSProperties = {
  width: "100%",
  fontSize: "16px",
  height: "50px",
  borderRadius: "10px",
  marginTop: "20px",
};
