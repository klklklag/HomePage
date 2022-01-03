import styled from 'styled-components';
import { COLORS } from '@resources';

export const RectButton = styled.button<{ customStyle?: string; }>`
  margin: 0px 0px 0px auto;

  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0px solid;
  background-color: ${COLORS.main};
  padding: 0px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.white};

  &:hover { opacity: 0.8; }
  &:active { opacity: 0.5; }

  ${({ customStyle }) => customStyle}
`;