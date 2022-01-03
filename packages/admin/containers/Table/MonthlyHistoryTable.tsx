import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Row } from 'react-table';
import { BodyHeader, CustomTable, CustomTableStyleProp, InputMonth, ScreenTitle } from "@components";
import { baseRoute_partner, COLORS, encrypt, SVGS } from '@resources';
import { SearchBar } from '@containers';
import { adminAPI, PartnerThanksPayListItem } from '@api';
import {
  marginLeftAuto,
  SummaryNameText,
  SummaryValueText,
  getTableHeaderText,
  TableSummaryArea,
  TableTitle,
  UpperTableArea,
  getCommaStringCell,
  useTableData
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
    Header: getTableHeaderText('partnerState'),
    accessor: 'partnerState',
  },
  {
    Header: getTableHeaderText('salaryDay'),
    accessor: 'salaryDay',
  },
  {
    Header: getTableHeaderText('partnerClosingDayAndReturningDay'),
    accessor: 'partnerClosingDayAndReturningDay',
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

const _MonthlyHistoryTable = ({ data }: { data: PartnerThanksPayListItem[]; }) => {
  const router = useRouter();

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
        &:nth-child(11) { width: 160px; }
      `,
      bodyRow: ``,
      bodyCell: ``,
    }),
    []
  );

  const routeToPartner = useCallback(({ original: { partnerLicenseId }}: Row<any>) => () => {
    const { push } = router;
    push({
      pathname: baseRoute_partner + '/invoice',
      query: { partnerId: encrypt(partnerLicenseId) },
    });
  }, [router]);

  return (
    <>
      <BodyHeader>
        <SVGS.NAV_BAR_ICON_MAGAZINE fill={COLORS.main} />
        <ScreenTitle customStyle="margin: 0px 0px 0px 10px;">이번달 현황 조회</ScreenTitle>
        <SearchBar style="margin: 0px 0px 0px auto" />
      </BodyHeader>
      <UpperTableArea>
        <TableTitle>탄력급여 내역</TableTitle>
        <InputMonth style={marginLeftAuto} />
      </UpperTableArea>
      <CustomTable
        data={data}
        columns={columns}
        style={style}
        pagination
        onClickRow={routeToPartner}
      />
    </>
  );
}

export const MonthlyHistoryTable = _MonthlyHistoryTable;