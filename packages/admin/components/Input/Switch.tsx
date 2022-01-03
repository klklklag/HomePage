import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS, TRANSITION_TIME } from '@resources';
import { DefaultInputProps, InputWrapper } from './base';

const _Switch = ({
  inputTitle,
  subtext,
  style,

  labelStyle,
  labelPosition,
  labelTexts,

  defaultValue = false,
  shippingFunc,
  ...props
}: {
  defaultValue?: boolean;
  shippingFunc?: (value: boolean) => void;
} & LabelProps & Omit<DefaultInputProps, 'defaultValue'>) => {
  const [value, setValue] = useState<boolean>(defaultValue);
  const toggleValue = useCallback(() => setValue(prev => !prev), []);
  useEffect(() => {
    shippingFunc?.(value);
  }, [value]);

  return (
    <InputWrapper inputTitle={inputTitle} subtext={subtext} style={style}>
      <Container labelPosition={labelPosition}>
        {!!labelTexts && <Label customStyle={labelStyle}>{value ? labelTexts.on : labelTexts.off}</Label>}
        <Track type="button" switchValue={value} onClick={toggleValue}>
          <Input {...props} type="hidden" value={String(value)} />
          <Handle switchValue={value} />
        </Track>
      </Container>
    </InputWrapper>
  );
};

type SwitchValue = { switchValue: boolean; };
type LabelProps = {
  labelStyle?: string;
  labelTexts?: {
    on: string;
    off: string;
  };
  labelPosition?: 'right' | 'left';
};

const Container = styled.div<{ labelPosition?: LabelProps['labelPosition']; }>`
  display: flex;
  align-items: center;

  ${({ labelPosition }) => labelPosition === 'right' && `
    flex-direction: row-reverse;
    justify-content: flex-end;
  `}
`;
const Label = styled.div<{ customStyle?: string; }>`
  font-weight: 400;
  font-size: 14px;
  color: ${COLORS.black};

  ${({ customStyle }) => customStyle}
`;

const trackWidth = 50;
const trackHeight = 30;
const trackPadding = 2;
const handleHeight = trackHeight - 2 * trackPadding;

const Track = styled.button<SwitchValue>`
  position: relative;
  width: ${trackWidth}px;
  height: ${trackHeight}px;
  border-radius: ${trackHeight}px;
  border: 0px solid;
  background-color: ${({ switchValue }) => switchValue ? COLORS.main : "#B0B5C1"};
  padding: ${trackPadding}px;

  cursor: pointer;

  transition: ${TRANSITION_TIME};
`;

const Input = styled.input``;

const Handle = styled.div<SwitchValue>`
  position: relative;
  left: ${({ switchValue }) => switchValue ? `calc(${trackWidth}px - 2 * ${trackPadding}px - ${handleHeight}px)` : '0px'};
  width: ${handleHeight}px;
  height: ${handleHeight}px;
  border-radius: 50%;
  background-color: ${COLORS.white};

  transition: ${TRANSITION_TIME};
`;

const TextOn = styled.div<SwitchValue>`
  position: absolute;
  top: ${trackPadding}px;
  left: 8px;
  height: ${handleHeight}px;

  display: flex;
  align-items: center;

  font-weight: bold;
  font-size: 12px;

  color: ${COLORS.white};

  transition: ${TRANSITION_TIME};
  opacity: ${({ switchValue }) => switchValue ? 1 : 0};
`;

const TextOff = styled(TextOn)`
  left: 24px;
  opacity: ${({ switchValue }) => switchValue ? 0 : 1};
`;

export const Switch = _Switch;