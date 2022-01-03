import styled from 'styled-components';
import { DefaultInputProps, defaultInputCSS, InputWrapper } from './base';

const _InputText = ({
  inputTitle,
  subtext,
  style,
  inputTextStyle,
  ...props
}: DefaultInputProps) => {
  return (
    <InputWrapper inputTitle={inputTitle} subtext={subtext} style={style}>
      <Input
        type="text"
        inputTextStyle={inputTextStyle}
        {...props}
      />
    </InputWrapper>
  );
}

const Input = styled.input<{ inputTextStyle?: string; }>`
  ${defaultInputCSS}

  ${({ inputTextStyle }) => inputTextStyle}
`;

export const InputText = _InputText;