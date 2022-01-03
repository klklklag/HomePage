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
        <Title>아이디 찾기</Title>
        <Desc>아이디가 기억나지 않아 답답하셨나요?{'\n'}가입된 정보를 입력하시면, 아이디 찾기가 완료됩니다.</Desc>

        <Form>
          <InputText inputTitle="이름" />
          <InputPhone inputTitle="휴대폰 번호" />
        </Form>

        <BottomButton type="button" style={bottomButtonStyle} text="아이디 찾기" onClick={goToAdditional} />
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
