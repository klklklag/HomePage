import { useCallback } from 'react';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from '@hooks';
import { AdminScreen, MenuBar, PartnerScreen } from '@layouts';
import { COLORS, decrypt, getObjectFromForm, refreshPage } from '@resources';
import { RootState } from '@shared-state';
import { adminAPI, partnerAPI, PartnerData } from '@api';
import {
  InputAddress,
  InputBRN,
  InputEmail,
  InputSelectBank,
  InputSelectPartnerType,
  InputSelectSalaryDay,
  PartnerHeader,
  PartnerInfoModal
} from '@containers';
import {
  FieldTitle,
  InputFile,
  InputPassword,
  InputPhone,
  InputText,
  InputUnitNumber,
  InputWithAPI,
  PartnerInfoSubtext,
  PartnerInfoText,
  SaveChangeButton,
  UpdateButton,
  useModal
} from '@components';

const formId = 'updatePartnerForm-partner';

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const result = await partnerAPI.readPartnerData({ partnerLicenseId: decrypt(String(query.partnerId)) });

  if ('errors' in result) return { props: { data: {} }};
  return { props: { data: result }};
};

const Component = ({ data }: { data: PartnerData; }) => {
  const router = useRouter();
  const { isSubmitting, handleSubmit } = useForm();
  const [visible, show, hide] = useModal();
  const onSubmit = useCallback(async () => {
    const { managerPw, managerPwRe, ...data } = getObjectFromForm(document.getElementById(formId));

    if (!!managerPw) {
      if (managerPw === managerPwRe) Object.assign(data, { managerPw });
      else {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
    }

    const result = await adminAPI.updatePartnerData(data);
    if ('errors' in result) {
      alert(result.errors.errMsg);
      return;
    }

    refreshPage();
  }, []);
  return (
    <PartnerScreen>
      <MenuBar />
      <Body>
        <PartnerHeader />
        <TitleRow>
          <PartnerInfoText customStyle="margin: 0px;">기업 정보</PartnerInfoText>
          <UpdateButton onClick={show} />
        </TitleRow>
        <PartnerInfoSubtext>회사 정보를 입력하고 관리하세요.</PartnerInfoSubtext>

        <form id={formId} onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="partnerLicenseId" value={decrypt(String(router.query.partnerId))} />
          <InputArea>
            <Col>
              <Field>
                <FieldTitle>계정 정보</FieldTitle>
                <InputEmail name="managerEmail" inputTitle="이메일 (아이디)" subtext="해당 이메일로 발송된 이메일을 확인 후 계속 진행해 주세요." defaultValue={data?.managerEmail} readOnly />
                <InputPassword name="managerPw" inputTitle="비밀번호" subtext="영문 대소문자/숫자/특수문자를 포함하여 8자 이상 입력해 주세요." />
                <InputPassword name="managerPwRe" inputTitle="비밀번호 확인" subtext="비밀번호를 다시 입력해 주세요" />
                <InputText name="managerName" inputTitle="담당자 이름" defaultValue={data?.managerName} />
                <InputPhone name="managerPhone" inputTitle="담당자 전화번호" defaultValue={data?.managerPhone} />
              </Field>
              <Field>
                <FieldTitle>탄력급여 설정</FieldTitle>
                <InputSelectSalaryDay inputTitle="급여일" defaultValue={data?.salaryDay} disabled />
                <InputUnitNumber inputTitle="현재 보증금 잔액" unit="원" defaultValue={data?.realtimeDeposit} disabled />
              </Field>
              <Field>
                <FieldTitle>관련 서류</FieldTitle>
                <InputFile inputTitle="사업자 등록증" subtext="" defaultValue={data?.partnerLicenseFile} disabled downloadable />
                <InputFile inputTitle="통장 사본" subtext="" defaultValue={data?.copyOfBankBookFile} disabled downloadable />
                <InputFile inputTitle="이행보증보험" subtext="" defaultValue={data?.performanceBondFile} disabled downloadable />
              </Field>
            </Col>
            <Col>
              <Field>
                <FieldTitle>사업자 정보</FieldTitle>
                <Row>
                  <InputSelectPartnerType inputTitle="기업 형태" style={selectStyle} defaultValue={data?.partnerType} disabled />
                  <InputText inputTitle="기업명" style={rowItemStyle} defaultValue={data?.partnerName} disabled />
                </Row>
                <InputText inputTitle="대표자명" defaultValue={data?.partnerCEO} disabled />
                <InputBRN inputTitle="사업자 등록 번호" defaultValue={data?.partnerLicenseId} disabled />
                <InputPhone inputTitle="기업 전화번호" defaultValue={data?.partnerPhone} disabled />
                <InputAddress defaultValue={data?.partnerAddress} disabled />
                <InputText subtext="상세주소를 입력해주세요." defaultValue={data?.partnerAddressDetails} disabled />
                <Row>
                  <InputText inputTitle="업종 카테고리" style={rowItemStyle} defaultValue={data?.partnerCategory} disabled />
                  <InputText inputTitle="업태" style={rowItemStyle} defaultValue={data?.partnerSector} disabled />
                </Row>
              </Field>
              <Field>
                <FieldTitle>사업자 계좌 정보</FieldTitle>
                <InputText name="bankAccountOwner" inputTitle="계좌 소유자" defaultValue={data?.bankAccountOwner} />
                <Row>
                  <InputSelectBank inputTitle="은행명" style={selectStyle} defaultValue={data?.bankCode} />
                  <InputText name="bankAccount" inputTitle="계좌번호" style={rowItemStyle} defaultValue={data?.bankAccount} />
                </Row>
              </Field>
            </Col>
          </InputArea>

          <SaveChangeButton isSubmitting={isSubmitting} />
        </form>

        <Withdrawal>
          땡쓰를 더이상 이용하지 않는다면
          <Atag href="#">회원탈퇴 바로가기</Atag>
        </Withdrawal>
      </Body>

      <PartnerInfoModal visible={visible} closeFunc={hide} data={data} />
    </PartnerScreen>
  );
};

const Body = styled.div`
  position: relative;

  width: 100%;
  padding: 0px 100px 40px;
  border-radius: 4px;
  background-color: ${COLORS.white};
`;

const InputArea = styled.div`
  margin: 40px 0px 0px;

  display: flex;
  gap: 250px;
`;

const Col = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  width: 100%;

  display: flex;
  gap: 20px;
`;

const TitleRow = styled(Row)`
  margin: 40px 0px 0px;
  align-items: center;
`;

const Withdrawal = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  gap: 10px;

  display: flex;
  align-items: center;

  font-weight: 300;
  font-size: 13px;
  letter-spacing: -0.39px;
  color: ${COLORS.gray};
`;

const Atag = styled.a`
  font-weight: 500;
  font-size: 13px;
  letter-spacing: -0.39px;
  color: ${COLORS.gray_dark};

  text-decoration: underline;
`;

const selectStyle = `width: 180px;`;
const rowItemStyle = `flex: 1`;

export default Component