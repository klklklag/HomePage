import { COLORS } from '@resources';
import styled from 'styled-components';

const _SignUpStepIndicator = ({
  step,
  style = '',
}: {
  step: number;
  style?: string;
}) => {
  return (
    <Root customStyle={style}>
      <NumberStep>{step}/3</NumberStep>
      <StepWrapper>
        <StringStep isFocused={step === 1}>사업자 정보</StringStep>
        <StringStep isFocused={step === 2}>사업자 등록증</StringStep>
        <StringStep isFocused={step === 3}>계좌 정보</StringStep>
      </StepWrapper>
    </Root>
  );
};

const Root = styled.div<{ customStyle: string; }>`
  margin: 30px 0px 0px;
  
  display: flex;
  align-items: center;
  gap: 20px;

  ${({ customStyle }) => customStyle}
`;

const NumberStep = styled.div`
  width: 40px;
  height: 29px;

  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.96px;
  color: ${COLORS.main};
  text-align: center;
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StringStep = styled.div<{ isFocused: boolean; }>`
  height: 18px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.gray};

  ${({ isFocused }) => isFocused &&
    `
      font-weight: 600;
      color: ${COLORS.main};
    `
  }
`;

export const SignUpStepIndicator = _SignUpStepIndicator;