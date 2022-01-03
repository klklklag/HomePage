import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { CustomTable } from "@components";
import { baseRoute_admin, COLORS } from '@resources';
import {
  getActiveCell,
  getTableHeaderText,
  QnATableStylePreset,
} from './base';
import { TermListItem } from '@api';

const ActiveCell = getActiveCell('isUsed', 1);
const formatDate = (value: string) => value.split(' ')[0].replace(/-/g, '.');
const formatIsUsed = (value: number) => value ? '전시중' : '전시중지';
const formatEditor = () => '관리자';

const columns = [
  {
    Header: getTableHeaderText('id'),
    accessor: 'id',
    Cell: ActiveCell(),
  },
  {
    Header: '제목',
    accessor: 'termsName',
    Cell: ActiveCell(),
  },
  {
    Header: '작성일',
    accessor: 'registerDate',
    Cell: ActiveCell(formatDate),
  },
  {
    Header: '작성자',
    accessor: 'registerId',
    Cell: ActiveCell(),
  },
  {
    Header: '전시상태',
    accessor: 'isUsed',
    Cell: ActiveCell(formatIsUsed),
  },
];

const _TermTable = ({ data }: { data: TermListItem[] }) => {
  const router = useRouter();

  const onClickRow = useCallback(({ original: { termsCode }}) => () => {
    const { push } = router;
    push({
      pathname: baseRoute_admin + '/terms/[termId]',
      query: { termId: termsCode },
    })
  }, []);

  return (
    <CustomTable
      data={data}
      columns={columns}
      style={QnATableStylePreset}
      pagination
      onClickRow={onClickRow}
    />
  );
}

export const TermTable = _TermTable;