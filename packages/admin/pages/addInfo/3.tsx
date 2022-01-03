import { FormEvent, useCallback, useEffect } from 'react';
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
  InputUnitNumber,
  SignUpStepIndicator,
  Warning,
} from '@components';
import { useDispatch, useSelector } from 'react-redux';
import { addAdditionalData, RootState, sendPartnershipRequest } from '@shared-state';
import { InputSelectBank } from '@containers';
import { useForm } from '@hooks';

const Component: NextPage = () => {
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const { isSubmitting, handleSubmit } = useForm();
  const successFlag = useSelector(({ addInfo: { successFlag }}: RootState) => successFlag);

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const errMsgList: string[] = [];
    const data = getObjectFromForm(document.getElementsByTagName('form')[0]);

    if (!data.bankCode) errMsgList.push('은행을 선택해 주세요.');
    if (!data.bankAccount) errMsgList.push('계좌번호를 입력해 주세요.');
    if (!data.bankAccountOwner) errMsgList.push('계좌 소유자명을 입력해 주세요.');
    if (typeof data.copyOfBankBookFile !== 'string' && !data.copyOfBankBookFile.name) errMsgList.push('통장 사본을 첨부해 주세요.');

    if (errMsgList.length > 0) {
      alert(errMsgList.join('\n'));
      return;
    }

    await dispatch(addAdditionalData(data));
    await dispatch(sendPartnershipRequest());
  }, []);

  useEffect(() => {
    successFlag && replace('/addInfo/complete');
  }, [successFlag]);

  return (
    <AuthenticationScreen>
      <Root>
        <GoBackButton href="/login" />
        <SignUpStepIndicator step={3} />
        <AddInfoNoticeText>마지막 단계 입니다 🤩{'\n'}통장 사본을 첨부해 주세요.</AddInfoNoticeText>
        <Warning style={warningTextStyle}>입력하신 정보를 확인 후 다시 작성해주세요.</Warning>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <InputSelectBank inputTitle="은행명" style="width: 180px;" />
            <InputUnitNumber name="bankAccount" inputTitle="계좌번호" unit="" style={rowItemStyle} />
          </Row>
          {/* <InputWithAPI name="bankAccountOwner" inputTitle="계좌 소유자" buttonText="계좌 인증" buttonStyle={APIButtonStyle} /> */}
          <InputText name="bankAccountOwner" inputTitle="계좌 소유자" />
          <InputFile name="copyOfBankBookFile" inputTitle="통장 사본 첨부" />

          <BottomButton isSubmitting={isSubmitting} type="submit" style={bottomButtonStyle} text="다음" />
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

const APIButtonStyle = `
  width: 100px;
  min-width: 100px;
`;

const bottomButtonStyle = `
  margin: 20px 0px 0px;
`;

export default Component
