import type { CSSProperties } from "@mui/material";
import { theme } from "../Constants/Colors";

interface FooterProps {
  children?: React.ReactNode;
}

function Footer({ ...props }: FooterProps) {
  const baseStyle: CSSProperties = {
    backgroundColor: "#1F2937",
    backgroundImage: `linear-gradient(to bottom, ${theme.colors.primaryDark()}, ${theme.colors.primaryLight()})`,
    width: "100%",
    padding: "2rem 0",
    boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
  };
  return (
    <div
      className="flex flex-col text-white w-full items-center justify-center mt-auto"
      style={baseStyle}
    >
      {props.children}
    </div>
  );
}

export default Footer;
