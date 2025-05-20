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
} from "../ClientSide/ValidateForm";
import { GeneralTextCleaner, NameCleaner } from "../ClientSide/CleanForm";
import { useNavigate } from "@tanstack/react-router";

function onCreateAccountClicked() {}

interface CustomerFormProps {
  className?: string;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}
type CustomerFormInputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  confirm_password: string;
  whatsapp_number: string;
};

const CustomerForm: FunctionComponent<CustomerFormProps> = ({
  style,
  ...props
}) => {
  const baseStyle: CSSProperties = {
    boxShadow: "0px 0px 4px rgba(50, 50, 50, 0.1)",
    ...style,
  };
  const [formData, setFormData] = useState<CustomerFormInputs>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    whatsapp_number: "",
  });

  const CustomerFormRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    CustomerFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);
  return (
    <div
      ref={CustomerFormRef}
      className={`flex flex-col w-150 h-fit bg-white border-1 gap-y-5 
         border-gray-200 rounded-[10px] px-6 py-8 text-xl ${props.className}`}
      style={baseStyle}
    >
      <p
        className="mx-auto"
        style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: "22px" }}
      >
        Create Your Customer Account{" "}
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
              to: "/login",
            });
          }}
        >
          Log In
        </p>
      </div>
    </div>
  );
};

export default CustomerForm;
