import { useEffect, useState } from "react";
import { UserAPI } from "../../API/BackendModules/User";
import { HitAuthBackend } from "../../API/Communication";
import { useNavigate } from "@tanstack/react-router";
import LoadingComponent from "../../GeneralComponents/LoadingComponent";
import ErrorComponent from "../../GeneralComponents/ErrorComponent";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoginRedirectorPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Verifying your account..."
  );
  const navigate = useNavigate();

  const getUserVerificationStatus = async () => {
    const url = UserAPI.URLManager.getURL("Read/", "Current/");
    const response = (await HitAuthBackend({ url, method: "GET" })).data;
    return response.verified;
  };

  useEffect(() => {
    const redirectUser = async () => {
      try {
        setIsLoading(true);
        // Wait for 1.5 seconds to show the loading state
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const isVerified = await getUserVerificationStatus();

        if (isVerified) {
          setIsSuccess(true);
          setStatusMessage(
            "Verification successful! Redirecting to dashboard..."
          );
          // Wait 2 seconds before redirecting
          setTimeout(() => {
            navigate({ to: "/dashboard" });
          }, 2000);
        } else {
          setStatusMessage("Account needs verification. Redirecting...");
          // Wait 2 seconds before redirecting
          setTimeout(() => {
            navigate({ to: "/activate-account" });
          }, 2000);
        }
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        setStatusMessage("Failed to verify account");
      } finally {
        setIsLoading(false);
      }
    };

    redirectUser();
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-[#1C1C1C] to-[#2D2D2D] p-4">
      <div className="bg-white rounded-lg p-8 shadow-xl max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold poppins-semibold text-[#1C1C1C] mb-2">
            XPerdiem
          </h1>
          <p className="text-[#767676] poppins-regular">Account Verification</p>
        </div>

        {isLoading ? (
          <LoadingComponent
            isLoading={true}
            message={statusMessage}
            overlay={false}
            size="medium"
          />
        ) : isSuccess ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-green-600 h-16 w-16"
            />
            <p className="poppins-medium text-xl">{statusMessage}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="poppins-medium text-lg">{statusMessage}</p>
            {errorMessage && <ErrorComponent errorMessage={errorMessage} />}
          </div>
        )}
      </div>

      <div className="mt-8 text-white text-opacity-70 text-sm poppins-light">
        &copy; {new Date().getFullYear()} XPerdiem. All rights reserved.
      </div>
    </div>
  );
}

export default LoginRedirectorPage;
