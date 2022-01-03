import { BaseSyntheticEvent, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { adminAPI, AdminAPI_UpdatePartnerData_Params, PartnerData } from '@api';
import { useForm } from '@hooks';
import { decrypt, getObjectFromForm, refreshPage } from '@resources';
import { PartnerInfoChangeLogTable, InputBRN, InputAddress, InputSelectBank, InputSelectPartnerType, InputSelectSalaryDay } from '@containers';
import { Divider, FieldTitle, InputFile, InputPassword, InputPhone, InputText, InputUnitNumber, Modal, PartnerInfoSubtext, PartnerInfoText, SaveChangeButton, Select } from '@components';
import { ModalInstanceProps } from './base';

const formId = 'updatePartnerForm-admin';

const _PartnerInfoModal = ({ data, ...props }: { data: PartnerData } & ModalInstanceProps) => {
  const router = useRouter();
  const {isSubmitting, handleSubmit} = useForm();
  const onSubmit = useCallback(async () => {
    const { managerPw, managerPwRe, ...data } = getObjectFromForm(document.getElementById(formId));

    if (!!managerPw) {
      if (managerPw === managerPwRe) Object.assign(data, { managerPw });
      else {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
    }

    const result = await adminAPI.updatePartnerData(data as AdminAPI_UpdatePartnerData_Params);
    if ('errors' in result) {
      alert(result.errors.errMsg);
      return;
    }

    refreshPage();
  }, []);
  return (
    <Modal {...props} type={undefined} title="기업 관리">
      <PartnerInfoText>기업 정보</PartnerInfoText>
      <PartnerInfoSubtext>회사 정보를 입력하고 관리하세요.</PartnerInfoSubtext>

      <Form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="partnerLicenseId" value={decrypt(String(router.query.partnerId))} />
        <ColWrapper>
          <Col>
            <FieldTitle>계정 정보</FieldTitle>
            <InputText name="managerEmail" inputTitle="이메일 (아이디)" defaultValue={data?.managerEmail} />
            <InputPassword name="managerPw" inputTitle="비밀번호" subtext="영문 대소문자/숫자/특수문자를 포함하여 8자 이상 입력해 주세요." />
            <InputPassword name="managerPwRe" inputTitle="비밀번호 확인" subtext="비밀번호를 다시 입력해 주세요" />
            <InputText name="managerName" inputTitle="담당자 이름" defaultValue={data?.managerName} />
            <InputPhone name="managerPhone" inputTitle="담당자 전화번호" defaultValue={data?.managerPhone} />

            <Divider customStyle="margin: 20px 0px 0px; height: 0px;" />

            <FieldTitle>탄력급여 설정</FieldTitle>
            <InputSelectSalaryDay name="salaryDay" inputTitle="급여일" defaultValue={data?.salaryDay} />
            <InputUnitNumber inputTitle="현재 보증금 잔액" unit="원" defaultValue={data?.realtimeDeposit} />
          </Col>

          <Col>
            <FieldTitle>사업자 정보</FieldTitle>
            <Row>
              <InputSelectPartnerType name="partnerType" inputTitle="기업 형태" style={selectStyle} defaultValue={data?.partnerType} />
              <InputText name="partnerName" inputTitle="기업명" style={rowItemStyle} defaultValue={data?.partnerName} />
            </Row>
            <InputText name="partnerCEO" inputTitle="대표자명" defaultValue={data?.partnerCEO} />
            <InputBRN name="partnerLicenseId" inputTitle="사업자 등록 번호" defaultValue={data?.partnerLicenseId} disabled />
            <InputPhone name="partnerPhone" inputTitle="기업 전화번호" defaultValue={data?.partnerPhone} />
            <InputAddress name="partnerAddress" defaultValue={data?.partnerAddress} />
            <InputText name="partnerAddressDetails" subtext="상세주소를 입력해주세요." defaultValue={data?.partnerAddressDetails} />
            <Row>
              <InputText name="partnerCategory" inputTitle="업종 카테고리" style={rowItemStyle} defaultValue={data?.partnerCategory} />
              <InputText name="partnerSector" inputTitle="업태" style={rowItemStyle} defaultValue={data?.partnerSector} />
            </Row>
          </Col>
        </ColWrapper>

        <ColWrapper>
          <Col>
            <FieldTitle>관련 서류</FieldTitle>
            <InputFile name="partnerLicenseFile" inputTitle="사업자 등록증" subtext="" defaultValue={data?.partnerLicenseFile} downloadable />
            <InputFile name="copyOfBankBookFile" inputTitle="통장 사본" subtext="" defaultValue={data?.copyOfBankBookFile} downloadable />
            <InputFile name="performanceBondFile" inputTitle="이행보증보험" subtext="" defaultValue={data?.performanceBondFile} downloadable />
          </Col>
          <Col>
            <FieldTitle>사업자 계좌 정보</FieldTitle>
            <InputText name="bankAccountOwner" inputTitle="계좌 소유자" defaultValue={data?.bankAccountOwner} />
            <Row>
              <InputSelectBank name="bankCode" inputTitle="은행명" style={selectStyle} defaultValue={data?.bankCode} />
              <InputText name="bankAccount" inputTitle="계좌번호" style={rowItemStyle} defaultValue={data?.bankAccount} />
            </Row>
          </Col>
        </ColWrapper>

        <PartnerInfoChangeLogTable />

        <SaveChangeButton isSubmitting={isSubmitting} style="margin: 40px auto 0px;" />
      </Form>
    </Modal>
  )
};

const Form = styled.form``;
const ColWrapper = styled.div`
  margin: 40px 0px 0px;
  display: flex;
  gap: 90px;
`;
const Col = styled.div`
  width: 430px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Row = styled.div`
  display: flex;
  gap: 20px;
`;

const selectStyle = `width: 180px;`;
const rowItemStyle = `flex: 1`;

export const PartnerInfoModal = _PartnerInfoModal;