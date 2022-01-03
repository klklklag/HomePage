import { Children, DetailedHTMLProps, SelectHTMLAttributes, useCallback, useMemo, useRef, useState } from "react";
import styled from 'styled-components';
import { COLORS, noop, SVGS, TRANSITION_TIME } from "@resources";
import { disabledInputCSS, InputDescription, InputWrapper } from "./base";

type OptionProps = {
  label: string;
  value: string;
};

type SelectType = 'default' | 'round';

export type SelectProps =
  InputDescription &
  {
    type?: SelectType;
    defaultValue?: string | number;
  } &
  Omit<DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>, 'style' | 'ref' | 'defaultValue'>;

const useSelectComponent = (type: SelectType) => {
  let Display, Container;

  switch (type) {
    case 'round':
      Display = RoundDisplay;
      Container = RoundContainer;
      break;

    default:
      Display = DefaultDisplay;
      Container = DefaultContainer;
      break;
  }

  return {
    Display,
    Container,
  };
};

const getDefaultValue = (childrenArray: any[], defaultValue?: string | number | undefined): OptionProps => {
  if (!defaultValue) return { label: '선택해주세요.', value: '' };

  const result = childrenArray.find(child => String(child.props.value) === String(defaultValue));
  if (!result) return { label: '선택해주세요.', value: '' };

  return {
    label: result.props.label || result.props.children,
    value: String(defaultValue),
  };
};

const _Select = ({
  inputTitle,
  subtext,
  children,
  style = "",
  type = 'default',
  defaultValue,
  ...props
}: SelectProps) => {
  const { Display, Container } = useSelectComponent(type);
  const ref = useRef<HTMLSelectElement>(null);
  const focusSelect = useCallback(() => ref.current?.focus(), [ref.current]);
  const childrenArray = useMemo(() => Children.toArray(children), [children]);
  const [selected, setSelected] = useState<OptionProps>(getDefaultValue(childrenArray, defaultValue));
  const handleOptionClick = useCallback((option: OptionProps) => () => setSelected(option), [setSelected]);
  return (
    <InputWrapper inputTitle={inputTitle} subtext={subtext} style={style}>
      <Root>
        <HiddenSelect ref={ref} {...props} value={selected.value} onChange={noop}>
          {children}
        </HiddenSelect>
        <Container className="select-box">
          {
            childrenArray.map(({ props: { label, value, children, subtext } }: any) => {
              const labelForm = label || children;
              return (
                <Option key={labelForm} onMouseDown={handleOptionClick({ label: labelForm, value: value})}>
                  <Text>{labelForm}</Text>
                  <Subtext>{subtext}</Subtext>
                </Option>
              );
            })
          }
        </Container>
        <Display className="select-display" onClick={focusSelect}>
          <Text>{selected.label}</Text>
          <SvgWrapper className="svg-wrapper"><SVGS.SELECT_ICON_ARROW /></SvgWrapper>
        </Display>
      </Root>
    </InputWrapper>
  );
};

const Root = styled.div`
  position: relative;
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
    ~ .select-box {
      visibility: visible;
      opacity: 1;
    }

    ~ .select-display {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;

      > .svg-wrapper {
        transform: rotateX(180deg);
      }
    }
  }

  &:disabled {
    ~ .select-display {
      ${disabledInputCSS}
    }
  }
`;

const DefaultDisplay = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${COLORS.border};
  background-color: ${COLORS.white};
  padding: 0px 10px;

  display: flex;
  align-items: center;

  cursor: pointer;

  transition: ${TRANSITION_TIME};
`;

const Text = styled.div`
  height: 18px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.default};
`;

const Subtext = styled.div`
  margin: 0px 12px 0px auto;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: -0.39px;
  color: #686d71;
`;

const SvgWrapper = styled.div`
  margin: 0px 0px 0px auto;

  display: flex;

  transition: ${TRANSITION_TIME};
`;

const DefaultContainer = styled(DefaultDisplay)`
  position: absolute;
  top: 40px;
  z-index: 1;

  height: calc(${({ children }) => (Children.count(children)) * 40}px + 2px);
  max-height: 160px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  padding: 0px;

  flex-direction: column;

  overflow: scroll;
  overflow: overlay;
  
  transition: ${TRANSITION_TIME};
  visibility: hidden;
  opacity: 0;
`;
const Option = styled.div`
  width: 100%;
  height: 40px;
  min-height: 40px;
  padding: 0px 10px;
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

const RoundDisplay = styled(DefaultDisplay)`
  border-radius: 20px;
  padding: 0px 20px;
`;

const RoundContainer = styled(DefaultContainer)`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  > div {
    padding: 0px 20px;
  }
`;

export const Select = _Select;