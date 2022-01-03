import { COLORS, SVGS } from '@resources';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

export const PaginationIndicator = ({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageCount,
}: {
  gotoPage: (index: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageCount: number;
}) => {
  const numOfSet = useMemo(() => 10, []);
  const anchor = useMemo(() => pageIndex - pageIndex % numOfSet, [pageIndex, numOfSet]);
  const maxAnchor = useMemo(() => (pageCount - 1) - (pageCount - 1) % numOfSet, [pageCount, numOfSet]);

  const isLeftArrowActive = useMemo(() => anchor > 0, [anchor]);
  const isRightArrowActive = useMemo(() => anchor < maxAnchor, [anchor, maxAnchor]);
  
  const noopFunc = useCallback(() => {}, []);
  const onClickGoToFirstButton = useCallback(() => gotoPage(0), [gotoPage]);
  const onClickGoToLastButton = useCallback(() => gotoPage(pageCount - 1), [gotoPage, pageCount]);
  const onClickGoToPreviousSetButton = useCallback(() => gotoPage(anchor - numOfSet), [gotoPage, anchor, numOfSet]);
  const onClickGoToNextSetButton = useCallback(() => gotoPage(anchor + numOfSet), [gotoPage, anchor, numOfSet]);
  return (
    <Root>
      <Wrapper>
        <ArrowButton isActive={isLeftArrowActive} onClick={isLeftArrowActive ? onClickGoToFirstButton : noopFunc}><SVGS.PAGINATION_ICON_GO_FIRST /></ArrowButton>
        <ArrowButton isActive={isLeftArrowActive} onClick={isLeftArrowActive ? onClickGoToPreviousSetButton : noopFunc}><SVGS.PAGINATION_ICON_GO_PREV /></ArrowButton>
        {
          Array.from({ length: numOfSet }, (_, idx) => {
            const targetPageIndex = anchor + idx;
            const isOver = targetPageIndex >= pageCount;

            return (!isOver && <NumberButton key={String(idx)} isCurrentPage={targetPageIndex === pageIndex} onClick={() => gotoPage(targetPageIndex)}>{targetPageIndex + 1}</NumberButton>);
          })
        }
        <ArrowButton isActive={isRightArrowActive} onClick={isRightArrowActive ? onClickGoToNextSetButton : noopFunc}><SVGS.PAGINATION_ICON_GO_NEXT /></ArrowButton>
        <ArrowButton isActive={isRightArrowActive} onClick={isRightArrowActive ? onClickGoToLastButton : noopFunc}><SVGS.PAGINATION_ICON_GO_LAST /></ArrowButton>
      </Wrapper>
    </Root>
  );
};

const COLOR_TEXT_SUB = '#3B4951';
const COLOR_TEXT_PALE = '#A7A7A7';

const Root = styled.div`
  margin: 40px 0px 0px 0px;

  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.div<{ isCurrentPage?: boolean; isActive?: boolean; }>`
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`

const NumberButton = styled(Button)`
  font-weight: ${({ isCurrentPage }) => isCurrentPage ? 'bold' : 'normal'};
  font-size: 14px;
  letter-spacing: -0.5px;
  color: ${({ isCurrentPage }) => isCurrentPage ? COLORS.red : COLOR_TEXT_SUB};

  &:hover {
    color: ${COLORS.red};
  }
`;

const ArrowButton = styled(Button)`
  stroke: ${({ isActive }) => isActive ? COLOR_TEXT_SUB : COLOR_TEXT_PALE};

  &:hover {
    stroke: ${({ isActive }) => isActive ? COLORS.red : COLOR_TEXT_PALE};
  }
`;