import { type CSSProperties } from "@mui/material";
import TextField from "../../../GeneralComponents/TextField";
import { useState } from "react";
import Button from "../../../GeneralComponents/Button";
import { theme } from "../../../Constants/Colors";
import Checkmark from "../../../GeneralComponents/Checkmark";
import { Route as signUpRoute } from "../../../routes/signup";
import { Route as root } from "../../../routes/__root";
import { useNavigate } from "@tanstack/react-router";
import { UserAPI } from "../../../API/BackendModules/User";
import ErrorComponent from "../../../GeneralComponents/ErrorComponent";
import { Route as loginRedirectorRoute } from "../../../routes/login-redirector";
import { Route as resetPasswordCodePageRoute } from "../../../routes/password-reset-code";
type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

function onSignUpButtonClicked(navigate: ReturnType<typeof useNavigate>) {
  navigate({
    from: root.path,
    to: signUpRoute.path,
    // Ensure we're navigating to the root preSignUp path
  });
}

function LoginCard() {
  const baseStyle: CSSProperties = {
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    aspectRatio: "650/830",
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
    remember: false,
  });
  const onLoginButtonClicked = async () => {
    const loginResponse = await UserAPI.Login(form.email, form.password);
    console.log("RESPONSE RESPONSE!");
    console.log(loginResponse);
    if (!loginResponse.success) {
      setErrorMessage(loginResponse.message || "Login failed");
      return;
    } else {
      console.log("Login successful");
      navigate({
        from: root.path,
        to: loginRedirectorRoute.path,
      });
    }
  };

  const onForgotPasswordButtonClicked = () => {
    navigate({
      from: root.path,
      to: resetPasswordCodePageRoute.path,
    });
  };

  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-fit justify-center items-center mt-45 ">
      <div
        className="flex flex-col w-110 bg-white rounded-[10px] border-1 border-gray-200  overflow-hidden"
        style={baseStyle}
      >
        <div className="p-6 px-8 mt-5">
          <div style={{ fontFamily: "Poppins" }} className="text-2xl">
            Welcome Back
          </div>
          <div style={{ fontFamily: "Poppins" }} className="text-gray-500">
            Log in to access your XPerdiem account
          </div>
          <div className="flex flex-col mt-10 gap-y-5 ">
            <TextField
              label="Email Address"
              style={{ width: "100%" }}
              value={form.email}
              setValue={(value) => setForm({ ...form, email: value })}
              placeholder="your@example.com"
            />
            <div className="flex flex-col gap-y-1">
              <div className="flex flex-row items-center text-primary-light">
                Password
                <div
                  className="text-gray-600 cursor-pointer ml-auto hover:underline text-xs"
                  onClick={onForgotPasswordButtonClicked}
                >
                  Forgot Password?
                </div>
              </div>
              <TextField
                type="password"
                style={{ width: "100%" }}
                value={form.password}
                setValue={(value) => setForm({ ...form, password: value })}
                placeholder="Enter your password"
              />
            </div>
            <Checkmark
              value={form.remember}
              setValue={(value) => setForm({ ...form, remember: value })}
              label="Remember me"
            />
            <Button
              backgroundColor={theme.colors.primaryLight()}
              textColor="white"
              label="Log In"
              style={{
                alignSelf: "center",
                width: "100%",
                // marginTop: "20px",
                fontSize: "1rem",
                height: "3rem",
                borderRadius: "8px",
              }}
              onHoverColor={theme.colors.primaryDark()}
              onClick={onLoginButtonClicked}
            />
            {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
          </div>
        </div>
        <div className="flex flex-row w-full gap-x-1 items-center bg-gray-50 h-20 justify-center mt-auto text-gray-600 p-2">
          Don't have an account?
          <div
            onClick={() => onSignUpButtonClicked(navigate)}
            className="text-primary-dark cursor-pointer hover:underline"
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
