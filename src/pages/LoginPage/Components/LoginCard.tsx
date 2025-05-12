import { type CSSProperties } from "@mui/material";
import TextField from "../../../GeneralComponents/TextField";
import { useState } from "react";
import Button from "../../../GeneralComponents/Button";
import { theme } from "../../../Constants/Colors";

function LoginCard() {
  const baseStyle: CSSProperties = {
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    aspectRatio: "553/832",
  };
  const [email, setEmail] = useState<string>("");

  return (
    <div className="flex flex-col w-full h-fit justify-center items-center mt-30">
      <div
        className="flex flex-col w-110 bg-white rounded-[10px] border-1 border-gray-200 p-6 px-8"
        style={baseStyle}
      >
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
            value={email}
            setValue={setEmail}
            placeholder="your@exmaple.com"
          />
          <TextField
            label="Password"
            type="password"
            style={{ width: "100%" }}
            value={email}
            setValue={setEmail}
            placeholder="Enter your password"
          />
        </div>
        <Button
          backgroundColor={theme.colors.primaryLight()}
          textColor="white"
          label="Log In"
          style={{ alignSelf: "center", width: "100%",marginTop: "20px", fontSize: "1rem" }}
          onHoverColor={theme.colors.primaryDark()}
        />
      </div>
    </div>
  );
}

export default LoginCard;
