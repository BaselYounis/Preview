import type { CSSProperties } from "@mui/material";

function LoginCard() {
  const baseStyle: CSSProperties = {
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    aspectRatio: "553/832",
  };
  return (
    <div className="flex flex-col w-full h-fit justify-center items-center mt-30">
      <div
        className="w-110 bg-white rounded-[10px] border-1 border-gray-200 p-6"
        style={baseStyle}
      >
        <div style={{ fontFamily: "Poppins" }} className="text-2xl">
          Welcome Back
        </div>
        <div style={{ fontFamily: "Poppins" }} className="text-gray-500">
          Log in to access your XPerdiem account
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
