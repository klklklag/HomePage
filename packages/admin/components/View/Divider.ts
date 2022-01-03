import styled from 'styled-components';
import { COLORS } from '@resources';

export const Divider = styled.div<{ customStyle?: string; }>`
  margin: 20px 0px;
  width: 100%;
  height: 1px;
  background-color: ${COLORS.border};

  ${({ customStyle }) => customStyle}
`;