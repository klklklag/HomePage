import styled from 'styled-components';
import { DefaultInputProps, defaultInputCSS, InputWrapper } from './base';

const _InputPassword = ({
  inputTitle,
  subtext,
  style,
  ...props
}: DefaultInputProps) => {
  return (
    <InputWrapper inputTitle={inputTitle} subtext={subtext} style={style}>
      <Input
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&/-]{8,}"
        {...props}
        type="password"
      />
    </InputWrapper>
  );
}

const Input = styled.input`
  ${defaultInputCSS}
`;

export const InputPassword = _InputPassword;