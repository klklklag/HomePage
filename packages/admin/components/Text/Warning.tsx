import styled from 'styled-components';
import { COLORS } from '@resources';
import { DefaultTextComponentProps } from './base';

const _Warning = ({
  style = "",
  ...props
}: DefaultTextComponentProps) => {
  return (
    <Text customStyle={style} {...props} />
  );
};

const Text = styled.div<{ customStyle: string; }>`
  height: 18px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.red_dark};

  ${({ customStyle }) => customStyle}
`;

export const Warning = _Warning;