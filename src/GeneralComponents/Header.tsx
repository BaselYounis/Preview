import type { CSSProperties } from "react";
import { theme } from "../Constants/Colors";


interface HeaderProps {
  children?: React.ReactNode;
}


function Header({...props}:HeaderProps) {

  const baseStyle: CSSProperties = {
    background: `linear-gradient(to right, ${theme.colors.primaryDark()}, ${theme.colors.primaryLight()})`,
    position:"fixed",
    alignItems: "center",
    zIndex: 100,
  };
  return (
    <div
      className="flex flex-row text-white w-full h-fit px-4 py-4"
      style={baseStyle}
    >
      <div className="text-2xl font-bold ml-50" style={{ fontFamily: "Poppins" }}>
        XPerdiem
      </div>
    {props.children}
    </div>
  );
}

export default Header;
