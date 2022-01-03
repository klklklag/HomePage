import { FormEvent, useCallback, useEffect } from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AuthenticationScreen } from '@layouts';
import { COLORS, encrypt, getObjectFromForm } from '@resources';
import { BottomButton, InputCheckbox, InputPassword } from '@components';
import { PartnerAPI_Login_Params, partnerAPI } from '@api';
import { addAdditionalData, contentFacade } from '@shared-state';
import { InputEmail } from '@containers';
import { useForm } from '@hooks';

const formId = 'loginForm';

const Component: NextPage = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { isSubmitting, handleSubmit } = useForm();

  const handleLogin = useCallback(async () => {
    const errMsgList: string[] = [];
    const data = getObjectFromForm(document.getElementById(formId));

    if (!data.managerEmail) errMsgList.push('이메일을 입력해 주세요.');
    if (!data.managerPw) errMsgList.push('비밀번호를 입력해 주세요.');

    if (errMsgList.length > 0) {
      alert(errMsgList.join('\n'));
      return;
    }

    const params: PartnerAPI_Login_Params = {
      managerEmail: data.managerEmail,
      managerPw: data.managerPw,
    };

    const result = await partnerAPI.login(params);
    if ('errors' in result) {
      alert(result.errors.errMsg);
      return;
    }
    if (!result.isEmailAuth) {
      push({
        pathname: '/email/[email]',
        query: {
          email: encrypt(result.managerEmail),
        },
      });
      return;
    }
    if (!result.partnerLicenseId) {
      const { managerEmail } = result;
      dispatch(addAdditionalData({ managerEmail }));
      push('/addInfo/1');
      return;
    }

    push(
      {
        pathname: `/partners/[partnerId]/invoice`,
        query: { partnerId: encrypt(result.partnerLicenseId) },
        // query: { partnerId: encrypt('5100856026') },
      },
    );
  }, [push]);

  useEffect(() => {
    dispatch(contentFacade());
  }, []);
  return (
    <AuthenticationScreen>
      <Root>
        <IntroRow>
          <Hello>
            안녕하세요 !{'\n'}
            <Intro>땡쓰{' '}
              <Mint>파트너스센터</Mint>입니다.
            </Intro>
          </Hello>
          
          <Link href="/signUp"><SignUpButton><div>제휴 기업 가입</div></SignUpButton></Link>
        </IntroRow>
        <Subtext>로그인이 필요한 서비스입니다.</Subtext>

        <Form id={formId} onSubmit={handleSubmit(handleLogin)}>
          <div>
            <InputProperty>이메일</InputProperty>
            <InputEmail name="managerEmail" />
          </div>

          <div>
            <InputProperty>비밀번호</InputProperty>
            <InputPassword name="managerPw" pattern=".*" />
          </div>

          <Row>
            <InputCheckbox text="로그인 유지하기" />
            <Span>
              <Link href="/userInquiry/idInquiry"><Atag>아이디</Atag></Link>
              /
              <Link href="/userInquiry/pwInquiry"><Atag>비밀번호 찾기</Atag></Link>
            </Span>
          </Row>

          <BottomButton type="submit" style={bottomButtonStyle} text="로그인" isSubmitting={isSubmitting} />
        </Form>
      </Root>
    </AuthenticationScreen>
  );
};

const Root = styled.div`
  width: 80vw;
  max-width: 600px;
  max-height: 100%;
  padding: 48px 40px 40px;
  border-radius: 4px;
  background-color: ${COLORS.white};

  overflow: scroll;
  overflow: overlay;
`;

const Hello = styled.span`
  height: 64px;

  font-weight: 300;
  font-size: 24px;
  line-height: 35px;
  letter-spacing: -0.96px;
  color: ${COLORS.black};

  white-space: pre;
`;

const Intro = styled(Hello)`
  font-weight: 600;
`;

const Mint = styled(Intro)`
  color: ${COLORS.main};
`;

const Subtext = styled.div`
  margin: 10px 0px 0px;

  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: -0.54;
  color: ${COLORS.gray};
`;

const Form = styled.form`
  margin: 40px 0px 0px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputProperty = styled.div`
  margin: 0px 0px 10px;

  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: -0.45;
  color: ${COLORS.black};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IntroRow = styled(Row)`
  align-items: flex-start;
`;

const Span = styled.span`
  height: 18px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
`;

const Atag = styled.a`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${COLORS.black};
  }
`;

const bottomButtonStyle = `
  margin: 20px 0px 0px;
`;

const SignUpButton = styled.a`
  width: 120px;
  height: 32px;
  border-radius: 25px;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.main};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  & > div {
    height: 18px;
    font-weight: 500;
    font-size: 15px;
    letter-spacing: -0.45px;
    color: ${COLORS.main};
  }

  &:hover,
  &:active {
    background-color: ${COLORS.main};
    border-width: 0px;

    & > div {
      color: ${COLORS.white};
    }
  }
  &:active {
    opacity: 0.5;
  }
`;

export default Component
