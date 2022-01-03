import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import { AuthenticationScreen } from '@layouts';
import { COLORS, decrypt, IMAGES } from '@resources';
import { BottomButton } from '@components';
import { adminAPI } from '@api';

const Component = () => {
  const { replace, query } = useRouter();
  const email = useMemo(() => decrypt(String(query.email)), []);

  const sendAuthEmail = useCallback(async () => {
    if (!email) return;

    const result = await adminAPI.sendEmailAuth({ email });
    if ('errors' in result) {
      alert(result.errors.errMsg);
      return;
    }

    alert('이메일이 재발송되었습니다.');
  }, [email]);

  const GoToLogin = useCallback(() => {
    replace('/login');
  }, []);

  return (
    <AuthenticationScreen>
      <Root>
        <Image src={IMAGES.ICON_EMAIL} width={45} height={30} />
        <Text1>이메일 인증을 완료해 주세요.</Text1>
        <Text2>메일함에서 인증 이메일을 확인해 주세요.<br/><Text3>( {email} )</Text3></Text2>
        <NoticeArea>
          <NoticeAreaTitle>유의사항</NoticeAreaTitle>
          <Ol>
            <Li>인증 메일은 발송시점부터 24시간 동안 유효하며,{'\n'}재발송 시 기존 인증메일은 만료됩니다.{'\n'}반드시 <strong>마지막에 수신된 메일을 확인해 주세요.</strong></Li>
            <Li>메일이 도착하지 않았다면 스팸함을 확인해 주세요.</Li>
          </Ol>
        </NoticeArea>
        <ButtonRow>
          <BottomButton type="button" text="인증메일 재발송" style={resendButtonStyle} onClick={sendAuthEmail} />
          <BottomButton type="button" text="확인" style={confirmButtonStyle} onClick={GoToLogin} />
        </ButtonRow>
      </Root>
    </AuthenticationScreen>
  );
};

const Root = styled.div`
  border-radius: 4px;
  background-color: ${COLORS.white};
  padding: 40px 20px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Text1 = styled.div`
  margin: 20px 0px 0px;
  height: 21px;

  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.54px;
  color: ${COLORS.black};
`;

const Text2 = styled.div`
  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};

  text-align: center;
`;

const Text3 = styled(Text2)`
  margin: 4px 0px 0px;
  color: ${COLORS.blue};
`;

const NoticeArea = styled.div`
  margin: 20px 0px 0px;
  width: 320px;
  height: 160px;
  border-radius: 4px;
  background-color: ${COLORS.box};
  padding: 20px;
`;

const NoticeAreaTitle = styled.div`
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.gray};

  text-align: center;
`;

const Ol = styled.ol`
  padding: 0px 0px 0px 20px;
`;
const Li = styled.li`
  font-weight: 300;
  font-size: 13px;
  letter-spacing: -0.39px;
  line-height: 22px;
  color: ${COLORS.gray};

  white-space: pre-wrap;
`;

const ResendButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  border: 0px solid;
  background-color: transparent;
  padding: 0px;

  cursor: pointer;

  font-weight: 300;
  font-size: 13px;
  letter-spacing: -0.39px;
  color: ${COLORS.gray};
  text-decoration: underline;

  &:hover { opacity: 0.8; }
  &:active { opacity: 0.5; }
`;

const ButtonRow = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 20px;
`;
const confirmButtonStyle = `
  height: 40px;
`;
const resendButtonStyle = confirmButtonStyle + `
  border: 1px solid ${COLORS.main};
  background-color: ${COLORS.white};
  color: ${COLORS.main};
`;

export default Component;