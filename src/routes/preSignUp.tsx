import { createFileRoute } from "@tanstack/react-router";
import PreSignUpPage from "../pages/PreSignUpPage/page";

export const Route = createFileRoute("/preSignUp")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PreSignUpPage />;
}
