import type { CSSProperties } from "@mui/material";
import { useEffect, useRef, useState, type FunctionComponent } from "react";
import TextField from "../../../GeneralComponents/TextField";
import Button from "../../../GeneralComponents/Button";
import { theme } from "../../../Constants/Colors";
import {
  confirmPasswordValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneNumberValidator,
} from "../../../ClientSide/ValidateForm";
import {
  GeneralTextCleaner,
  NameCleaner,
  PhoneNumberCleaner,
} from "../../../ClientSide/CleanForm";
import { useNavigate } from "@tanstack/react-router";
import { HitBackend } from "../../../API/Communication";

import { Route as loginRoute } from "../../../routes/login";
import ErrorComponent from "../../../GeneralComponents/ErrorComponent";
import { ServiceProviderAPI } from "../../../API/BackendModules/ServiceProivder";
import { UserAPI } from "../../../API/BackendModules/User";

interface ProviderFormProps {
  className?: string;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}
type ProviderFormInputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  confirm_password: string;
  whatsapp_number: string;
};

const ProviderForm: FunctionComponent<ProviderFormProps> = ({
  style,
  ...props
}) => {
  const baseStyle: CSSProperties = {
    boxShadow: "0px 0px 4px rgba(50, 50, 50, 0.1)",
    ...style,
  };
  const [formData, setFormData] = useState<ProviderFormInputs>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    whatsapp_number: "",
  });

  const [backendErrorMessage, setBackendErrorMessage] = useState<string | null>(
    null
  );
  const providerFormRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    providerFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const onCreateAccountClicked = async () => {
    try {
      // Attempt to create service provider account
      const createResponse = await HitBackend({
        url: ServiceProviderAPI.URLManager.getURL("Create/"),
        data: formData,
        method: "POST",
      });

      if (!createResponse.success) {
        setBackendErrorMessage(
          createResponse.message ?? "Failed to create account"
        );
        return;
      }

      // Attempt to login with the created credentials
      const loginResponse = await UserAPI.Login(
        formData.email,
        formData.password
      );

      if (!loginResponse.success) {
        setBackendErrorMessage(
          loginResponse.message ?? "Account created but login failed"
        );
        return;
      }

      // Navigate to login page on success
      navigate({
        from: "/",
        to: loginRoute.path,
      });
    } catch (error) {
      console.error("Account creation error:", error);
      setBackendErrorMessage("An unexpected error occurred");
    }
  };

  return (
    <div
      ref={providerFormRef}
      className={`flex flex-col w-150 h-fit bg-white border-1 gap-y-5 
         border-gray-200 rounded-[10px] px-6 py-8 text-xl ${props.className}`}
      style={baseStyle}
    >
      <p
        className="mx-auto"
        style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: "22px" }}
      >
        Create Your Service Provider Account{" "}
      </p>
      <div className="flex flex-row w-full justify-between gap-4 mt-5">
        <TextField
          style={{ width: "100%" }}
          label="First Name"
          placeholder="John"
          className="flex-1"
          value={formData.first_name}
          setValue={(value) =>
            setFormData((prev) => ({ ...prev, first_name: value }))
          }
          inputCleaner={NameCleaner}
          inputValidator={nameValidator}
        />
        <TextField
          style={{ width: "100%" }}
          label="Last Name"
          placeholder="Doe"
          className="flex-1"
          value={formData.last_name}
          setValue={(value) =>
            setFormData((prev) => ({ ...prev, last_name: value }))
          }
          inputCleaner={NameCleaner}
          inputValidator={nameValidator}
        />
      </div>
      <TextField
        style={{ width: "100%" }}
        label="Email Address"
        placeholder="your@example.com"
        value={formData.email}
        setValue={(value) => setFormData((prev) => ({ ...prev, email: value }))}
        inputCleaner={GeneralTextCleaner}
        inputValidator={emailValidator}
      />
      <div>
        <TextField
          style={{ width: "100%" }}
          label="Password"
          placeholder="Password"
          type="password"
          value={formData.password}
          setValue={(value) =>
            setFormData((prev) => ({ ...prev, password: value }))
          }
          inputCleaner={GeneralTextCleaner}
          inputValidator={passwordValidator}
        />
        <p className="text-xs text-gray-500">
          Must be at least 8 characters with numbers and special characters
        </p>
      </div>
      <TextField
        style={{ width: "100%" }}
        label="Confirm Password"
        placeholder="Confirm Password"
        type="Password"
        value={formData.confirm_password}
        setValue={(value) =>
          setFormData((prev) => ({ ...prev, confirm_password: value }))
        }
        inputCleaner={GeneralTextCleaner}
        inputValidator={(value) =>
          confirmPasswordValidator(formData.password, value)
        }
      />

      <TextField
        style={{ width: "100%" }}
        label="Phone Number"
        placeholder="Phone Number"
        value={formData.phone_number}
        setValue={(value) =>
          setFormData((prev) => ({ ...prev, phone_number: value }))
        }
        inputCleaner={PhoneNumberCleaner}
        inputValidator={phoneNumberValidator}
      />
      <TextField
        style={{ width: "100%" }}
        label="WhatsApp Number"
        placeholder="WhatsApp Number"
        value={formData.whatsapp_number}
        setValue={(value) =>
          setFormData((prev) => ({ ...prev, whatsapp_number: value }))
        }
        inputCleaner={PhoneNumberCleaner}
        inputValidator={phoneNumberValidator}
      />
      <Button
        textColor="white"
        backgroundColor={theme.colors.primaryDark()}
        onHoverColor={theme.colors.primaryLight()}
        style={{
          width: "100%",
          fontSize: "15px",
          marginTop: "30px",
          height: "50px",
          borderRadius: "10px",
        }}
        label="Create Account"
        onClick={() => {
          onCreateAccountClicked();
        }}
      />
      <div
        className="text-[13px] text-gray-500 flex flex-row gap-x-2 mx-auto"
        style={{ fontFamily: "Poppins" }}
      >
        <p>Already have an account?</p>
        <p
          className="hover:text-primary-dark hover:underline cursor-pointer transition-all duration-200"
          onClick={() => {
            navigate({
              from: "/",
              to: loginRoute.path,
            });
          }}
        >
          Log In
        </p>
      </div>
      {backendErrorMessage && (
        <ErrorComponent
          errorMessage={backendErrorMessage}
          className="mx-auto"
        />
      )}
    </div>
  );
};

export default ProviderForm;
