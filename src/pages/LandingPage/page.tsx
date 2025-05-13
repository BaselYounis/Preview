import ImageCarousel from "../../GeneralComponents/Carousel/ImageCarousel";
// Import the images directly to let Vite handle asset bundling
import image1 from "../../assets/images/pexels-life-of-pix-2391.jpg";
import image2 from "../../assets/images/pexels-kateryna-babaieva-1423213-2760241.jpg";
import image3 from "../../assets/images/pexels-klaus-44936-167676.jpg";

import {
  AttachMoneyOutlined,
  SearchOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import Footer from "../../GeneralComponents/Footer";
import Card from "./Components/Card";
import Header from "../../GeneralComponents/Header";
import Button from "../../GeneralComponents/Button";
import { useNavigate } from "@tanstack/react-router";
import { theme } from "../../Constants/Colors";
import { Route as signUpRoute } from "../../routes/signup";
import { Route as root } from "../../routes/__root";

function onSignUpButtonClicked(navigate: ReturnType<typeof useNavigate>) {
  navigate({
    from: root.path,
    to: signUpRoute.path,
    // Ensure we're navigating to the root preSignUp path
  });
}
function LandingPage() {
  // Use imported images to ensure proper bundling and paths in production
  const carouselImages = [image1, image2, image3];
  const navigate = useNavigate();
  function CarouselChild() {
    return (
      <div
        className="flex flex-col text-white w-400"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div className="text-6xl" style={{ fontWeight: "bold" }}>
          Connect with Trusted Industrial Service Providers
        </div>
        <div>
          <p className="text-2xl" style={{ fontWeight: "400" }}>
            XPerdiem bridges the gap between customers and experienced
          </p>
          <p className="text-2xl" style={{ fontWeight: "400" }}>
            professionals in the industrial sector — faster, smarter, and
            easier.
          </p>
        </div>
      </div>
    );
  }

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

      {/* Hero section with carousel */}
      <div className="h-[75vh] w-full">
        <ImageCarousel
          images={carouselImages}
          interval={6000}
          children={<CarouselChild />}
        />
      </div>
      <div className="flex flex-row items-center justify-center mt-20 mb-20 gap-x-5">
        <Card
          Icon={WorkOutlineOutlined}
          title="Verified Professionals"
          description="All service providers go through a rigorous vetting process to ensure reliability and quality work."
        />
        <Card
          Icon={SearchOutlined}
          title="Smart Matching"
          description="Our platform intelligently matches you with the best professionals for your specific industrial needs."
        />
        <Card
          Icon={AttachMoneyOutlined}
          title="Transparent Pricing"
          description="Get clear, upfront pricing with no hidden fees. Make informed decisions with confidence."
        />
      </div>

      <Footer>
        <div className="flex flex-col items-center justify-center mt-10 mb-10 gap-y-2">
          <div className="font-bold text-4xl">Ready to Get Started?</div>
          <p className="mt-2">
            Join XPerdiem and transform how you find and hire industrial service
            providers.
          </p>
        </div>
        <Button
          label="Sign Up Now"
          style={{ width: "10rem", fontSize: "14px" }}
          onClick={() => onSignUpButtonClicked(navigate)}
        />
        <span className="h-5" />
      </Footer>
    </div>
  );
}

export default LandingPage;
