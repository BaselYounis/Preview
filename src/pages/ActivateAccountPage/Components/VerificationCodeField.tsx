import { type FunctionComponent, useRef, useState } from "react";
import TextField from "../../../GeneralComponents/TextField";
import { SingleDigitCleaner } from "../../../ClientSide/CleanForm";

interface DigitFieldProps {
  digit: string;
  setDigit: (digit: string) => void;
  onDigitFilled?: () => void;
  onDigitCleared?: () => void;
  focus?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

const DigitField: FunctionComponent<DigitFieldProps> = ({
  digit,
  setDigit,
  onDigitFilled,
  onDigitCleared,
  focus,
  inputRef,
}) => {
  const [outline, setOutline] = useState(false);
  return (
    <TextField
      value={digit}
      setValue={(value) => {
        setDigit(value);
        if (value.length === 1) {
          setOutline(true);
          if (onDigitFilled) onDigitFilled();
        } else {
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
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRef4 = useRef<HTMLInputElement>(null);
  const inputRef5 = useRef<HTMLInputElement>(null);
  const inputRef6 = useRef<HTMLInputElement>(null);

  return (
    <div
      className="flex flex-row gap-x-2 w-full"
      onMouseEnter={() => {
        if (!firstHover) return;
        setVerificationCode("");
        setFirstHover(false);
      }}
    >
      <DigitField
        digit={verificationCode[0] || ""}
        setDigit={(digit) => {
          const codeArray = verificationCode.split("");
          codeArray[0] = digit;
          setVerificationCode(codeArray.join(""));
        }}
        onDigitFilled={() => {
          inputRef2.current?.focus();
        }}
        focus={true}
        inputRef={inputRef1}
      />
      <DigitField
        digit={verificationCode[1] || ""}
        setDigit={(digit) => {
          const codeArray = verificationCode.split("");
          codeArray[1] = digit;
          setVerificationCode(codeArray.join(""));
        }}
        onDigitFilled={() => {
          inputRef3.current?.focus();
        }}
        onDigitCleared={() => {
          inputRef1.current?.focus();
        }}
        inputRef={inputRef2}
      />
      <DigitField
        digit={verificationCode[2] || ""}
        setDigit={(digit) => {
          const codeArray = verificationCode.split("");
          codeArray[2] = digit;
          setVerificationCode(codeArray.join(""));
        }}
        onDigitFilled={() => {
          inputRef4.current?.focus();
        }}
        onDigitCleared={() => {
          inputRef2.current?.focus();
        }}
        inputRef={inputRef3}
      />
      <DigitField
        digit={verificationCode[3] || ""}
        setDigit={(digit) => {
          const codeArray = verificationCode.split("");
          codeArray[3] = digit;
          setVerificationCode(codeArray.join(""));
        }}
        onDigitFilled={() => {
          inputRef5.current?.focus();
        }}
        onDigitCleared={() => {
          inputRef3.current?.focus();
        }}
        inputRef={inputRef4}
      />
      <DigitField
        digit={verificationCode[4] || ""}
        setDigit={(digit) => {
          const codeArray = verificationCode.split("");
          codeArray[4] = digit;
          setVerificationCode(codeArray.join(""));
        }}
        onDigitFilled={() => {
          inputRef6.current?.focus();
        }}
        onDigitCleared={() => {
          inputRef4.current?.focus();
        }}
        inputRef={inputRef5}
      />
      <DigitField
        digit={verificationCode[5] || ""}
        setDigit={(digit) => {
          const codeArray = verificationCode.split("");
          codeArray[5] = digit;
          setVerificationCode(codeArray.join(""));
        }}
        onDigitCleared={() => {
          inputRef5.current?.focus();
        }}
        inputRef={inputRef6}
      />
    </div>
  );
};

export default VerificationCodeField;
