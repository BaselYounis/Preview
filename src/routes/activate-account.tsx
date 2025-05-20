import { createFileRoute } from "@tanstack/react-router";
import ActivateAccountPage from "../pages/ActivateAccountPage/page";

export const Route = createFileRoute("/activate-account")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ActivateAccountPage />;
}
