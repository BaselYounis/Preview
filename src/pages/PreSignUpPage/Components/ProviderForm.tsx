import type { CSSProperties } from "@mui/material";
import { useEffect, useRef, useState, type FunctionComponent } from "react";
import TextField from "../../../GeneralComponents/TextField";
import Button from "../../../GeneralComponents/Button";
import { theme } from "../../../Constants/Colors";
import {
  companyNameValidator,
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
  phoneNumberValidator,
} from "../../../ClientSide/ValidateForm";
import {
  GeneralTextCleaner,
  PhoneNumberCleaner,
} from "../../../ClientSide/CleanForm";
import { useNavigate } from "@tanstack/react-router";
import { HitBackend } from "../../../API/Communication";

import { Route as loginRoute } from "../../../routes/login";
import ErrorComponent from "../../../GeneralComponents/ErrorComponent";
import { ServiceProviderAPI } from "../../../API/BackendModules/ServiceProivder";
import { UserAPI } from "../../../API/BackendModules/User";
import DropdownMenu from "../../../GeneralComponents/DropdownMenu";

interface ProviderFormProps {
  className?: string;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}
type ProviderFormInputs = {
  organization_name: string;
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
  const [errors, setErrors] = useState<boolean[]>(Array(6).fill(false));

  // Example function to update a single index
  const updateError = (index: number, value: boolean) => {
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = value;
      return newErrors;
    });
  };
  const isThereAFormError = () => {
    return errors.some((error) => error === true);
  };
  const [formData, setFormData] = useState<ProviderFormInputs>({
    organization_name: "",
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

      if (isThereAFormError()) {
        setBackendErrorMessage("Please fix the errors in the form");
        return;
      }
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
      <TextField
        style={{ width: "100%" }}
        label="Organization Name"
        placeholder="Your Organization Name"
        value={formData.organization_name}
        setValue={(value) =>
          setFormData((prev) => ({ ...prev, organization_name: value }))
        }
        inputCleaner={GeneralTextCleaner}
        inputValidator={companyNameValidator}
        errorIndicator={errors[0]}
        setErrorIndicator={(arg: boolean) => {
          updateError(0, arg);
        }}
      />

      <TextField
        style={{ width: "100%" }}
        label="Email Address"
        placeholder="your@example.com"
        value={formData.email}
        setValue={(value) => setFormData((prev) => ({ ...prev, email: value }))}
        inputCleaner={GeneralTextCleaner}
        inputValidator={emailValidator}
        errorIndicator={errors[1]}
        setErrorIndicator={(arg: boolean) => {
          updateError(1, arg);
        }}
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
          errorIndicator={errors[2]}
          setErrorIndicator={(arg: boolean) => {
            updateError(2, arg);
          }}
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
        errorIndicator={errors[3]}
        setErrorIndicator={(arg: boolean) => {
          updateError(3, arg);
        }}
      />

      <TextField
        style={{ width: "100%" }}
        label="Contact Number"
        placeholder="Contact Number"
        value={formData.phone_number}
        setValue={(value) =>
          setFormData((prev) => ({ ...prev, phone_number: value }))
        }
        inputCleaner={PhoneNumberCleaner}
        inputValidator={phoneNumberValidator}
        errorIndicator={errors[4]}
        setErrorIndicator={(arg: boolean) => {
          updateError(4, arg);
        }}
      />
      <DropdownMenu/>

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
