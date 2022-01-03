import { DefaultInputProps, InputText } from "@components";

const _InputEmail = (props: DefaultInputProps) => {
  return (
    <InputText
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
      {...props}
      type="email"
    />
  );
};

export const InputEmail = _InputEmail;