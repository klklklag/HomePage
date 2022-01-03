import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { BodyHeader, CustomTable, CustomTableStyleProp, DownloadCSVButton, ScreenTitle } from "@components";
import { COLORS, encrypt, SVGS } from '@resources';
import { SearchBar } from '@containers';
import { getTableHeaderText, marginLeftAuto, TableTitle, UpperTableArea } from './base';
import { WorkerThanksPayListItem } from '@api';
import { Row } from 'react-table';

const columns = [
  {
    Header: getTableHeaderText('id'),
    accessor: 'id',
  },
  {
    Header: getTableHeaderText('workerSignUpDate'),
    accessor: 'workerSignUpDate',
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
    Header: getTableHeaderText('workerGender'),
    accessor: 'workerGender',
  },
  {
    Header: getTableHeaderText('workerIsAgreeMarketing'),
    accessor: 'workerIsAgreeMarketing',
  },
  {
    Header: getTableHeaderText('workerMonthlyThanksPayForMonth'),
    accessor: 'workerMonthlyThanksPayForMonth',
  },
  {
    Header: getTableHeaderText('workerMonthlyServiceFeeForMonth'),
    accessor: 'workerMonthlyServiceFeeForMonth',
  },
  {
    Header: getTableHeaderText('allThanksPayCountByWorker'),
    accessor: 'allThanksPayCountByWorker',
  },
  {
    Header: getTableHeaderText('workerTotalThanksPay'),
    accessor: 'workerTotalThanksPay',
  },
  {
    Header: getTableHeaderText('workerTotalServiceFee'),
    accessor: 'workerTotalServiceFee',
  },
  {
    Header: getTableHeaderText('expectedSalary'),
    accessor: 'expectedSalary',
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

const _UserTable = ({ data }: { data: WorkerThanksPayListItem[]; }) => {
  const style: CustomTableStyleProp = useMemo(
    () => ({
      headRow: ``,
      headCell: `
        &:first-child { width: 80px; }
        &:nth-child(2) { width: 100px; }
        &:nth-child(3) { width: 80px; }
        &:nth-child(4) { width: 80px; }

        &:nth-child(5) { width: 60px; }
        &:nth-child(6) { width: 80px; }
        &:nth-child(7) { width: 140px; }
        &:nth-child(8) { width: 100px; }

        &:nth-child(9) { width: 100px; }
        &:nth-child(10) { width: 140px; }
        &:nth-child(11) { width: 140px; }
        &:nth-child(12) { width: 100px; }

        &:nth-child(13) { width: 120px; }
        &:nth-child(14) { width: 100px; }
      `,
      bodyRow: ``,
      bodyCell: ``,
    }),
    []
  );

  const router = useRouter();
  const onClickRow = useCallback(({ original: { workerEmail }}: Row<any>) => () => {
    const { push, query } = router;
    push({
      pathname: '/admin/users/[workerId]',
      query: {
        ...query,
        workerId: encrypt(String(workerEmail)),
      }
    });
  }, [router, data]);

  return (
    <>
      <BodyHeader>
        <SVGS.NAV_BAR_ICON_WORKER fill={COLORS.main} />
        <ScreenTitle customStyle="margin: 0px 0px 0px 10px;">유저 관리</ScreenTitle>
        <SearchBar style="margin: 0px 0px 0px auto" />
      </BodyHeader>
      <UpperTableArea>
        <TableTitle>유저 리스트</TableTitle>
        <DownloadCSVButton style={marginLeftAuto} columns={columns} data={data} fileName="유저 리스트" />
      </UpperTableArea>
      <CustomTable
        data={data}
        columns={columns}
        style={style}
        pagination
        onClickRow={onClickRow}
      />
    </>
  );
}

export const UserTable = _UserTable;