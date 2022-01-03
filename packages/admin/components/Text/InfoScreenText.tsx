import styled from 'styled-components';
import { COLORS } from '@resources';

type CustomStyle = { customStyle?: string; };

export const PartnerInfoText = styled.div<CustomStyle>`
  margin: 40px 0px 0px;

  font-weight: 500;
  font-size: 21px;
  letter-spacing: -0.84px;
  color: ${COLORS.black};

  ${({ customStyle }) => customStyle}
`;
export const PartnerInfoSubtext = styled.div<CustomStyle>`
  margin: 20px 0px 0px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: 0.45px;
  ${COLORS.black};

  ${({ customStyle }) => customStyle}
`;
export const FieldTitle = styled.div<CustomStyle>`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.54px;
  color: ${COLORS.main};

  ${({ customStyle }) => customStyle}
`;