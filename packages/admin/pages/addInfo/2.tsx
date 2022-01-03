import { FormEvent, useCallback } from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { AuthenticationScreen } from '@layouts';
import { COLORS, getObjectFromForm } from '@resources';
import {
  AddInfoNoticeText,
  BottomButton,
  GoBackButton,
  InputFile,
  InputText,
  SignUpStepIndicator,
  Warning,
} from '@components';
import { InputBRN } from '@containers';
import { useDispatch } from 'react-redux';
import { addAdditionalData } from '@shared-state';

const Component: NextPage = () => {
  const { replace } = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const errMsgList: string[] = [];
    const data = getObjectFromForm(document.getElementsByTagName('form')[0]);
    console.log(data);

    if (!data.partnerCEO) errMsgList.push('대표자명을 입력해 주세요.');
    if (!data.partnerLicenseId) errMsgList.push('사업자 등록 번호를 입력해 주세요.');
    if (typeof data.partnerLicenseFile !== 'string' && !data.partnerLicenseFile.name) errMsgList.push('사업자 등록증을 첨부해 주세요.');

    if (errMsgList.length > 0) {
      alert(errMsgList.join('\n'));
      return;
    }

    dispatch(addAdditionalData(data));
    replace('/addInfo/3');
  }, []);
  return (
    <AuthenticationScreen>
      <Root>
        <GoBackButton href="/login" />
        <SignUpStepIndicator step={2} />
        <AddInfoNoticeText>사업자 등록증을{'\n'}첨부해주세요.</AddInfoNoticeText>
        <Warning style={warningTextStyle}>입력하신 정보를 확인 후 다시 작성해주세요.</Warning>

        <Form onSubmit={handleSubmit}>
          <InputText name="partnerCEO" inputTitle="대표자명" style={rowItemStyle} />
          <InputBRN name="partnerLicenseId" inputTitle="사업자 등록 번호" />
          <InputFile name="partnerLicenseFile" inputTitle="사업자 등록증 첨부" />

          <BottomButton type="submit" style={bottomButtonStyle} text="다음" />
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

const warningTextStyle = `margin: 15px 0px 0px;`;

const Form = styled.form`
  margin: 15px 0px 0px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const rowItemStyle = `
  flex: 1;
`;

const bottomButtonStyle = `
  margin: 20px 0px 0px;
`;

export default Component
