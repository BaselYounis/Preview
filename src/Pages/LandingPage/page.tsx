import Header from "./Components/Header";
import ImageCarousel from "../../GeneralComponents/Carousel/ImageCarousel";

function LandingPage() {
  // Images from your assets folder
  const carouselImages = [
    "/src/assets/images/pexels-photo-209251.jpeg",
    "/src/assets/images/pexels-kateryna-babaieva-1423213-2760241.jpg",
    "src/assets/images/pexels-klaus-44936-167676.jpg",
  ];
  function CarouselChild() {
    return (
      <div className="flex flex-col text-white w-400" style={{alignItems: "center",justifyContent: "center"}}>
        <div className="text-6xl" style={{ fontWeight: "bold" }}>
          Connect with Trusted Industrial Service Providers
        </div>
        <div>
            <p className="text-2xl" style={{ fontWeight: "400" }}>
              XPerdiem bridges the gap between customers and experienced
            
            </p>
            <p className="text-2xl" style={{ fontWeight: "400" }}>
            professionals in the industrial sector — faster, smarter, and easier.
            </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero section with carousel */}
      <div className="h-[70vh] w-full">
        <ImageCarousel
          images={carouselImages}
          interval={6000}
          children={<CarouselChild />}
        />
      </div>
    </div>
  );
}

export default LandingPage;
