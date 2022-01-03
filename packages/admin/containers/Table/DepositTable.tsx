import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { CustomTable, CustomTableStyleProp, DownloadCSVButton, InputYear, useModal } from "@components";
import { COLORS, getCommaString, getCurrentYear } from '@resources';
import {
  getCommaStringCell,
  getTableHeaderText,
  marginLeft20,
  marginLeftAuto,
  SummaryNameText,
  SummaryValueText,
  TableSummaryArea,
  TableTitle,
  UpperTableArea,
} from './base';

const columns = [
  {
    Header: getTableHeaderText('id'),
    accessor: 'id',
  },
  {
    Header: getTableHeaderText('yearMonth'),
    accessor: 'yearMonth',
  },
  {
    Header: getTableHeaderText('monthlyDepositCount'),
    accessor: 'monthlyDepositCount',
  },
  {
    Header: getTableHeaderText('partnerIsAutoTransfer'),
    accessor: 'partnerIsAutoTransfer',
  },
  // {
  //   Header: getTableHeaderText('partnerVirtualAccountBankName'),
  //   accessor: 'partnerVirtualAccountBankName',
  // },
  // {
  //   Header: getTableHeaderText('partnerVirtualAccount'),
  //   accessor: 'partnerVirtualAccount',
  // },
  {
    Header: getTableHeaderText('depositUtilization'),
    accessor: 'depositUtilization',
  },
  {
    // Header: getTableHeaderText('partnerMonthlyPay'),
    Header: '사용된 보증금 (원)',
    accessor: 'partnerMonthlyPay',
    Cell: getCommaStringCell,
  },
  {
    Header: getTableHeaderText('addDeposit'),
    accessor: 'addDeposit',
    Cell: getCommaStringCell,
  },
  // {
  //   Header: '전월 ' + getTableHeaderText('monthlyDepositBalance'),
  //   accessor: 'monthlyDepositBalance',
  //   Cell: getCommaStringCell,
  // },
  // {
  //   Header: getTableHeaderText('monthlyDeposit'),
  //   accessor: 'monthlyDeposit',
  //   Cell: getCommaStringCell,
  // },
];

const _DepositTable = ({
  data = [],
  realtimeDeposit,
  realtimeUsedDeposit,
  totalRealtimeUsedDeposit,
} : {
  data: object[];
  realtimeDeposit: any;
  realtimeUsedDeposit: any;
  totalRealtimeUsedDeposit: any;
}) => {
  const router = useRouter();

  const style: CustomTableStyleProp = useMemo(
    () => ({
      headRow: ``,
      headCell: `
        &:first-child { width: 80px; }
        &:nth-child(2) { width: 160px; }
        &:nth-child(3) { width: 100px; }
        &:nth-child(4) { width: 160px; }

        &:nth-child(5) { width: 160px; }
        &:nth-child(6) { width: 380px; }
        &:nth-child(7) { width: 380px; }
      `,
      bodyRow: ``,
      bodyCell: ``,
    }),
    []
  );

  return (
    <>
      <UpperTableArea>
        <TableTitle>보증금 현황</TableTitle>
      </UpperTableArea>
      <TableSummaryArea customStyle={noMargin}>
        <SummaryNameText>사용 가능 보증금:</SummaryNameText>
        <SummaryValueText customStyle={mintText}>{getCommaString(realtimeDeposit)}</SummaryValueText>
        <SummaryNameText>이달 사용된 보증금:</SummaryNameText>
        <SummaryValueText>{getCommaString(realtimeUsedDeposit)}</SummaryValueText>
        <SummaryNameText>이달 입금된 보증금:</SummaryNameText>
        <SummaryValueText>{getCommaString(totalRealtimeUsedDeposit)}</SummaryValueText>
      </TableSummaryArea>
      <UpperTableArea>
        <TableTitle>보증금 내역</TableTitle>
        <DownloadCSVButton
          style={marginLeftAuto}
          columns={columns}
          data={data}
          fileName={`${router.query.year || getCurrentYear()}년도 보증금 내역`}
        />
        <InputYear style={marginLeft20} />
      </UpperTableArea>
      <CustomTable
        data={data}
        columns={columns}
        style={style}
        pagination
      />
    </>
  );
};

const mintText = `color: ${COLORS.main}`;
const redText = `color: ${COLORS.red_dark}`;
const noMargin = `margin: 0px;`;

export const DepositTable = _DepositTable;