import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/password-reset-code/success")({
  component: SuccessComponent,
});

function SuccessComponent() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Password Reset Successful</h2>
      <p>This is another child route of /password-reset-code</p>
      <p>Full URL: /password-reset-code/success</p>
    </div>
  );
}
