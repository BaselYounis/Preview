import { createFileRoute } from "@tanstack/react-router";
import SignUpPage from "../pages/PreSignUpPage/page";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUpPage />;
}
