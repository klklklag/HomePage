import styled from 'styled-components';
import { COLORS } from '@resources';

export const OnWorkLabel = () => <OnWork>근무중</OnWork>;
export const OnHoldLabel = () => <OnHold>지급정지</OnHold>;
export const LeftWorkLabel = () => <LeftWork>퇴사</LeftWork>;

const Root = styled.div`
  margin: 0px 0px 0px 8px;
  height: 20px;
  border-radius: 4px;
  background-color: ${COLORS.pink};
  padding: 0px 7px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  font-size: 13px;
  letter-spacing: -0.39px;
  color: ${COLORS.pink_dark};
`;

const OnWork = styled(Root)`
  background-color: #d5f7fa;
  color: ${COLORS.main};
`;

const OnHold = styled(Root)`
  background-color: ${COLORS.pink};
  color: ${COLORS.pink_dark};
`;

const LeftWork = styled(Root)`
  background-color: ${COLORS.border};
  color: ${COLORS.gray_dark};
`;