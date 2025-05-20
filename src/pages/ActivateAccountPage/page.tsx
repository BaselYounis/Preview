import Header from "../../GeneralComponents/Header";
import { theme } from "../../Constants/Colors";
import Button from "../../GeneralComponents/Button";
import { useNavigate } from "@tanstack/react-router";
import { Route as loginRoute } from "../../routes/login";
import Footer from "../../GeneralComponents/Footer";
import FooterContent from "../LoginPage/Components/FooterContent";
import type { CSSProperties } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { HitAuthBackend } from "../../API/Communication";
import { UserAPI } from "../../API/BackendModules/User";
import { useEffect, useState } from "react";
import LoadingComponent from "../../GeneralComponents/LoadingComponent";

async function getUserEmail() {
  const url = UserAPI.URLManager.getURL("Read/", "Current/");
  const response = (await HitAuthBackend({ url, method: "GET" })).data;
  console.log(response); // for debugging reasons...
  return response.email;
}
function ActivateAccountPage() {
  const [email, setEmail] = useState<string | null>(null);
  const fetchEmail = async () => {
    const userEmail = await getUserEmail();
    setEmail(userEmail);
  };
  useEffect(() => {
    fetchEmail();
  }, []);

  const navigate = useNavigate();
  const formStyle: CSSProperties = {
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  };
  return (
    <div className="flex flex-col h-screen">
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
      </div>
<LoadingComponent />
      <Footer>
        <FooterContent />
      </Footer>
    </div>
  );
}

export default ActivateAccountPage;
