import { BaseSyntheticEvent, DetailedHTMLProps, InputHTMLAttributes, RefObject, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';
import { COLORS } from '@resources';

export const disabledInputCSS = `
  border: 1px solid ${COLORS.border};
  background-color: ${COLORS.box};
  color: ${COLORS.black};
  cursor: not-allowed;
`;

export const disabledCheckboxCSS = `
  opacity: 0.5;
  cursor: not-allowed;
`;

export const defaultInputCSS = `
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${COLORS.border};
  background-color: ${COLORS.white};
  padding: 0px 10px;

  outline: none;
  &:focus {
    border: 1px solid ${COLORS.black};
  }

  &:disabled,
  &:read-only {
    ${disabledInputCSS}
  }

  &:invalid {
    border-color: ${COLORS.red};
  }
`;

export const Wrapper = styled.div<{ customStyle: string; }>`
  ${({ customStyle }) => customStyle}
`;

export const Title = styled.div`
  margin: 0px 0px 10px 0px;
  height: 18px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
`;

export const Subtext = styled.div`
  margin: 8px 0px 0px 0px;
  height: 16px;

  font-weight: 300;
  font-size: 13px;
  letter-spacing: -0.39px;
  color: ${COLORS.gray};
`;

export type InputDescription = {
  inputTitle?: string;
  subtext?: string;
  children?: any;
  style?: string;
};

type InputTextStyle = {
  inputTextStyle?: string;
};

export type DefaultInputProps = InputDescription & InputTextStyle & { inputRef?: RefObject<HTMLInputElement> } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'style'| 'ref'>;
export type DefaultTextareaProps = InputDescription & InputTextStyle & { inputRef?: RefObject<HTMLTextAreaElement> } & Omit<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'style'| 'ref'>;

export const InputWrapper = ({
  inputTitle,
  subtext,
  children,
  style = "",
}: InputDescription) => {
  return (
    <Wrapper customStyle={style}>
      {inputTitle && <Title>{inputTitle}</Title>}
      {children}
      {subtext && <Subtext>{subtext}</Subtext>}
    </Wrapper>
  )
};

export const getNumberOnly = (callback: (text: string) => void) => ({ target: { value } }: BaseSyntheticEvent) => {
  const censoredText = value.replace(/[^0-9]/g, '');
  callback(censoredText);
};