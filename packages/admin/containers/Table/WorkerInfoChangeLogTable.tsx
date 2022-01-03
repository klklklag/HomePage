import React, { useMemo } from 'react';
import styled from 'styled-components';
import { CustomTable, CustomTableStyleProp, FieldTitle } from "@components";

const _WorkerInfoChangeLogTable = () => {
  const data = useMemo(
    () => Array.from({ length: 17 }, (_, idx) => ({
      col1: (idx + 1),
      col2: '21/08/30',
      col3: '06:01:12',
      col4: '본인',
      col5: '전화번호 변경',
      col6: '010-1234-5678',
      col7: '010-8765-4321',
    })),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'No.',
        accessor: 'col1',
      },
      {
        Header: '수정일',
        accessor: 'col2',
      },
      {
        Header: '시간',
        accessor: 'col3',
      },
      {
        Header: '수정자',
        accessor: 'col4',
      },
      {
        Header: '변경 항목',
        accessor: 'col5',
      },
      {
        Header: '변경 전',
        accessor: 'col6',
      },
      {
        Header: '변경 후',
        accessor: 'col7',
      },
    ],
    []
  );

  const style: CustomTableStyleProp = useMemo(
    () => ({
      wrapper: `
        margin: 20px 0px 0px;
        min-width: 100%;
      `,
      headRow: ``,
      headCell: ``,
      bodyRow: ``,
      bodyCell: `
        width: 100px;
        height: 40px;
        &:nth-child(5) { width: 190px; }
        &:nth-child(6) { width: 180px; }
        &:nth-child(7) { width: 180px; }
      `,
    }),
    []
  );

  return (
    <>
      <Row>
        <FieldTitle>정보 수정 내역</FieldTitle>
      </Row>
      <CustomTable
        data={data}
        columns={columns}
        style={style}
        pagination
        numOfRows={5}
      />
    </>
  );
}

const Row = styled.div`
  margin: 40px 0px 0px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WorkerInfoChangeLogTable = _WorkerInfoChangeLogTable;