import { BaseSyntheticEvent, Dispatch, SetStateAction, useState } from "react";
import { InputText, InputWithAPI, InputWithAPIProps } from "@components";

export const formatBRN = (str: string | undefined) => {
  if (!str) return undefined;

  const censoredText: string = str.replace(/[^0-9]/g, '');
  const first = censoredText.slice(0, 3);
  const second = censoredText.slice(3, 5);
  const third = censoredText.slice(5, 10);

  let result = first;
  if (second) { result += ("-" + second); }
  if (third) { result += ("-" + third); }

  return result;
};

const handleChange = (callback: Dispatch<SetStateAction<string>>) => ({ target: { value }}: BaseSyntheticEvent) => callback(formatBRN(value) || '');
const selectOnFocus = (event: BaseSyntheticEvent) => event.target.select();

const _InputBRN = ({ defaultValue, ...props }: Omit<InputWithAPIProps, 'buttonText'>) => {
  const [value, setValue] = useState<string>(formatBRN(defaultValue) || '');
  return (
    // <InputWithAPI
    //   {...props}
    //   type="tel"
    //   buttonText="사업자 인증"
    //   value={value}
    //   onChange={handleChange(setValue)}
    //   onFocus={selectOnFocus}
    //   placeholder="000-00-00000"
    //   pattern="^(\d{3,3})+[-]+(\d{2,2})+[-]+(\d{5,5})"
    //   title="3자리 - 2자리 - 5자리 숫자"
    //   minLength={12}
    //   maxLength={12}
    // />

    <InputText
      {...props}
      type="tel"
      value={value}
      onChange={handleChange(setValue)}
      onFocus={selectOnFocus}
      placeholder="000-00-00000"
      pattern="^(\d{3,3})+[-]+(\d{2,2})+[-]+(\d{5,5})"
      title="3자리 - 2자리 - 5자리 숫자"
      minLength={12}
      maxLength={12}
    />
  );
}

export const InputBRN = _InputBRN;