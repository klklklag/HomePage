import React, { useMemo } from 'react';
import styled from 'styled-components';
import { CustomTable, CustomTableStyleProp, FieldTitle } from "@components";

const _PartnerInfoChangeLogTable = () => {
  const data = useMemo(
    () => Array.from({ length: 17 }, (_, idx) => ({
      col1: (idx + 1),
      col2: '21/08/30',
      col3: '06:01:12',
      col4: '김아영',
      col5: '비밀번호 변경',
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
        Header: '변경 날짜',
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
        Header: '변경 내역',
        accessor: 'col5',
      },
    ],
    []
  );

  const style: CustomTableStyleProp = useMemo(
    () => ({
      wrapper: `
        margin: 10px 0px 0px;
        min-width: 100%;
      `,
      headRow: ``,
      headCell: ``,
      bodyRow: ``,
      bodyCell: `
        width: 120px;
        height: 40px;
        &:nth-child(5) { width: 470px; }
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

export const PartnerInfoChangeLogTable = _PartnerInfoChangeLogTable;