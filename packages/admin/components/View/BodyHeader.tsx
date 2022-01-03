import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { COLORS } from '@resources';

const _BodyHeader = ({
  style,
  ...props
}: {
  style?: string;
} & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref' | 'style'>) => {
  return (
    <Root {...props} customStyle={style} />
  );
}

const Root = styled.div<{ customStyle?: string; }>`
  width: 100%;
  height: 100px;
  border-width: 1px 0px;
  border-style: solid;
  border-color: transparent transparent ${COLORS.gray_pale};

  display: flex;
  align-items: center;

  ${({ customStyle }) => customStyle}
`;

export const BodyHeader = _BodyHeader;