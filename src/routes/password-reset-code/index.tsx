import { createFileRoute, Outlet } from "@tanstack/react-router";
import PasswordResetCodePage from "../../pages/PasswordResetCodePage/page";

export const Route = createFileRoute("/password-reset-code/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PasswordResetCodePage />
      <Outlet />
    </>
  );
}
