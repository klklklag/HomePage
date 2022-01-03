import styled from 'styled-components';
import { COLORS } from '@resources';
import { DefaultInputProps, defaultInputCSS, InputWrapper, disabledCheckboxCSS } from './base';

export type InputWithAPIProps = {
  buttonText: string;
  buttonStyle?: string;
  callback?: () => void;
  defaultValue?: string;
} & Omit<DefaultInputProps, 'defaultValue'>;

const _InputWithAPI = ({
  inputTitle,
  subtext,
  style,
  buttonText,
  buttonStyle = "",
  callback,
  ...props
}: InputWithAPIProps) => {
  return (
    <InputWrapper inputTitle={inputTitle} subtext={subtext} style={style}>
      <Row>
        <Input
          type="text"
          {...props}
        />

        <Button type="button" customStyle={buttonStyle} onClick={callback} disabled={props.disabled}>{buttonText}</Button>
      </Row>
    </InputWrapper>
  );
}

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  ${defaultInputCSS}
`;

const Button = styled.button<{ customStyle: string; }>`
  width: 120px;
  min-width: 120px;
  height: 40px;
  border-radius: 4px;
  border: 0px;
  background-color: ${COLORS.blue_dark};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.white};

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.5;
  }
  &:disabled {
    ${disabledCheckboxCSS}
  }

  ${({ customStyle }) => customStyle}
`;

export const InputWithAPI = _InputWithAPI;