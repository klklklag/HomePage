import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Row } from 'react-table';
import { CustomTable, CustomTableStyleProp, DownloadCSVButton, InputMonth, useModal } from "@components";
import { COLORS, getCommaString, getCurrentYearMonth } from '@resources';
import { InvoiceModal } from '@containers';
import {
  getCommaStringCell,
  getTableHeaderText,
  marginLeft20,
  Month,
  SummaryNameText,
  SummaryValueText,
  TableSummaryArea,
  TableTitle,
  UpperTableArea,
} from './base';
import { InvoiceDetailListItem } from '@api';

const columns = [
  {
    Header: getTableHeaderText('id'),
    accessor: 'id',
  },
  {
    Header: getTableHeaderText('workerName'),
    accessor: 'workerName',
  },
  {
    Header: getTableHeaderText('workerBirth'),
    accessor: 'workerBirth',
  },
  {
    Header: getTableHeaderText('workerPhone'),
    accessor: 'workerPhone',
  },
  {
    Header: getTableHeaderText('thanksPayCountByWorker'),
    accessor: 'thanksPayCountByWorker',
  },
  {
    Header: getTableHeaderText('workerThanksPayDateList'),
    accessor: 'workerThanksPayDateList',
    Cell: ({ value }: { value: string[]; }) => value.join('\n'),
  },
  {
    Header: getTableHeaderText('workerThanksPayList'),
    accessor: 'workerThanksPayList',
    Cell: ({ value }: { value: string[]; }) => getCommaStringCell({ value: value.join('\n') }),
  },
  {
    Header: getTableHeaderText('workerMonthlyThanksPay'),
    accessor: 'workerMonthlyThanksPay',
    Cell: getCommaStringCell,
  },
  {
    Header: getTableHeaderText('workerMonthlyServiceFee'),
    accessor: 'workerMonthlyServiceFee',
    Cell: getCommaStringCell,
  },
  {
    Header: getTableHeaderText('workerMonthlyPay'),
    accessor: 'workerMonthlyPay',
    Cell: getCommaStringCell,
  },
];

const style: CustomTableStyleProp = {
  headRow: ``,
  headCell: ``,
  bodyRow: ``,
  bodyCell: `
    &:first-child { width: 80px; }
    &:nth-child(2) { width: 160px; }
    &:nth-child(3) { width: 100px; }
    &:nth-child(4) { width: 160px; }
    &:nth-child(5) { width: 100px; }
    &:nth-child(6) { width: 140px; }
    &:nth-child(7) { width: 160px; }
    &:nth-child(8) { width: 160px; }
    &:nth-child(9) { width: 160px; }
    &:nth-child(10) { width: 200px; }
  `,
};

const _InvoiceDetailTable = ({
  data,
  checkSendEmail,
  partnerMonthlyReqThanksPay,
  partnerMonthlyServiceFee,
  partnerMonthlyThanksPay,
}: {
  data: InvoiceDetailListItem[];
  checkSendEmail: string;
  partnerMonthlyReqThanksPay: number;
  partnerMonthlyServiceFee: number;
  partnerMonthlyThanksPay: number;
}) => {
  const router = useRouter();
  const [visible, show, hide] = useModal();
  const [modalData, setModalData] = useState<any>();
  
  const defaultYearMonth = useMemo(() => {
    const [yearString, monthString] = String(router.query.yearMonth).split('.');
    return {
      year: parseInt(yearString),
      month: parseInt(monthString),
    };
  }, [router.query.yearMonth]);

  const backToList = useCallback(() => {
    const { pathname, push, query: originalQuery } = router;
    const { yearMonth, ...query } = originalQuery;
    push({
      pathname: pathname.replace(/\/detail/, ''),
      query
    });
  }, [router]);

  const onClickRow = useCallback(({ original }: Row<object>) => () => {
    setModalData(original);
    console.log(original);
    show();
  }, [setModalData, show]);

  return (
    <>
      <UpperTableArea>
        <Month>{defaultYearMonth.month.toString(10).padStart(2, '0')} 월</Month>
        <TableTitle>인보이스 월별 상세</TableTitle>
        <ResendInvoiceButton type="button">인보이스 재발송</ResendInvoiceButton>
        <DownloadCSVButton
          style="margin: 0px 0px 0px 10px;"
          columns={columns}
          data={data}
          fileName={`${router.query.yearMonth || getCurrentYearMonth()} 인보이스 상세 내역`}
        />
        <InputMonth style={marginLeft20} defaultValue={defaultYearMonth} />
      </UpperTableArea>
      <TableSummaryArea>
        <SummaryNameText>신청 총액 합계:</SummaryNameText>
        <SummaryValueText>{getCommaString(partnerMonthlyReqThanksPay)}</SummaryValueText>
        <SummaryNameText>수수료 합계:</SummaryNameText>
        <SummaryValueText>{getCommaString(partnerMonthlyServiceFee)}</SummaryValueText>
        <SummaryNameText>지급 요청액 합계:</SummaryNameText>
        <SummaryValueText>{getCommaString(partnerMonthlyThanksPay)}</SummaryValueText>
        <SummaryNameText>발송 확인:</SummaryNameText>
        <SummaryValueText>{checkSendEmail}</SummaryValueText>
    
        <BackToListButton onClick={backToList}>인보이스 내역 전체 보기</BackToListButton>
      </TableSummaryArea>
      <CustomTable
        data={data}
        columns={columns}
        style={style}
        pagination
        onClickRow={onClickRow}
      />
      
      <InvoiceModal visible={visible} closeFunc={hide} data={modalData} />
    </>
  );
};

const ResendInvoiceButton = styled.button`
  margin: 0px 0px 0px auto;
  width: 140px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${COLORS.main};
  background-color: ${COLORS.white};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};

  &:hover { opacity: 0.8; }
  &:active { opacity: 0.5; }
`;

const BackToListButton = styled.div`
  margin: 0px 0px 0px auto;
  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
  text-decoration: underline;

  cursor: pointer;

  &:hover { opacity: 0.8; }
  &:active { opacity: 0.5; }
`;

export const InvoiceDetailTable = _InvoiceDetailTable;