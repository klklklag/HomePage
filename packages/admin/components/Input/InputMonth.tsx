import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { COLORS, SVGS, TRANSITION_TIME } from '@resources';
import { DefaultInputProps, InputWrapper } from './base';

const formatDefaultValue = (defaultValue?: string | string[]) => {
  if (!defaultValue) return undefined;
  const value = defaultValue as string;

  const [yearString, monthString] = value.split('.');
  return {
    year: parseInt(yearString),
    month: parseInt(monthString),
  };
};

const getToday = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  return {
    year,
    month,
  };
};

const formatValue = (yearOrMonth: number) => yearOrMonth.toString(10).padStart(2, '0');

const monthList = [
  1, 2, 3, 4,
  5, 6, 7, 8,
  9, 10, 11, 12,
];

type MonthData = {
  year: number;
  month: number;
};

const _InputMonth = ({
  inputTitle,
  subtext,
  style,
  defaultValue,
  ...props
}: {
  defaultValue?: MonthData;
} & Omit<DefaultInputProps, 'defaultValue'>) => {
  const { push, query } = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<MonthData>(formatDefaultValue(query.yearMonth) || getToday());
  const [data, setData] = useState<MonthData>(value);

  const show = useCallback(() => setVisible(true), [setVisible]);
  const hide = useCallback(() => setVisible(false), [setVisible]);

  const increaseYear = useCallback(() => setData(prev => ({ ...prev, year: prev.year + 1 })), [setData]);
  const decreaseYear = useCallback(() => setData(prev => ({ ...prev, year: prev.year - 1 })), [setData]);

  const onClickMonth = useCallback((month: number) => () => {
    setValue({ year: data.year, month });
    hide();
    push({ query: { ...query, yearMonth: `${data.year}.${month.toString(10).padStart(2, '0')}` } });
  }, [setValue, hide, data]);

  useEffect(() => {
    document.addEventListener('mousedown', hide);
    return () => document.removeEventListener('mousedown', hide);
  }, []);

  useEffect(() => {
    visible && setData(value);
  }, [visible]);

  useEffect(() => {
    setValue(formatDefaultValue(query.yearMonth) || getToday());
  }, [query]);

  return (
    <InputWrapper inputTitle={inputTitle} subtext={subtext} style={style}>
      <Root>
        <Display onClick={show} onMouseDown={e => e.stopPropagation()}>
          {`${formatValue(value.year)}.${formatValue(value.month)}`}
          <SvgWrapper visible={visible}><SVGS.SELECT_ICON_ARROW /></SvgWrapper>
        </Display>

        <Container visible={visible} onMouseDown={e => e.stopPropagation()}>
          <CalendarArea>
            <YearWrapper>
              <YearChangeButton onClick={decreaseYear}><SVGS.SELECT_ICON_ARROW stroke={COLORS.black} /></YearChangeButton>
              <YearText>{data.year}</YearText>
              <YearChangeButton onClick={increaseYear}><SVGS.SELECT_ICON_ARROW stroke={COLORS.black} /></YearChangeButton>
            </YearWrapper>
            <MonthWrapper>
              {
                monthList.map((month) =>
                  <Month key={month} onClick={onClickMonth(month)}>{formatValue(month)}</Month>
                )
              }
            </MonthWrapper>
          </CalendarArea>
        </Container>
      </Root>
    </InputWrapper>
  );
};

const monthButtonWidth = 60;
const gap = 5;
const calendarWidth = monthButtonWidth * 4 + gap * 3;

const Root = styled.div`
  position: relative;
  width: fit-content;
  background-color: ${COLORS.white};

  display: flex;
`;
const Display = styled.div`
  width: 140px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid ${COLORS.border};
  padding: 0px 20px 0px 32px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.main};
`;
const SvgWrapper = styled.div<{ visible: boolean; }>`
  display: flex;
  transition: ${TRANSITION_TIME};
  
  ${({ visible }) => visible && `
    transform: rotateX(180deg);
  `}
`;
const Container = styled.div<{ visible: boolean; }>`
  position: absolute;
  z-index: 1;
  top: 100%;
  right: 0px;
  background-color: ${COLORS.white};
  box-shadow: 4px 4px 30px 0px rgba(0, 0, 0, 0.2);
  
  transition: ${TRANSITION_TIME};
  visibility: hidden;
  opacity: 0;

  ${({ visible }) => visible && `
    visibility: visible;
    opacity: 1;
  `}
`;
const YearWrapper = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;
const YearChangeButton = styled.div`
  width: 24px;
  height: 24px;

  cursor: pointer;

  &:first-child { transform: rotate(90deg); }
  &:last-child { transform: rotate(270deg); }
`;
const YearText = styled.div`
  width: 80px;

  font-weight: 700;
  font-size: 24px;
  text-align: center;
`;
const CalendarArea = styled.div`
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const MonthWrapper = styled.div`
  width: ${calendarWidth}px;

  display: flex;
  flex-wrap: wrap;
  gap: ${gap}px;
`;
const Month = styled.div`
  width: ${monthButtonWidth}px;
  height: ${monthButtonWidth}px;
  border-radius: 4px;
  border: 1px solid ${COLORS.border};

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0px;
  color: ${COLORS.black};

  &:hover {
    background-color: ${COLORS.box};
    color: ${COLORS.main};
  }
`;

export const InputMonth = _InputMonth;