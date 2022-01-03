import { useCallback } from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import { AuthenticationScreen } from '@layouts';
import { COLORS } from '@resources';
import { BottomButton, GoBackButton, InputPhone, InputText } from '@components';

const Component: NextPage = () => {
  const router = useRouter();
  const goToAdditional = useCallback(() => {
    // router.push('/addInfo/1');
  }, [router]);
  return (
    <AuthenticationScreen>
      <Root>
        <GoBackButton href="/login" />
        <Title>비밀번호 찾기</Title>
        <Desc>비밀번호가 기억나지 않아 답답하셨나요?{'\n'}아이디를 입력하시면, 해당 이메일로 임시 비밀번호를 보내드립니다.</Desc>

        <Form>
          <InputText inputTitle="아이디 입력 (이메일)" />
        </Form>

        <BottomButton type="button" style={bottomButtonStyle} text="비밀번호 찾기" onClick={goToAdditional} />
      </Root>
    </AuthenticationScreen>
  );
};

const Root = styled.div`
  width: 80vw;
  max-width: 600px;
  max-height: 100%;
  padding: 30px 40px 40px;
  border-radius: 4px;
  background-color: ${COLORS.white};

  overflow: scroll;
  overflow: overlay;
`;

const Title = styled.div`
  margin: 30px 0px 0px;
  height: 29px;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.96px;
  color: ${COLORS.black};
`;

const Desc = styled.div`
  margin: 20px 0px 0px;
  height: 48px;
  font-weight: 300;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.54px;
  color: ${COLORS.black};

  white-space: pre;
`;

const Form = styled.form`
  margin: 40px 0px 0px 0px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const bottomButtonStyle = `
  margin: 40px 0px 0px;
`;

export default Component
