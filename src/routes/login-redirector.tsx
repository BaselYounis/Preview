import { createFileRoute } from "@tanstack/react-router";
import LoginRedirectorPage from "../pages/LoginRedirectorPage/page";

export const Route = createFileRoute("/login-redirector")({
  component: LoginRedirectorPage,
});
