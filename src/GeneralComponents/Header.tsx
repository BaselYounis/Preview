import type { CSSProperties } from "react";

interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ ...props }: HeaderProps) {
  const baseStyle: CSSProperties = {
    // background: `linear-gradient(to right, ${theme.colors.primaryDark()}, ${theme.colors.primaryLight()})`,
    background: `linear-gradient(to right, white, white)`,
    boxShadow: "0px 2px 2px rgba(50, 50, 50, 0.1)",
    position: "fixed",
    alignItems: "center",
    zIndex: 100,
  };
  return (
    <div
      className="flex flex-row text-primary-dark w-full h-fit px-4 py-4"
      style={baseStyle}
    >
      <div className="flex flex-row items-center w-[1610px] mx-auto">
        <div
          className="text-2xl font-bold"
          style={{ fontFamily: "Poppins" }}
        >
          XPerdiem
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default Header;
