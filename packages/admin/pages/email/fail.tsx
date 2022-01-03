import { useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { AuthenticationScreen } from '@layouts';
import { COLORS } from '@resources';
import { BottomButton } from '@components';

const Component = () => {
  const { replace } = useRouter();
  const onClick = useCallback(() => {
    replace('/login');
  }, [replace]);
  return (
    <AuthenticationScreen>
      <Root>
        <ResultText>이메일 인증에 실패했습니다 🙁</ResultText>
        <DescText>다시 로그인 후, 재발송된 이메일 인증을 확인해 주세요.</DescText>
        <BottomButton text="확인" style="margin: 48px 0px 0px; height: 40px;" onClick={onClick} />
      </Root>
    </AuthenticationScreen>
  );
};

const Root = styled.div`
  width: 360px;
  max-height: 100%;
  padding: 48px 20px 20px;
  border-radius: 4px;
  background-color: ${COLORS.white};

  overflow: scroll;
  overflow: overlay;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultText = styled.div`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.54px;
  color: ${COLORS.black};
`;

const DescText = styled.div`
  margin: 10px 0px 0px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
  line-height: 22px;
  text-align: center;
`;

export default Component