import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Row } from 'react-table';
import { CustomTable, CustomTableStyleProp, DownloadCSVButton, InputYear } from "@components";
import { getCommaStringCell, getTableHeaderText, marginLeft20, marginLeftAuto, TableTitle, UpperTableArea } from './base';
import { getCurrentYear } from '@resources';
import { InvoiceListItem } from '@api';

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
    Header: getTableHeaderText('checkSendEmail'),
    accessor: 'checkSendEmail',
  },
  {
    Header: getTableHeaderText('sendEmailDate'),
    accessor: 'sendEmailDate',
  },
  {
    Header: getTableHeaderText('managerName_invoice'),
    accessor: 'managerName_invoice',
  },
  {
    Header: getTableHeaderText('managerEmail'),
    accessor: 'managerEmail',
  },
  {
    Header: getTableHeaderText('workerCount'),
    accessor: 'workerCount',
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
];

const _InvoiceTable = ({ data }: { data: InvoiceListItem[] }) => {
  const router = useRouter();

  const style: CustomTableStyleProp = useMemo(
    () => ({
      headRow: ``,
      headCell: `
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
      bodyRow: ``,
      bodyCell: ``,
    }),
    []
  );

  const onClickRow = useCallback(({ original: { yearMonth }}: Row<any>) => () => {
    const { pathname, push, query } = router;
    push({
      pathname: pathname + '/detail',
      query: {
        ...query,
        yearMonth,
      },
    });
  }, [router]);

  return (
    <>
      <UpperTableArea>
        <TableTitle>인보이스 내역</TableTitle>
        <DownloadCSVButton
          style={marginLeftAuto}
          columns={columns}
          data={data}
          fileName={`${router.query.year || getCurrentYear()}년도 인보이스 내역`}
        />
        <InputYear style={marginLeft20} />
      </UpperTableArea>
      <CustomTable
        // isFetching={isFetching}
        data={data}
        columns={columns}
        style={style}
        pagination
        onClickRow={onClickRow}
      />
    </>
  );
};

export const InvoiceTable = _InvoiceTable;