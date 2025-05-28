import { createFileRoute } from "@tanstack/react-router";
import ProviderProfilePage from "../pages/ProviderProfilePage/page";

export const Route = createFileRoute("/provider-profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProviderProfilePage />;
}
