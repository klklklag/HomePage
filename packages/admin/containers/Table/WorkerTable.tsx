import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Row } from 'react-table';
import { encrypt } from '@resources';
import { CustomTable, CustomTableStyleProp, DownloadCSVButton } from "@components";
import { getTableHeaderText, marginLeftAuto, TableTitle, UpperTableArea } from './base';
import { WorkerSummaryListItem } from '@api';

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
    Header: getTableHeaderText('workType'),
    accessor: 'workType',
  },
  {
    Header: getTableHeaderText('isEmployee'),
    accessor: 'isEmployee',
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
    Header: getTableHeaderText('workerIsAgreeMarketing'),
    accessor: 'workerIsAgreeMarketing',
  },
  {
    Header: getTableHeaderText('isBlackWorker'),
    accessor: 'isBlackWorker',
  },
];

const _WorkerTable = ({ data }: { data: WorkerSummaryListItem[]; }) => {
  const router = useRouter();

  const GoToWorkerDetail = useCallback((row: Row<any>) => () => {
    const { pathname, push, query } = router;
    push({
      pathname: pathname + '/[workerId]',
      query: {
        ...query,
        workerId: encrypt(row.original.workerEmail),
      },
    });
  }, [router]);

  const style: CustomTableStyleProp = useMemo(
    () => ({
      headRow: ``,
      headCell: `
        &:first-child { width: 80px; }
        &:nth-child(2) { width: 180px; }
        &:nth-child(3) { width: 160px; }
        &:nth-child(4) { width: 160px; }

        &:nth-child(5) { width: 160px; }
        &:nth-child(6) { width: 160px; }
        &:nth-child(7) { width: 100px; }
        &:nth-child(8) { width: 180px; }

        &:nth-child(9) { width: 100px; }
        &:nth-child(10) { width: 140px; }
      `,
      bodyRow: ``,
      bodyCell: ``,
    }),
    []
  );

  return (
    <>
      <UpperTableArea>
        <TableTitle>근로자 관리</TableTitle>
        <DownloadCSVButton
          style={marginLeftAuto}
          columns={columns}
          data={data}
          fileName="근로자 목록"
        />
      </UpperTableArea>
      <CustomTable
        data={data}
        columns={columns}
        style={style}
        pagination
        onClickRow={GoToWorkerDetail}
      />
    </>
  );
};

export const WorkerTable = _WorkerTable;