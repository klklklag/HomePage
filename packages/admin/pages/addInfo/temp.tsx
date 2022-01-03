import { useCallback } from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { AuthenticationScreen } from '@layouts';
import { COLORS } from '@resources';
import {
  AddInfoNoticeText,
  BottomButton,
  GoBackButton,
  InputWithAPI,
  SignUpStepIndicator,
} from '@components';

const Component: NextPage = () => {
  const router = useRouter();
  const handlePressNext = useCallback(() => {
    router.replace('/addInfo/2');
  }, [router]);
  return (
    <AuthenticationScreen>
      <Root>
        <GoBackButton href="/login" />
        <SignUpStepIndicator step={1} />
        <AddInfoNoticeText>서비스 이용을 위해{'\n'}이메일 인증을 진행해 주세요.</AddInfoNoticeText>

        <InputWithAPI inputTitle="이메일 (아이디)" subtext="해당 이메일로 발송된 이메일을 확인 후 계속 진행해 주세요." style={inputStyle} buttonText="인증 메일 전송" />

        <BottomButton style={bottomButtonStyle} text="다음" onClick={handlePressNext} />
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

const inputStyle = `
  margin: 48px 0px 0px;
`;

const bottomButtonStyle = `
  margin: 70px 0px 0px;
`;

export default Component
