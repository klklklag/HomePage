import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Row } from 'react-table';
import { BodyHeader, CustomTable, CustomTableStyleProp, DownloadCSVButton, ScreenTitle } from "@components";
import { SearchBar } from '@containers';
import { baseRoute_partner, COLORS, encrypt, SVGS } from '@resources';
import { AffiliationListItem, PartnerLicenseId } from '@api';
import {
  getCommaStringCell,
  getTableHeaderText,
  marginLeftAuto,
  TableTitle,
  UpperTableArea,
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

const _AffiliationTable = ({ data }: { data: AffiliationListItem[] }) => {
  const router = useRouter();

  const onClickRow = useCallback(({ original: { partnerLicenseId }}: Row<PartnerLicenseId>) => () => {
    const { push } = router;
    push({
      pathname: baseRoute_partner + '/info',
      query: { partnerId: encrypt(partnerLicenseId) },
    })
  }, [router]);

  return (
    <>
      <BodyHeader>
        <SVGS.NAV_BAR_ICON_BOARD fill={COLORS.main} />
        <ScreenTitle customStyle="margin: 0px 0px 0px 10px;">제휴 관리</ScreenTitle>
        <SearchBar style="margin: 0px 0px 0px auto" />
      </BodyHeader>
      <UpperTableArea>
        <TableTitle>파트너사 제휴관리 현황</TableTitle>
        <DownloadCSVButton style={marginLeftAuto} columns={columns} data={data} fileName="파트너사 제휴관리 현황" />
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

export const AffiliationTable = _AffiliationTable;