import styled from 'styled-components';
import { COLORS } from '@resources';

export const ScreenTitle = styled.div<{ customStyle?: string; }>`
  font-weight: 500;
  font-size: 21px;
  letter-spacing: -0.84px;
  color: ${COLORS.black};
  
  ${({ customStyle }) => customStyle}
`;

export const ScreenSubtitle = styled.div<{ customStyle?: string; }>`
  margin: 7px 0px 0px 10px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
  
  ${({ customStyle }) => customStyle}
`;