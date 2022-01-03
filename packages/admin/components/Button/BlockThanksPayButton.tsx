import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styled, { keyframes } from 'styled-components';
import { COLORS } from '@resources';

const _BlockThanksPayButton = ({
  style = '',
  isSubmitting = false,
  ...props
}: {
  style?: string;
  isSubmitting?: boolean;
} & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'ref' | 'style'>) => {
  return (
    <BlockButton {...props} customStyle={style}>
      {isSubmitting ? <Spinner /> : <BlockText>지급 정지</BlockText>}
    </BlockButton>
  );
};

const _RelicenseThanksPayButton = ({
  style = '',
  isSubmitting = false,
  ...props
}: {
  style?: string;
  isSubmitting?: boolean;
} & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'ref' | 'style'>) => {
  return (
    <RelicenseButton {...props} customStyle={style}>
      {isSubmitting ? <Spinner /> : <RelicenseText>정지 해제</RelicenseText>}
    </RelicenseButton>
  );
};

const BlockButton = styled.button<{customStyle: string;}>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${COLORS.red};
  background-color: ${COLORS.white};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:disabled {
    background-color: ${COLORS.gray};
    cursor: not-allowed;
  }

  &:hover { opacity: 0.8; }
  &:active { opacity: 0.5; }

  ${({ customStyle }: { customStyle: string }) => customStyle}
`;

const RelicenseButton = styled(BlockButton)`
  border-color: transparent;
  background-color: ${COLORS.pink};
`;

const BlockText = styled.div`
  height: 18px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.red};
`;

const RelicenseText = styled(BlockText)`
  color: ${COLORS.pink_dark};
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
  border: 6px solid;
  border-color: transparent ${COLORS.red} ${COLORS.red} ${COLORS.red};
  animation: ${spinAnimation} 2s infinite linear;
`;

export const BlockThanksPayButton = _BlockThanksPayButton;
export const RelicenseThanksPayButton = _RelicenseThanksPayButton;