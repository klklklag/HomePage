import { BaseSyntheticEvent, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@resources';
import { DefaultInputProps, defaultInputCSS, InputWrapper, getNumberOnly, disabledInputCSS } from './base';

const _InputUnitNumber = ({
  inputTitle,
  subtext,
  style,
  unit = "원",
  defaultValue,
  ...props
}: {
  defaultValue?: string | number;
  unit: string;
} & Omit<DefaultInputProps, 'defaultValue'>) => {
  const [value, setValue] = useState<string>(String(defaultValue || ''));

  const ref = useRef<HTMLInputElement>(null);
  const focus = useCallback(() => ref.current?.focus(), [ref.current]);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const onFocus = useCallback(() => setIsFocused(true), [setIsFocused]);
  const onBlur = useCallback(() => setIsFocused(false), [setIsFocused]);

  return (
    <InputWrapper inputTitle={inputTitle} subtext={subtext} style={style}>
      <Wrapper onClick={focus} isFocused={isFocused} disabled={props.disabled} readOnlyFlag={props.readOnly}>
        <Input
          {...props}
          type="tel"
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
          value={value}
          onChange={getNumberOnly(setValue)}
        />
        {unit && <Unit>{unit}</Unit>}
      </Wrapper>
    </InputWrapper>
  );
}

const Wrapper = styled.div<{ isFocused: boolean; disabled?: boolean; readOnlyFlag?: boolean; }>`
  ${defaultInputCSS}
  padding: 0px;

  display: flex;
  align-items: center;

  ${({ isFocused }) => isFocused && `border: 1px solid ${COLORS.black};`}
  ${({ readOnlyFlag }) => !readOnlyFlag && `
    &:read-only {
      background-color: ${COLORS.white};
      cursor: text;
    }
  `}
  ${({ disabled }) => disabled && `
    &:read-only {
      ${disabledInputCSS}
    }
  `}
`;

const Input = styled.input`
  ${defaultInputCSS}

  flex: 1;
  height: 100%;
  border-radius: 4px;
  border: 0px solid transparent !important;
  padding: 0px 10px;
  
  outline: none;

  &:focus {
    border: 0px solid transparent;
  }
`;

const Unit = styled.div`
  margin: 0px 10px 0px 0px;
  height: 18px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
`;

export const InputUnitNumber = _InputUnitNumber;