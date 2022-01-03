import { FormEvent, useCallback, useState } from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { AuthenticationScreen } from '@layouts';
import { COLORS, encrypt, getObjectFromForm } from '@resources';
import { BottomButton, GoBackButton, InputCheckbox, InputPassword, InputPhone, InputText, InputUnitNumber, useModal } from '@components';
import { partnerAPI, PartnerAPI_Signup_Params } from '@api';
import { InputSelectSalaryDay, SendEmailModal } from '@containers';
import { useForm } from '@hooks';

const Component: NextPage = () => {
  const { push } = useRouter();
  const { isSubmitting, handleSubmit } = useForm();

  const handleSignUp = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const errMsgList: string[] = [];
    const data = getObjectFromForm(document.getElementsByTagName('form')[0]);

    if (!data.managerEmail) errMsgList.push('이메일을 입력해 주세요.');
    if (!data.managerPw) errMsgList.push('비밀번호를 입력해 주세요.');
    if (!data.managerPwCheck) errMsgList.push('비밀번호 확인을 입력해 주세요.');
    if (!data.managerName) errMsgList.push('담당자 이름을 입력해 주세요.');
    if (!data.managerPhone) errMsgList.push('담당자 전화번호를 입력해 주세요.');
    if (!data.salaryDay) errMsgList.push('급여일을 입력해 주세요.');
    if (!data.initialDeposit) errMsgList.push('거치 희망 보증금을 입력해 주세요.');
    if (!data.requiredTerm) errMsgList.push('필수약관에 동의해 주세요.');

    if (data.managerPw !== data.managerPwCheck) errMsgList.push('비밀번호가 일치하지 않습니다.');

    if (errMsgList.length > 0) {
      alert(errMsgList.join('\n'));
      return;
    }
    
    
    // console.log('API call');
    const params: PartnerAPI_Signup_Params = {
      partnerManagerInfo: {
        managerEmail: data.managerEmail,
        managerPw: data.managerPw,
        managerName: data.managerName,
        managerPhone: data.managerPhone,
        salaryDay: data.salaryDay,
        initialDeposit: data.initialDeposit,
      },
      partnerOptionalTermsInfo: {
        managerEmail: data.managerEmail,
        termsCodeList: data.optionalTerm ? [7] : [],
      }
    };

    const result = await partnerAPI.signup(params);
    if ('errors' in result) {
      alert(result.errors.errMsg);
      return;
    }

    push({
      pathname: `/email/[email]`,
      query: {
        email: encrypt(data.managerEmail),
      },
    })
  }, []);
  return (
    <AuthenticationScreen>
      <Root>
        <GoBackButton href="/login" />
        <ScreenTitle>기업 회원가입</ScreenTitle>
        <ScreenDesc>기업 전용 회원가입 화면입니다.</ScreenDesc>
        <Warning>* 모든 정보는 필수 입력 사항입니다.</Warning>

        <Form onSubmit={handleSubmit(handleSignUp)}>
          <Area>
            <AreaTitle>계정 정보</AreaTitle>
            <InputText name="managerEmail" inputTitle="이메일 (아이디)" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
            <InputPassword name="managerPw" inputTitle="비밀번호" subtext="영문 대소문자/숫자/특수문자를 포함하여 8자 이상 입력해 주세요." />
            <InputPassword name="managerPwCheck" inputTitle="비밀번호 확인" subtext="비밀번호를 다시 입력해 주세요." />
            <InputText name="managerName" inputTitle="담당자 이름" />
            <InputPhone name="managerPhone" inputTitle="담당자 전화번호" />
          </Area>

          <Area>
            <AreaTitle>땡쓰 설정</AreaTitle>
            <InputSelectSalaryDay inputTitle="급여일" />
            <InputUnitNumber name="initialDeposit" inputTitle="거치 희망 보증금" unit="원" />
          </Area>

          <CheckboxArea>
            <InputCheckbox name="requiredTerm" text="마케팅 정보 수신 동의 (선택)" >
              <LabelText>
                <Atag href="#" target="_blank">이용약관</Atag>{' '}
                및{' '}
                <Atag href="#" target="_blank">개인정보 처리 방침</Atag>에 동의합니다. (필수)
              </LabelText>
            </InputCheckbox>
            <InputCheckbox name="optionalTerm" text="마케팅 정보 수신 동의 (선택)" />
          </CheckboxArea>
          
          <BottomButton type="submit" text="회원가입" isSubmitting={isSubmitting} />
        </Form>
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

const ScreenTitle = styled.div`
  margin: 30px 0px 0px 0px;

  height: 29px;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.96px;
  color: ${COLORS.black};
`;
const ScreenDesc = styled.div`
  margin: 20px 0px 0px 0px;
  
  height: 18px;
  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
`;
const Warning = styled(ScreenDesc)`
  margin: 40px 0px 0px 0px;

  color: ${COLORS.red_dark};
`;

const Form = styled.form`
  margin: 40px 0px 0px 0px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Area = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const AreaTitle = styled.div`
  height: 21px;

  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.54px;
  color: ${COLORS.black};
`;
const CheckboxArea = styled(Area)`
  gap: 10px;
`;

const LabelText = styled.span`
  height: 18px;

  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
`;
const Atag = styled.a`
  color: ${COLORS.blue};
`;

export default Component
