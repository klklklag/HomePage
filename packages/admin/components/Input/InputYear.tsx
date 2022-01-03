import { DetailedHTMLProps, SelectHTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { COLORS, noop, SVGS, TRANSITION_TIME } from '@resources';

const _InputYear = ({
  style,
  ...props
}: {
  style?: string;
} & Omit<DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>, 'style' | 'ref'>) => {
  const { push, query } = useRouter();
  const selectRef = useRef<HTMLSelectElement>(null);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const defaultYear = Number(query.year) || currentYear;
  const children = useMemo(() => Array.from({ length: currentYear - 2020 }, (_, idx) => 2021 - idx), []);
  const [year, setYear] = useState<number>(defaultYear);

  const focusOnSelect = useCallback(() => selectRef.current?.focus(), [selectRef.current]);
  const handleSelect = useCallback((selectedYear: number) => () => {
    if (year === selectedYear) return;

    setYear(selectedYear);
    push({
      query: {
        ...query,
        year: selectedYear,
      }
    });
  }, [year, setYear, push]);

  useEffect(() => {
    setYear(defaultYear);
  }, [query.year]);
  return (
    <Root customStyle={style}>
      <HiddenSelect {...props} ref={selectRef} value={year} onChange={noop}>
        {children.map((year: number) => <option key={year} value={year}>{year}</option>)}
      </HiddenSelect>

      <Display className="year-picker-display" onClick={focusOnSelect}>
        {year}
        <SvgWrapper className="year-picker-svg"><SVGS.SELECT_ICON_ARROW /></SvgWrapper>
      </Display>

      <Container className="year-picker-container">
        {
          children.map((year: number) =>
            <Option key={year} onMouseDown={handleSelect(year)}>
              <Text>{year}</Text>
            </Option>
          )
        }
      </Container>
    </Root>
  );
};

const Root = styled.div<{customStyle?: string;}>`
  position: relative;
  width: fit-content;
  background-color: ${COLORS.white};

  display: flex;

  ${({ customStyle }) => customStyle}
`;
const HiddenSelect = styled.select`
  position: absolute;

  margin: 0px;
  width: 0px;
  height: 0px;
  padding: 0px;
  border: 0px;

  opacity: 0;

  &:focus {
    ~ .year-picker-display {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;

      > .year-picker-svg {
        transform: rotateX(180deg);
      }
    }

    ~ .year-picker-container {
      visibility: visible;
      opacity: 1;
    }
  }
`;
const Display = styled.div`
  width: 140px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid ${COLORS.border};
  background-color: ${COLORS.white};
  padding: 0px 20px 0px 32px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.main};

  transition: ${TRANSITION_TIME};
`;
const SvgWrapper = styled.div`
  display: flex;
  transition: ${TRANSITION_TIME};
`;
const Container = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0px;

  width: 100%;
  max-height: 160px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border: 1px solid ${COLORS.border};
  background-color: ${COLORS.white};

  overflow: overlay;

  transition: ${TRANSITION_TIME};
  visibility: hidden;
  opacity: 0;
`;
const Option = styled.div`
  width: 100%;
  height: 40px;
  min-height: 40px;
  padding: 0px 32px;
  background-color: ${COLORS.white};
  border: solid ${COLORS.border};
  border-width: 0px 0px 1px 0px;

  display: flex;
  align-items: center;

  cursor: pointer;

  &:last-child {
    border-width: 0px 0px 0px 0px;
  }

  &:hover {
    background-color: ${COLORS.box};
    
    > div {
      color: ${COLORS.main};
    }
  }
`;
const Text = styled.div`
  height: 18px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.default};
`;

export const InputYear = _InputYear;