import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTable, usePagination, useRowSelect, Row } from 'react-table';
import { COLORS } from '@resources';
import { InputCheckbox } from '@components';
import { PaginationIndicator } from './PaginationIndicator';

export type CustomTableStyleProp = {
  wrapper?: string;
  headRow?: string;
  headCell?: string;
  bodyRow?: string;
  bodyCell?: string;
  counter?: string;
};

const defaultTableStyle: CustomTableStyleProp = {
  wrapper: `
    min-width: 1420px;
  `,
  headRow: ``,
  headCell: `
    height: 40px;
    background-color: ${COLORS.box};

    font-weight: 300;
    font-size: 14px;
    letter-spacing: -0.5px;
    color: ${COLORS.black};

    &:first-child {
      border-radius: 4px 0px 0px 4px;
    }

    &:last-child {
      border-radius: 0px 4px 4px 0px;
    }
  `,
  bodyRow: `
    font-weight: 300;
    font-size: 14px;
    letter-spacing: -0.58px;
    color: ${COLORS.black_pale};
    text-align: center;

    &:first-child > td {
      border-top-width: 0px;
    }
    &:hover {
      background-color: ${COLORS.table_row_hover};
      > td {
        border-color: transparent;
      }
    }
  `,
  bodyCell: `
    height: 100px;

    border: solid ${COLORS.border};
    border-width: 1px;
  
    overflow: hidden;
    white-space: pre-wrap;
    text-overflow: ellipsis;
  `,
  counter: `
    font-size: 14px;
    letter-spacing: -0.5px;
    color: ${COLORS.black_pale};
  `,
};

// const IndeterminateCheckbox = React.forwardRef<HTMLInputElement>(
//   ({ indeterminate, ...rest }, ref) => {
//     const defaultRef = React.useRef<HTMLInputElement>(null);
//     const resolvedRef = ref || defaultRef;

//     React.useEffect(() => {
//       resolvedRef.current.indeterminate = indeterminate;
//     }, [resolvedRef, indeterminate])

//     return (
//       <InputCheckbox thisRef={resolvedRef} {...rest} />
//     )
//   }
// )

const _CustomTable = ({
  isFetching = false,
  columns,
  data = undefined,
  style,
  pagination = false,
  numOfRows = 20,
  showCounter = false,
  counterUnit = '명',
  rowSelection = false,
  selectedRowStyle,
  onClickRow = (row: Row<any>) => undefined,
}: {
  isFetching?: boolean;
  columns: any[];
  data: any[] | undefined;
  style?: CustomTableStyleProp;
  pagination?: boolean;
  numOfRows?: number;
  showCounter?: boolean;
  counterUnit?: string;
  rowSelection?: boolean;
  selectedRowStyle?: string;
  onClickRow?: (row: Row<any>) => ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}) => {
  const tableInstance = useTable(
    { columns, data: data || [], initialState: { pageSize: numOfRows } },
    usePagination,
    // useRowSelect,
    // hooks => {
    //   rowSelection ?
    //     hooks.visibleColumns.push(columns => [
    //       // Let's make a column for selection
    //       {
    //         id: 'selection',
    //         // The header can use the table's getToggleAllRowsSelectedProps method
    //         // to render a checkbox
    //         Header: ({ getToggleAllRowsSelectedProps }) => (
    //           <CheckboxWrapper>
    //             <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //           </CheckboxWrapper>
    //         ),
    //         // The cell can use the individual row's getToggleRowSelectedProps method
    //         // to the render a checkbox
    //         Cell: ({ row }) => (
    //           <CheckboxWrapper>
    //             <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //           </CheckboxWrapper>
    //         ),
    //       },
    //       ...columns,
    //     ]) :
    //     columns
    // }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,

    // selectedFlatRows,

    state: {
      pageIndex,
      // pageSize,
      // selectedRowIds,
    },
  } = tableInstance;

  const list = useMemo(() => pagination ? page : rows, [pagination, page, rows]);

  return (
    <Root customStyle={style?.wrapper} pagination={pagination}>
      <Table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(headerGroup => (
              <TableHeadRow {...headerGroup.getHeaderGroupProps()} customStyle={style?.headRow}>
                {headerGroup.headers.map(column => (
                  <TableHeadCell {...column.getHeaderProps()} customStyle={style?.headCell}>
                    {column.render('Header')}
                  </TableHeadCell>
                ))}
              </TableHeadRow>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            list.map((row: Row<object>) => {
              prepareRow(row);
              return (
                <TableBodyRow
                  {...row.getRowProps()}
                  customStyle={style?.bodyRow}
                  onClick={onClickRow(row)}
                  // selected={selectedRowIds[row.id]}
                  selectedRowStyle={selectedRowStyle}
                >
                  {
                    row.cells.map(cell => (
                      <TableBodyCell {...cell.getCellProps()} customStyle={style?.bodyCell}>
                        {cell.render('Cell')}
                      </TableBodyCell>
                    ))
                  }
                </TableBodyRow>
              )
            })
          }
        </tbody>

        {
          showCounter && (
            <Counter customStyle={style?.counter}>
              {pageIndex * page.length + 1} ~ {pageIndex * page.length + numOfRows} /{' '}
              <TotalRows>{rows.length}</TotalRows>{' '}
              {counterUnit}
            </Counter>
          )
        }
      </Table>

      {
        isFetching ? (
          <NoDataView>
            <Spinner />
          </NoDataView>
        ) : (
          list.length === 0 && <NoDataView>조회된 데이터가 없습니다.</NoDataView>
        )
      }

      {
        pagination &&
        <PaginationIndicator
          gotoPage={gotoPage}
          previousPage={previousPage}
          nextPage={nextPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageIndex={pageIndex}
          pageCount={pageCount}
        />
      }
    </Root>
  );
};

type CustomComponentStyle = {customStyle?: string;};

const Root = styled.div<CustomComponentStyle & {pagination: boolean;}>`
  ${defaultTableStyle.wrapper}
  ${({ customStyle }) => customStyle}
  ${({ pagination }) => !pagination &&
    `
      overflow-x: hidden;
      overflow-y: scroll;
    `
  }
`;
const Table = styled.table`
  position: relative;
  width: 100%;
  border-collapse: collapse;
`;
const TableHeadRow = styled.tr<CustomComponentStyle>`
  ${defaultTableStyle.headRow}
  ${({ customStyle }) => customStyle}
`;
const TableHeadCell = styled.th<CustomComponentStyle>`
  ${defaultTableStyle.headCell}
  ${({ customStyle }) => customStyle}
`;
const TableBodyRow = styled.tr<CustomComponentStyle & {selected?: boolean; selectedRowStyle?: string;}>`
  ${defaultTableStyle.bodyRow}
  ${({ customStyle }) => customStyle}
  ${({ selected, selectedRowStyle }) => selected && selectedRowStyle}

  cursor: ${({ onClick }) => onClick ? 'pointer' : 'default'};
`;
const TableBodyCell = styled.td<CustomComponentStyle>`
  ${defaultTableStyle.bodyCell}
  ${({ customStyle }) => customStyle}
`;

const CounterText = styled.span<CustomComponentStyle>`
  ${defaultTableStyle.counter}
`;
const Counter = styled(CounterText)`
  position: absolute;
  top: calc(100% + 10px);

  width: 100%;

  text-align: right;
  pointer-events: none;

  ${({ customStyle }) => customStyle}
`;
const TotalRows = styled(CounterText)`
  position: relative;
  font-weight: bold;
  color: ${COLORS.red};
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoDataView = styled.div`
  width: 100%;
  height: 200px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const spinAnimation = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  height: 70%;
  aspect-ratio: 1;
  border-radius: 100vw;
  border: 10px solid;
  border-color: transparent ${COLORS.main} ${COLORS.main} ${COLORS.main};
  animation: ${spinAnimation} 2s infinite linear;
`;

export const CustomTable = _CustomTable;