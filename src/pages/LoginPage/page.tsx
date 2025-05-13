import Footer from "../../GeneralComponents/Footer";
import Header from "../../GeneralComponents/Header";
import FooterContent from "./Components/FooterContent";
import LoginCard from "./Components/LoginCard";

function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <LoginCard />
      <Footer>
        <FooterContent />
      </Footer>
    </div>
  );
}

export default LoginPage;
