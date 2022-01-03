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
  InputPhone,
  InputText,
  Select,
  SignUpStepIndicator,
  Warning,
} from '@components';
import { useDispatch } from 'react-redux';
import { addAdditionalData } from '@shared-state';
import { InputAddress, InputSelectPartnerType } from '@containers';

const Component: NextPage = () => {
  const { replace } = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const errMsgList: string[] = [];
    const data = getObjectFromForm(document.getElementsByTagName('form')[0]);
    console.log(data);

    if (!data.partnerType) errMsgList.push('기업 형태를 선택해 주세요.');
    if (!data.partnerName) errMsgList.push('기업명을 입력해 주세요.');
    if (!data.partnerAddress) errMsgList.push('사업장 주소를 입력해 주세요.');
    if (!data.partnerAddressDetails) errMsgList.push('사업장 상세주소를 입력해 주세요.');
    if (!data.partnerPhone) errMsgList.push('기업 전화번호를 입력해 주세요.');
    if (!data.partnerCategory) errMsgList.push('업종을 입력해 주세요.');
    if (!data.partnerSector) errMsgList.push('업태를 입력해 주세요.');

    if (errMsgList.length > 0) {
      alert(errMsgList.join('\n'));
      return;
    }

    dispatch(addAdditionalData(data));
    replace('/addInfo/2');
  }, []);
  return (
    <AuthenticationScreen>
      <Root>
        <GoBackButton href="/login" />
        <SignUpStepIndicator step={1} />
        <AddInfoNoticeText>사업자 정보를{'\n'}입력해 주세요.</AddInfoNoticeText>
        <Warning style={warningTextStyle}>입력하신 정보를 확인 후 다시 작성해주세요.</Warning>

        <Form onSubmit={handleSubmit}>
          <Row>
            <InputSelectPartnerType inputTitle="기업 형태" style="width: 180px;" />
            <InputText name="partnerName" inputTitle="기업명" style={rowItemStyle} />
          </Row>
          <InputAddress />
          <InputText name="partnerAddressDetails" subtext="상세주소를 입력해주세요." />
          <InputPhone name="partnerPhone" inputTitle="기업 전화번호" />
          <Row>
            <InputText name="partnerCategory" inputTitle="업종 카테고리" style={rowItemStyle} />
            <InputText name="partnerSector" inputTitle="업태" style={rowItemStyle} />
          </Row>

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
