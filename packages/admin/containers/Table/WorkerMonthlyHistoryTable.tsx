import React, { useMemo } from 'react';
import styled from 'styled-components';
import { CustomTable, CustomTableStyleProp } from "@components";
import { getCommaStringCell, getTableHeaderText, TableTitle } from './base';
import { WorkerLogListItem } from '@api';

const columns = [
  {
    Header: getTableHeaderText('id'),
    accessor: 'id',
  },
  {
    Header: getTableHeaderText('usingDate'),
    accessor: 'usingDate',
  },
  {
    Header: getTableHeaderText('workerBankName'),
    accessor: 'workerBankName',
  },
  {
    Header: getTableHeaderText('workerBankAccount'),
    accessor: 'workerBankAccount',
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
    Header: getTableHeaderText('workerMonthlyServiceFeeForMonth'),
    accessor: 'workerMonthlyServiceFeeForMonth',
    Cell: getCommaStringCell,
  },
  {
    Header: getTableHeaderText('workersPartnerName'),
    accessor: 'workersPartnerName',
  },
  {
    Header: getTableHeaderText('isBlackWorker'),
    accessor: 'isBlackWorker',
  },
];

const style: CustomTableStyleProp = {
  wrapper: `
    margin: 40px 0px 0px;
    min-width: 1300px;
  `,
  headRow: ``,
  headCell: ``,
  bodyRow: ``,
  bodyCell: `
    &:first-child { width: 80px; }
    &:nth-child(2) { width: 100px; }
    &:nth-child(3) { width: 140px; }
    &:nth-child(4) { width: 160px; }

    &:nth-child(5) { width: 100px; }
    &:nth-child(6) { width: 140px; }
    &:nth-child(7) { width: 160px; }
    &:nth-child(8) { width: 160px; }

    &:nth-child(9) { width: 160px; }
    &:nth-child(10) { width: 100px; }
  `,
}

const _WorkerMonthlyHistoryTable = ({ data = [] }: { data?: WorkerLogListItem[]; }) => {
  return (
    <Root>
      <TableTitle>월별 사용 내역</TableTitle>
      <CustomTable
        data={data}
        columns={columns}
        style={style}
        pagination
        numOfRows={5}
      />
    </Root>
  );
}

const Root = styled.div`
  margin: 100px 0px 0px;
`;

export const WorkerMonthlyHistoryTable = _WorkerMonthlyHistoryTable;