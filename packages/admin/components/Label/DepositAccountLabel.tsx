import styled from 'styled-components';
import { COLORS } from '@resources';

const _DepositAccountLabel = ({
  bankName,
  bankAccount,
}: {
  bankName: string;
  bankAccount: string;
}) => {
  return (
    <Root>
      <Wrapper>
        <Text>은행명:</Text>
        <Text>{bankName}</Text>
      </Wrapper>
      <Wrapper>
        <Text>가상 계좌 번호:</Text>
        <Text>{bankAccount}</Text>
      </Wrapper>
    </Root>
  )
};

const Root = styled.div`
  margin: 0px 0px 0px 20px;

  height: 40px;
  border-radius: 4px;
  background-color: ${COLORS.box};
  padding: 0px 10px;

  display: flex;
  align-items: center;
  gap: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.6px;
  color: ${COLORS.black};
`;

export const DepositAccountLabel = _DepositAccountLabel;