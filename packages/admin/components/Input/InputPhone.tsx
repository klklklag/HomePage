import { BaseSyntheticEvent, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@resources';
import { DefaultInputProps, defaultInputCSS, InputWrapper, getNumberOnly } from './base';

const parseDefaultValue = (value: string | undefined, maxLengthList: number[]) => {
  if (!value) {
    return ['', '', ''];
  }

  if (value.includes('-')) {
    return value.split('-');
  }
  else {
    const indexList = [
      maxLengthList[0],
      maxLengthList[0] + maxLengthList[1],
      maxLengthList[0] + maxLengthList[1] + maxLengthList[2]
    ];

    return [
      value.slice(0, indexList[0]),
      value.slice(indexList[0], indexList[1]),
      value.slice(indexList[1], indexList[2]),
    ];
  }
}

const _InputPhone = ({
  inputTitle,
  subtext,
  style,
  name,
  maxLengthList = [3, 4, 4],
  defaultValue,
  ...props
}: {
  defaultValue?: string;
  maxLengthList?: number[];
} & Omit<DefaultInputProps, 'defaultValue'>) => {
  const [defaultFirst, defaultSecond, defaultThird]
    = useMemo(() => parseDefaultValue(defaultValue, maxLengthList), [defaultValue, maxLengthList]);

  const [first, setFirst] = useState<string>(defaultFirst);
  const [second, setSecond] = useState<string>(defaultSecond);
  const [third, setThird] = useState<string>(defaultThird);

  const selectOnFocus = useCallback((event: BaseSyntheticEvent) => event.currentTarget.select(), []);

  return (
    <InputWrapper inputTitle={inputTitle} subtext={subtext} style={style}>
      <Root>
        <input name={name} hidden value={first + second + third} readOnly />
        <Input
          {...props}
          type="tel"
          maxLength={maxLengthList[0]}
          value={first}
          onChange={getNumberOnly(setFirst)}
          onFocus={selectOnFocus}
        />

        <Divider />

        <Input
          {...props}
          type="tel"
          maxLength={maxLengthList[1]}
          value={second}
          onChange={getNumberOnly(setSecond)}
          onFocus={selectOnFocus}
        />

        <Divider />

        <Input
          {...props}
          type="tel"
          maxLength={maxLengthList[2]}
          value={third}
          onChange={getNumberOnly(setThird)}
          onFocus={selectOnFocus}
        />
      </Root>
    </InputWrapper>
  );
}

const Root = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
`;

const Input = styled.input`
  ${defaultInputCSS}
  width: ${100 / 3}%;
  text-align: center;
`;

const Divider = styled.div`
  width: 20px;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "-";
    font-size: 14px;
    line-height: 16px;
    color: ${COLORS.blue_dark};
  }
`;

export const InputPhone = _InputPhone;