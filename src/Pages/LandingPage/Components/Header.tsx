import { theme } from "../../../Constants/Colors";
import Button from "../../../GeneralComponents/Button";

function Header() {
  return (
    <div
      className="flex flex-row text-white w-full h-fit bg-primary-dark px-4 py-4"
      style={{ alignItems: "center" }}
    >
      <div className="text-2xl font-bold">XPerdiem</div>
      <Button
        style={{ marginLeft: "auto" }}
        sizeFactor={0.8}
        onHoverColor={theme.colors.whiteGray()}
        textColor={theme.colors.primaryLight()}
      />
    </div>
  );
}

export default Header;
