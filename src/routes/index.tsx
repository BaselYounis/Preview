import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "../pages/LandingPage/page";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  
  return <LandingPage />;
}
