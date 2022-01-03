import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import styled from 'styled-components';
import { PartnerScreen, MenuBar } from '@layouts';
import { COLORS, decrypt } from '@resources';
import { workerAPI, WorkerData, WorkerEmail, WorkerPartnerData } from '@api';
import {
  HoldPaymentModal,
  InputSelectBank,
  InputSelectSalaryDay,
  InputSelectWorkType,
  PartnerHeader,
  WorkerHeader,
  WorkerInfoModal,
  WorkerMonthlyHistoryTable
} from '@containers';
import {
  BlockThanksPayButton,
  FieldTitle,
  InputPhone,
  InputText,
  InputUnitNumber,
  PartnerInfoSubtext,
  PartnerInfoText,
  RelicenseThanksPayButton,
  UpdateButton,
  useModal
} from '@components';

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const workerEmail = decrypt(String(query.workerId));
  const [workerResult, workerPartnerResult] = await Promise.all([
    workerAPI.readWorkerData({ workerEmail }),
    workerAPI.readWorkerPartnerData({ workerEmail }),
  ])

  if ('errors' in workerResult || 'errors' in workerPartnerResult) return { props: { data: {} }};
  return {
    props: {
      data: {
        ...workerResult,
        ...workerPartnerResult,
        workerEmail,
      }
    }
  };
};

const Component = ({ data }: { data: Partial<WorkerData & WorkerEmail & WorkerPartnerData>; }) => {
  const [visible, show, hide] = useModal();
  const [holdVisible, holdShow, holdHide] = useModal();
  return (
    <PartnerScreen>
      <Body>
        <WorkerHeader workerName={data?.bankAccountOwner} salaryDay={data?.partnerSalaryDay} blackState={data?._isBlackWorker} />

        <TitleRow>
          <PartnerInfoText customStyle="margin: 0px;">근로자 정보</PartnerInfoText>
          <UpdateButton onClick={show} />
          {
            data._isBlackWorker ?
              <RelicenseThanksPayButton style="margin: 0px 0px 0px auto;" onClick={() => {}} /> :
              <BlockThanksPayButton style="margin: 0px 0px 0px auto;" onClick={holdShow} />
          }
        </TitleRow>
        <PartnerInfoSubtext>직원 정보를 입력하고 관리하세요.</PartnerInfoSubtext>

        <Form>
          <Col>
            <Field>
              <FieldTitle>가입정보</FieldTitle>
              <InputText inputTitle="이메일 (아이디)" defaultValue={data?.workerEmail} disabled />
              <Row>
                <InputText inputTitle="이름" style={rowItemStyle} defaultValue={data?.bankAccountOwner} disabled />
                <InputText inputTitle="생년월일" style={rowItemStyle} defaultValue={data?.workerBirth} disabled />
              </Row>
              <InputPhone inputTitle="전화번호" defaultValue={data?.workerPhone} disabled />
            </Field>
            <Field>
              <FieldTitle>계좌정보</FieldTitle>
              <InputText inputTitle="실명계좌" defaultValue={data?.bankAccountOwner} disabled />
              <Row>
                <InputSelectBank inputTitle="은행명" style={selectStyle} defaultValue={data?.bankCode} disabled />
                <InputUnitNumber inputTitle="계좌번호" style={rowItemStyle} unit="" defaultValue={data?.bankAccount} disabled />
              </Row>
            </Field>
          </Col>
          <Col>
            <Field>
              <FieldTitle>계약정보</FieldTitle>
              <InputText inputTitle="소속 기업명" defaultValue={data?.partnerName} disabled />
              <InputSelectWorkType inputTitle="근무 형태" defaultValue={data?.workType} disabled />
            </Field>

            <Gap />

            <Field>
              <FieldTitle>급여정보</FieldTitle>
              {/* <InputSelectSalaryDay inputTitle="급여일" defaultValue={data?.partnerSalaryDay} disabled /> */}
              <InputUnitNumber inputTitle="예상 월 급여" unit="원" defaultValue={data?.workerSalary} disabled />
            </Field>
          </Col>
        </Form>

        <WorkerMonthlyHistoryTable />
      </Body>

      <WorkerInfoModal visible={visible} closeFunc={hide} data={data} />
      <HoldPaymentModal visible={holdVisible} closeFunc={holdHide} workerName={data?.bankAccountOwner} />
    </PartnerScreen>
  );
};

const Body = styled.div`
  width: 100%;
  padding: 0px 100px 40px;
  border-radius: 4px;
  background-color: ${COLORS.white};
`;

const Form = styled.form`
  margin: 40px 0px 0px;

  display: flex;
  gap: 260px;
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

const Gap = styled.div`
  height: 48px;
`;

const selectStyle = `width: 180px;`;
const rowItemStyle = `flex: 1`;

export default Component;