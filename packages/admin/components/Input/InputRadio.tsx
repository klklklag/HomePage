import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { COLORS, SVGS } from '@resources';
import { DefaultInputProps, disabledCheckboxCSS } from './base';

const _InputRadio = ({
  text,
  style,
  children,
  ...props
}: {
  text?: string;
} & DefaultInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const clickRadio = useCallback(() => ref.current?.click(), [ref.current]);
  return (
    <Root customStyle={style} disabled={props.disabled}>
      <Checkbox type="radio" {...props} ref={ref} />
      <Box className="custom-radio" type="button" onClick={clickRadio}>
        <SVGS.ICON_CHECK />
      </Box>
      {
        children ?
          children :
          (text && <Text>{text}</Text>)
      }
    </Root>
  );
};

const Root = styled.label<{ customStyle?: string; disabled?: boolean; }>`
  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;

  ${({ customStyle }) => customStyle}
  ${({ disabled }) => disabled && disabledCheckboxCSS}
`;

const Checkbox = styled.input`
  display: none;

  &:checked {
    ~ .custom-radio {
      border-width: 0px;
      background-color: ${COLORS.main};

      > div {
        border-color: ${COLORS.white};
      }
    }
  }

  &:disabled {
    ~ .custom-radio {
      cursor: not-allowed;
    }
  }
`;

const Box = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid ${COLORS.border};
  background-color: ${COLORS.white};
  padding: 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const Text = styled.span`
  height: 18px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
`;

export const InputRadio = _InputRadio;