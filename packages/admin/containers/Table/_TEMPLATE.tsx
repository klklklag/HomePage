import React from 'react';
import { useRouter } from 'next/router';
import { CustomTable, CustomTableStyleProp } from "@components";
import {
  getCommaStringCell,
  getTableHeaderText,
} from './base';

const columns = [
  {
    Header: getTableHeaderText('id'),
    accessor: 'id',
  },
  {
    Header: getTableHeaderText('partnerName'),
    accessor: 'partnerName',
  },
  {
    Header: getTableHeaderText('partnerType'),
    accessor: 'partnerType',
  },
  {
    Header: getTableHeaderText('partnerSignUpDate'),
    accessor: 'partnerSignUpDate',
  },
  {
    Header: getTableHeaderText('managerName'),
    accessor: 'managerName',
  },
  {
    Header: getTableHeaderText('managerPhone'),
    accessor: 'managerPhone',
  },
  {
    Header: getTableHeaderText('isPerformanceBondContract'),
    accessor: 'isPerformanceBondContract',
  },
  {
    Header: getTableHeaderText('performanceBondFee'),
    accessor: 'performanceBondFee',
    Cell: getCommaStringCell,
  },
  {
    Header: getTableHeaderText('firstTransferDepositDate'),
    accessor: 'firstTransferDepositDate',
  },
  {
    Header: getTableHeaderText('totalDeposit'),
    accessor: 'totalDeposit',
    Cell: getCommaStringCell,
  },
  {
    Header: getTableHeaderText('isTransferDeposit'),
    accessor: 'isTransferDeposit',
  },
  {
    Header: getTableHeaderText('isApproved'),
    accessor: 'isApproved',
  },
];

const style: CustomTableStyleProp = {
  headRow: ``,
  headCell: `
    &:first-child { width: 80px; }
    &:nth-child(2) { width: 160px; }
    &:nth-child(3) { width: 100px; }
    &:nth-child(4) { width: 100px; }

    &:nth-child(5) { width: 100px; }
    &:nth-child(6) { width: 160px; }
    &:nth-child(7) { width: 100px; }
    &:nth-child(8) { width: 160px; }

    &:nth-child(9) { width: 100px; }
    &:nth-child(10) { width: 160px; }
    &:nth-child(11) { width: 100px; }
    &:nth-child(12) { width: 100px; }
  `,
  bodyRow: ``,
  bodyCell: ``,
};

const _TermTable = () => {
  const router = useRouter();

  return (
    <CustomTable
      data={[]}
      columns={columns}
      style={style}
      pagination
      // onClickRow={onClickRow}
    />
  );
}

export const TermTable = _TermTable;