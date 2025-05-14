import type { CSSProperties } from "@mui/material";
import { useState, type FunctionComponent } from "react";
import TextField from "../../../GeneralComponents/TextField";
import Button from "../../../GeneralComponents/Button";
import { theme } from "../../../Constants/Colors";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneNumberValidator,
} from "../ClientSide/ValidateForm";
import { GeneralTextCleaner } from "../ClientSide/CleanForm";
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
  whatsapp_number?: string;
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
  });

  return (
    <div
      ref={props.ref}
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
          inputCleaner={GeneralTextCleaner}
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
          inputCleaner={GeneralTextCleaner}
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
        inputValidator={passwordValidator}
      />

      <TextField
        style={{ width: "100%" }}
        label="Phone Number"
        placeholder="123-456-7890"
        value={formData.phone_number}
        setValue={(value) =>
          setFormData((prev) => ({ ...prev, phone_number: value }))
        }
      />
      <TextField
        style={{ width: "100%" }}
        label="WhatsApp Number"
        placeholder="123-456-7890"
        value={formData.phone_number}
        setValue={(value) =>
          setFormData((prev) => ({ ...prev, phone_number: value }))
        }
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
      />
    </div>
  );
};

export default ProviderForm;
