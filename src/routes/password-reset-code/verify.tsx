import { createFileRoute } from "@tanstack/react-router";
import PasswordResetCodeVerificationPage from "../../pages/PasswordResetCodeVerificationPage/page";

export const Route = createFileRoute("/password-reset-code/verify")({
  component: VerifyComponent,
});

function VerifyComponent() {
  return <PasswordResetCodeVerificationPage />;
}
