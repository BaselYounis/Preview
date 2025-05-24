import { type FunctionComponent, useEffect, useRef, useState } from "react";
import TextField from "../../../GeneralComponents/TextField";
import { SingleDigitCleaner } from "../../../ClientSide/CleanForm";

interface DigitFieldProps {
  digit: string;
  setDigit: (digit: string) => void;
  onDigitFilled?: () => void;
  onDigitCleared?: () => void;
  focus?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  onPaste?: (pastedText: string) => void;
}

const DigitField: FunctionComponent<DigitFieldProps> = ({
  digit,
  setDigit,
  onDigitFilled,
  onDigitCleared,
  focus,
  inputRef,
  onPaste,
}) => {
  const [outline, setOutline] = useState(false);

  // Update outline based on digit value - this helps when setting programmatically
  useEffect(() => {
    setOutline(digit.length === 1);
  }, [digit]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // When backspace is pressed and the field is empty, trigger the onDigitCleared callback
    if (e.key === "Backspace" && digit === "") {
      if (onDigitCleared) onDigitCleared();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    // Prevent default paste behavior
    e.preventDefault();

    // We'll handle the paste event at the parent component level
    e.stopPropagation();

    // Get the clipboard data
    const pastedText = e.clipboardData.getData("text");

    // If there's a parent paste handler in props, call it with the pasted text
    if (pastedText && onPaste) {
      onPaste(pastedText);
    }
  };

  return (
    <TextField
      value={digit}
      setValue={(value) => {
        setDigit(value);
        if (value.length === 1) {
          setOutline(true);
          if (onDigitFilled) onDigitFilled();
        } else if (value.length === 0) {
          if (onDigitCleared) onDigitCleared();
          setOutline(false);
        }
      }}
      inputCleaner={SingleDigitCleaner}
      textAlign="center"
      placeholder=""
      sizeFactor={2.1}
      widthFactor={0.1}
      heightFactor={0.7}
      autoFocus={focus}
      ref={inputRef}
      outline={outline}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
    />
  );
};

interface VerificationCodeFieldProps {
  verificationCode: string;
  setVerificationCode: (code: string) => void;
}

const VerificationCodeField: FunctionComponent<VerificationCodeFieldProps> = ({
  verificationCode,
  setVerificationCode,
}) => {
  const [firstHover, setFirstHover] = useState(true);
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

  // Handle paste for the entire verification code
  const handlePaste = (pastedText: string) => {
    // Clean the pasted text to keep only digits
    const cleanedText = pastedText.replace(/[^0-9]/g, "");

    // Take only the first 6 digits (or fewer if less were pasted)
    const codeToUse = cleanedText.substring(0, 6);

    // Update the verification code
    setVerificationCode(
      codeToUse.padEnd(
        verificationCode.length,
        verificationCode.substring(codeToUse.length)
      )
    );

    // Focus on the appropriate field based on the length of the pasted code
    if (codeToUse.length < 6 && codeToUse.length > 0) {
      setTimeout(() => {
        inputRefs.current[codeToUse.length]?.focus();
      }, 0);
    }
  };

  return (
    <div
      className="flex flex-row gap-x-2 w-full"
      onMouseEnter={() => {
        if (!firstHover) return;
        setVerificationCode("");
        setFirstHover(false);
      }}
    >
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <DigitField
          key={index}
          digit={verificationCode[index] || ""}
          setDigit={(digit) => {
            const codeArray = verificationCode.split("");
            codeArray[index] = digit;
            setVerificationCode(codeArray.join(""));
          }}
          onDigitFilled={() => {
            if (index < 5) {
              inputRefs.current[index + 1]?.focus();
            }
          }}
          onDigitCleared={() => {
            if (index > 0) {
              inputRefs.current[index - 1]?.focus();
            }
          }}
          focus={index === 0}
          inputRef={(el) => {
            inputRefs.current[index] = el;
          }}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
};

export default VerificationCodeField;
