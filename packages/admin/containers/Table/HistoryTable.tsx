import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { CustomTable, CustomTableStyleProp, DownloadCSVButton, InputYear } from "@components";
import { getCurrentYear } from '@resources';
import { ThanksPayListItem } from '@api';
import { getCommaStringCell, getTableHeaderText, marginLeft20, marginLeftAuto, TableTitle, UpperTableArea } from './base';

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
    Header: getTableHeaderText('partnerState'),
    accessor: 'partnerState',
  },
  {
    Header: getTableHeaderText('salaryDay'),
    accessor: 'salaryDay',
  },
  {
    Header: getTableHeaderText('partnerClosingDay'),
    accessor: 'partnerClosingDay',
  },
  {
    Header: getTableHeaderText('workerCount'),
    accessor: 'workerCount',
  },
  {
    Header: getTableHeaderText('thanksPayCountByPartner'),
    accessor: 'thanksPayCountByPartner',
  },
  {
    Header: getTableHeaderText('partnerMonthlyThanksPay'),
    accessor: 'partnerMonthlyThanksPay',
    Cell: getCommaStringCell,
  },
  {
    Header: getTableHeaderText('partnerMonthlyServiceFee'),
    accessor: 'partnerMonthlyServiceFee',
    Cell: getCommaStringCell,
  },
  {
    Header: getTableHeaderText('partnerMonthlyPay'),
    accessor: 'partnerMonthlyPay',
    Cell: getCommaStringCell,
  },
  {
    Header: getTableHeaderText('monthlyDepositBalance'),
    accessor: 'monthlyDepositBalance',
    Cell: getCommaStringCell,
  },
];

const _HistoryTable = ({ data }: { data: ThanksPayListItem[]; }) => {
  const style: CustomTableStyleProp = useMemo(
    () => ({
      headRow: ``,
      headCell: `
        &:first-child { width: 80px; }
        &:nth-child(2) { width: 160px; }
        &:nth-child(3) { width: 100px; }
        &:nth-child(4) { width: 100px; }

        &:nth-child(5) { width: 100px; }
        &:nth-child(6) { width: 100px; }
        &:nth-child(7) { width: 100px; }
        &:nth-child(8) { width: 160px; }

        &:nth-child(9) { width: 160px; }
        &:nth-child(10) { width: 160px; }
        &:nth-child(11) { width: 200px; }
      `,
      bodyRow: ``,
      bodyCell: ``,
    }),
    []
  );

  const { query } = useRouter();

  return (
    <>
      <UpperTableArea>
        <TableTitle>탄력급여 내역 조회</TableTitle>
        <DownloadCSVButton
          style={marginLeftAuto}
          columns={columns}
          data={data}
          fileName={`${query.year || getCurrentYear()}년도 탄력급여 내역`}
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
}

export const HistoryTable = _HistoryTable;