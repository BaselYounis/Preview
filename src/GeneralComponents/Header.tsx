import type { CSSProperties } from "react";


interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ ...props }: HeaderProps) {
  const baseStyle: CSSProperties = {
    // background: `linear-gradient(to right, ${theme.colors.primaryDark()}, ${theme.colors.primaryLight()})`,
    background: `linear-gradient(to right, white, white)`,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    alignItems: "center",
    zIndex: 100,
  };
  return (
    <div
      className="flex flex-row text-primary-dark w-full h-fit px-4 py-4"
      style={baseStyle}
    >
      <div
        className="text-2xl font-bold ml-50"
        style={{ fontFamily: "Poppins" }}
      >
        XPerdiem
      </div>
      {props.children}
    </div>
  );
}

export default Header;
