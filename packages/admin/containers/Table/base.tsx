import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS, getCommaString } from '@resources';
import { BadResponseOr } from '@api';
import { ScreenTitle, CustomTableStyleProp } from '@components';
import { Row } from 'react-table';

type CustomStyle = { customStyle?: string; };

export const UpperTableArea = styled.div<CustomStyle>`
  width: 100%;
  height: 105px;

  display: flex;
  align-items: center;
`;

export const TableTitle = ScreenTitle;

export const Month = styled(TableTitle)`
  width: 60px;
  font-weight: 600;
  color: ${COLORS.main};
`;

export const TableSummaryArea = styled(UpperTableArea)`
  margin: 0px 0px 40px;
  height: auto;

  gap: 20px;

  ${({ customStyle }) => customStyle}
`;

export const SummaryNameText = styled.div<CustomStyle>`
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.6px;
  color: ${COLORS.black};

  ${({ customStyle }) => customStyle}
`;
export const SummaryValueText = styled(SummaryNameText)`
  width: 120px;

  ${({ customStyle }) => customStyle}
`;

export const marginLeft20 = `
  margin: 0px 0px 0px 20px;
`;

export const marginLeftAuto = `
  margin: 0px 0px 0px auto;
`;

const tableHeaderTexts = {
  id: 'No.',
  yearMonth: '기준월',
  monthlyThanksPayListAllPartner: '탄력급여 조회 객체',
  partnerName: '기업명',
  partnerState: '사용 가능',
  salaryDay: '급여일',
  partnerClosingDayAndReturningDay: '마감일/회수일',
  partnerMonthlyDebt: '미납 총액',
  partnerOverdueDay: '지연 일(연체 일)',
  workerCount: '사용 근로자',
  thanksPayCountByPartner: '사용 건 수',
  partnerMonthlyThanksPay: '선지급 급여',
  partnerMonthlyServiceFee: '수수료',
  partnerMonthlyPay: '선지급 총액',
  monthlyDepositBalance: '보증금 잔액',
  year: '연도',
  invoiceList: '인보이스 내역 조회 객체',
  checkSendEmail: '발송 확인',
  sendEmailDate: '발송일',
  managerName_invoice: '담당자',
  managerEmail: '발송 이메일',
  partnerLastMonthDebt: '전월 미납 총액',
  month: '월',
  partnerMonthlyReqThanksPay: '신청 총액 합계',
  invoiceListDetail: '인보이스 내역 상세 조회 객체',
  workerName: '이름',
  workerBirth: '생년월일',
  workerPhone: '연락처',
  thanksPayCountByWorker: '이용 건',
  workerThanksPayDateList: '지급 날짜',
  workerThanksPayList: '건별 선지급 급여',
  workerMonthlyThanksPay: '선지급 급여',
  workerMonthlyServiceFee: '수수료',
  workerMonthlyPay: '선지급 총액',
  bankName: '은행명',
  bankAccount: '가상 계좌 번호',
  bankOwner: '예금주',
  isCashReceipt: '현금 영수증 여부',
  workerMonthlyReqThanksPay: '신청 금액',
  workerThanksPayListForInvoiceDetail: '선지급 급여 건별 내역',
  workerThanksPayDate: '지급 날짜',
  workerThanksPay: '선지급 급여',
  workerServiceFee: '서비스 수수료',
  workerPay: '선 지급 총액',
  monthlyThanksPayList: '탄력급여 조회 객체',
  initDeposit: '계약 보증금',
  realtimeDeposit: '잔여 보증금',
  realtimeUsedDeposit: '사용된 보증금',
  realtimeDepositDebt: '미납 보증금',
  depositList: '보증금 현황 조회 리스트 객체',
  partnerIsReturning: '회수 확인',
  partnerIsAutoTransfer: '자동이체 확인',
  partnerVirtualAccountBankName: '가상 계좌 은행',
  partnerVirtualAccount: '가상 계좌 번호',
  partnerActualPay: '납부 금액',
  deposit: '정산 후 보증금',
  depositUtilization: '보증금 사용률 (%)',
  depositDebt: '미납 보증금',
  partnerServiceFeeDebt: '미납 수수료',
  autoTransferContract: '자동 이체 계약서',
  partnerReturningDay: '회수일',
  remainingDeposit: '잔여 보증금',
  partnerMonthlyThanksPayForMonth: '이달 선지급 급여',
  partnerMonthlyServiceFeeForMonth: '이달 수수료',
  lastMonthDepositDebt: '전월 미납 보증금',
  partnerLastMonthServiceFeeDebt: '전월 미납 수수료',
  workerListByPartner: '근로자 리스트 객체',
  workType: '근무형태',
  isEmployee: '사대보험 가입여부',
  workerBankName: '은행',
  workerBankAccount: '계좌 번호',
  workerIsAgreeMarketing: '마케팅 동의',
  isBlackWorker: '상태',
  workerEmail: '이메일',
  workersPartnerName: '소속 기업명',
  expectedSalary: '예상 월 급여',
  workerThanksPayListAll: '월별 사용 내역',
  usingDate: '사용 날짜',
  workerMonthlyServiceFeeForMonth: '이달 수수료',
  partnerListForApprove: '제휴 회사 리스트 객체',
  partnerType: '기업 형태',
  partnerSignUpDate: '가입일',
  managerName: '담당자 이름',
  managerPhone: '담당자 전화번호',
  initialDeposit: '계약 보증금',
  isContract: '계약서 작성',
  isTransferDeposit: '입금 확인',
  firstTransferDeposit: '입금된 보증금',
  isApproved: '제휴 상태',
  workerList: '근로자 리스트 객체',
  workerSignUpDate: '땡쓰 가입일',
  workerGender: '성별',
  workerMonthlyThanksPayForMonth: '이달 선지급 급여',
  allThanksPayCountByWorker: '누적 사용 횟수',
  workerTotalThanksPay: '총 누적 이용 금액',
  workerTotalServiceFee: '총 누적 수수료',

  isPerformanceBondContract: '이행 보증 계약',
  performanceBondFee: '이행 보증료',
  firstTransferDepositDate: '첫 입금일',
  totalDeposit: '입금된 보증금',

  monthlyDepositCount:	'납부 회차',
  addDeposit:	'추가 보증금',
  monthlyDeposit:	'보증금 총액',

  partnerClosingDay:	'마감일',
};

// export const tableWidthStyle = (width: number | string) =>
//   typeof width === 'number' ? `
//     min-width: ${width}px;
//     max-width: ${width}px;
//     width: ${width}px;
//   ` : `
//     min-width: ${width};
//     max-width: ${width};
//     width: ${width};
//   `;

type TableHeaderTextKeys = keyof typeof tableHeaderTexts;
export const getTableHeaderText = (key: TableHeaderTextKeys) => {
  const text = tableHeaderTexts[key];
  return (text ? text : '[헤더 에러]\n' + key);
};

export const addIdIndex = (list: object[]) => list.map((item, index) => ({ id: index + 1, ...item }));
export const getCommaStringCell = ({ value }: { value: string | number | null | undefined }) => <span>{getCommaString(value)}</span>;

export const useTableData = (api: () => Promise<BadResponseOr<any>>, key?: string) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState<{ [key: string]: any }>({});
  
  const getData = useCallback(async () => {
    setIsFetching(true);
    const result = await api();
    setIsFetching(false);
    if ('errors' in result) return;

    const shellKey = Object.keys(result)[0];
    const actualData = result[shellKey];
    setData(addIdIndex(key ? actualData[key] : actualData));
    if (key) setAdditionalInfo({ ...actualData, [key]: undefined });
  }, [setData, setAdditionalInfo]);

  useEffect(() => {
    getData();
  }, []);

  return {
    ...additionalInfo,
    data,
    isFetching,
  };
}

export const getActiveCell =
  (
    key: string,
    targetValue: any,
    conditionalFunc: (data: string, value: any) => boolean
      = (data: string, value: any) => data === value
  ) =>
    (formatFunc?: (originalValue: any) => string) =>
      ({ row: { original }, value }: { row: Row<any>; value: any }) => {
        const formattedValue = formatFunc ? formatFunc(value) : value;

        if (conditionalFunc(original[key], targetValue))
          return <ActiveItemCell>{formattedValue}</ActiveItemCell>;
        else return <span>{formattedValue}</span>;
      };

const ActiveItemCell = styled.span`
  color: ${COLORS.black};
`;

export const QnATableStylePreset: CustomTableStyleProp = {
  headRow: ``,
  headCell: `
    background-color: ${COLORS.white};

    font-weight: 500;
    font-size: 15px;
    color: ${COLORS.gray};
    letter-spacing: -0.45px;

    &:first-child { width: 100px; }
    &:nth-child(2) {
      width: 900px;
      padding: 0px 0px 0px 40px;
      text-align: left;
    }
    &:nth-child(3) { width: 160px; }
    &:nth-child(4) { width: 130px; }
    &:nth-child(5) { width: 130px; }
  `,
  bodyRow: `
    &:nth-child(odd) {
      background-color: ${COLORS.box};
    }

    &:hover {
      background-color: ${COLORS.table_row_hover};
    }
  `,
  bodyCell: `
    height: 80px;
    border: 0px solid;

    font-weight: 500;
    font-size: 15px;
    color: ${COLORS.gray};
    letter-spacing: -0.45px;

    &:nth-child(2) {
      padding: 0px 0px 0px 40px;
      text-align: left;
    }
  `,
};