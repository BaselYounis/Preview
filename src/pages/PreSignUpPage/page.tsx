import { useNavigate } from "@tanstack/react-router";
import { theme } from "../../Constants/Colors";
import Button from "../../GeneralComponents/Button";
import Footer from "../../GeneralComponents/Footer";
import Header from "../../GeneralComponents/Header";
import FooterContent from "../LoginPage/Components/FooterContent";

function Card() {
  return <div>Card</div>;
}

function PreSignUpPage() {
  const navigate = useNavigate();
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
              to: "/login",
            });
          }}
        />
      </Header>
      <div className="flex flex-col h-fit w-full items-center justify-center mt-25">
        <p
          style={{ fontFamily: "Poppins", fontWeight: "600" }}
          className="text-4xl"
        >
          Join the XPerdiem Community
        </p>
        <p
          style={{ fontFamily: "Poppins", fontWeight: "400" }}
          className="flex flex-col items-center justify-center text-xl text-gray-600 mt-2 "
        >
          Connect with industrial businesses or offer your services on the
          leading marketplace for <p>industrial services</p>
        </p>
        <p
          style={{ fontFamily: "Poppins", fontWeight: "400" }}
          className="text-2xl mt-10"
        >
          I want to sign up as a...
        </p>
        <div className="flex flex-row">
          <Card />
        </div>
      </div>
      <Footer children={<FooterContent />} />
    </div>
  );
}

export default PreSignUpPage;
