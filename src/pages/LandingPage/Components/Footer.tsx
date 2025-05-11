import type { CSSProperties } from "@mui/material";
import Button from "../../../GeneralComponents/Button";
import { theme } from "../../../Constants/Colors";

function Footer() {
  const baseStyle: CSSProperties = {
    backgroundColor: "#1F2937",
    backgroundImage: `linear-gradient(to bottom, ${theme.colors.primaryDark()}, ${theme.colors.primaryLight()})`,
    width: "100%",
    padding: "2rem 0",
    boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
  };
  return (
    <div
      className="flex flex-col text-white w-full items-center justify-center"
      style={baseStyle}
    >
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
      />
      <span className="h-5" />
    </div>
  );
}

export default Footer;
