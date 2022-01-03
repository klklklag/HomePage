import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { CustomTable } from "@components";
import { baseRoute_admin } from '@resources';
import {
  getActiveCell,
  getTableHeaderText,
  QnATableStylePreset,
} from './base';
import { QnAListItem } from '@api';

const ActiveCell = getActiveCell('qnaReplyContent', null, (key, value) => key !== value);
const formatDate = (value: string) => value.split(' ')[0].replace(/-/g, '.');
const formatIsReplied = (value: string) => value !== null ? '답변완료' : '미답변';

const columns = [
  {
    Header: getTableHeaderText('id'),
    accessor: 'id',
    Cell: ActiveCell(),
  },
  {
    Header: '제목',
    accessor: 'qnaTitle',
    Cell: ActiveCell(),
  },
  {
    Header: '작성일',
    accessor: 'qnaDatetime',
    Cell: ActiveCell(formatDate),
  },
  {
    Header: '작성자',
    accessor: 'userEmail',
    Cell: ActiveCell(),
  },
  {
    Header: '답변유무',
    accessor: 'qnaReplyContent',
    Cell: ActiveCell(formatIsReplied),
  },
];

const _QnATable = ({ data }: { data: QnAListItem[] }) => {
  const router = useRouter();

  const onClickRow = useCallback(({ original: { qnaId }}) => () => {
    const { push } = router;
    push({
      pathname: baseRoute_admin + '/qna/[qnaId]',
      query: { qnaId },
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

export const QnATable = _QnATable;