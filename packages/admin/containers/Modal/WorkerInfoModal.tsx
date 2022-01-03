import styled from 'styled-components';
import { FieldTitle, InputPhone, InputText, InputUnitNumber, Modal, PartnerInfoSubtext, PartnerInfoText, SaveChangeButton, Select } from '@components';
import { COLORS, getObjectFromForm, refreshPage } from '@resources';
import { WorkerInfoChangeLogTable } from '@containers';
import { InputSelectSalaryDay } from '@containers';
import { adminAPI, WorkerData, WorkerEmail, WorkerPartnerData } from '@api';
import { ModalInstanceProps } from './base';
import { InputSelectBank, InputSelectWorkType } from 'containers/Input';
import { useForm } from '@hooks';
import { useCallback } from 'react';

const formId = 'updateWorkerForm-admin';

const _WorkerInfoModal = ({
  data,
  ...props
}: {
  data: Partial<WorkerData & WorkerEmail & WorkerPartnerData>;
} & ModalInstanceProps) => {
  const { isSubmitting, handleSubmit } = useForm();
  const onSubmit = useCallback(async () => {
    const data = getObjectFromForm(document.getElementById(formId));

    const result = await adminAPI.updateWorkerData(data);
    if ('errors' in result) {
      alert(result.errors.errMsg);
      return;
    }

    refreshPage();
  }, []);
  return (
    <Modal {...props} type={undefined} title="유저 관리">
      <PartnerInfoText>근로자 정보</PartnerInfoText>
      <PartnerInfoSubtext>직원 정보를 입력하고 관리하세요.</PartnerInfoSubtext>
      <WorkerName>김땡쓰</WorkerName>

      <Form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <FieldWrapper>
          <Field>
            <FieldTitle>가입정보</FieldTitle>
            <InputText name="workerEmail" inputTitle="이메일 (아이디)" defaultValue={data.workerEmail} readOnly />
            <Row>
              <InputText name="bankAccountOwner" inputTitle="이름" style={rowItemStyle} defaultValue={data.bankAccountOwner} />
              <InputText name="workerBirth" inputTitle="생년월일" style={rowItemStyle} defaultValue={data.workerBirth} />
            </Row>
            <InputPhone name="workerPhone" inputTitle="전화번호" defaultValue={data.workerPhone} />
          </Field>

          <Field>
            <FieldTitle>계약정보</FieldTitle>
            <InputText name="partnerName" inputTitle="소속 기업명" defaultValue={data.partnerName} />
            <InputSelectWorkType name="workType" inputTitle="근무 형태" defaultValue={data.workType} />
          </Field>
        </FieldWrapper>

        <FieldWrapper>
          <Field>
            <FieldTitle>계좌정보</FieldTitle>
            <InputText name="bankAccountOwner" inputTitle="실명계좌" defaultValue={data.bankAccountOwner} />
            <Row>
              <InputSelectBank inputTitle="은행명" style={selectStyle} defaultValue={data.bankCode} />
              <InputUnitNumber name="bankAccount" inputTitle="계좌번호" style={rowItemStyle} unit="" defaultValue={data.bankAccount} />
            </Row>
          </Field>

          <Field>
            <FieldTitle>급여정보</FieldTitle>
            {/* <InputSelectSalaryDay name="partnerSalaryDay" inputTitle="급여일" defaultValue={data.partnerSalaryDay} /> */}
            <InputUnitNumber name="workerSalary" inputTitle="예상 월 급여" unit="원" defaultValue={data.workerSalary} />
          </Field>
        </FieldWrapper>

        <WorkerInfoChangeLogTable />
        <SaveChangeButton isSubmitting={isSubmitting} style="margin: 40px auto 0px;" />
      </Form>
    </Modal>
  )
};

const WorkerName = styled.div`
  margin: 40px 0px 0px;

  font-weight: 600;
  font-size: 21px;
  letter-spacing: -0.84px;
  color: ${COLORS.black};
`;

const Form = styled.form``;
const FieldWrapper = styled.div`
  margin: 40px 0px 0px;

  display: flex;
  gap: 90px;
`;
const Field = styled.div`
  width: 100%;
  
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

export const WorkerInfoModal = _WorkerInfoModal;