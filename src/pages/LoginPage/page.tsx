import Footer from "../../GeneralComponents/Footer";
import Header from "../../GeneralComponents/Header";
import LoginCard from "./Components/LoginCard";

function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <LoginCard />
      <Footer />
    </div>
  );
}

export default LoginPage;
