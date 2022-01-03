import { ButtonHTMLAttributes, DetailedHTMLProps, useMemo } from 'react';
import { CSVLink } from 'react-csv';
import styled from 'styled-components';
import { COLORS, SVGS } from '@resources';

const fileNameRegex = /\.csv/;

const _DownloadCSVButton = ({
  fileName = '땡쓰에서 다운받은 무언가.csv',
  columns = [],
  data = [],
  style,
}: {
  fileName?: string;
  columns: any[];
  data: any[];
  style?: string;
} & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'ref' | 'style'>) => {
  const filename = useMemo(() => fileNameRegex.test(fileName) ? fileName : fileName + '.csv', [fileName]);
  const headers = useMemo(() => columns.map(({ accessor, Header }) => ({ key: accessor, label: Header })), [columns]);
  return (
    <Root customStyle={style}>
      <CSVLink
        download={filename}
        headers={headers}
        data={data}
        target="_blank"
        // asyncOnClick
        // onClick={(event, done) => {
        //   done(false);
        // }}
      >
        <Button>
          <SVGS.ICON_DOWNLOAD />
          CSV 다운로드
        </Button>
      </CSVLink>
    </Root>
  );
};

const Root = styled.div<{ customStyle?: string; }>`
  ${({ customStyle }) => customStyle}
`;

const Button = styled.button`
  width: 140px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${COLORS.main};
  background-color: ${COLORS.white};
  padding: 0px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  cursor: pointer;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};

  &:hover { opacity: 0.8; }
  &:active { opacity: 0.5; }
`;

export const DownloadCSVButton = _DownloadCSVButton;