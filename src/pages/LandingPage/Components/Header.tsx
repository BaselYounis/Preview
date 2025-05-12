import type { CSSProperties } from "react";
import { theme } from "../../../Constants/Colors";
import Button from "../../../GeneralComponents/Button";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../../routes/profile";
function Header() {
  const navigate = useNavigate();
  const baseStyle: CSSProperties = {
    background: `linear-gradient(to right, ${theme.colors.primaryDark()}, ${theme.colors.primaryLight()})`,

    alignItems: "center",
  };
  return (
    <div
      className="flex flex-row text-white w-full h-fit px-4 py-4"
      style={baseStyle}
    >
      <div className="text-2xl font-bold" style={{ fontFamily: "Poppins" }}>
        XPerdiem
      </div>
      <Button
        style={{ marginLeft: "auto" }}
        sizeFactor={0.8}
        onHoverColor={theme.colors.whiteGray()}
        textColor={theme.colors.primaryLight()}
        onClick={() => {
          navigate({
            to: Route.path,
          });
        }}
      />
    </div>
  );
}

export default Header;
