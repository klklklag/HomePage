import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styled, { keyframes } from 'styled-components';
import { COLORS } from '@resources';

const _SaveChangeButton = ({
  style,
  isSubmitting = false,
  ...props
}: {
  isSubmitting?: boolean;
  style?: string;
} & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'ref' | 'style'>) => {
  return (
    <Root {...props} customStyle={style}>
      {
        isSubmitting ?
          <Spinner /> :
          '변경사항 저장'
      }
    </Root>
  );
};

const Root = styled.button<{ customStyle?: string; }>`
  margin: 108px auto 0px;
  
  width: 200px;
  height: 50px;
  border-radius: 50px;
  border: 0px solid;
  background-color: ${COLORS.black_pale};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.white};

  &:hover { opacity: 0.8; }
  &:active { opacity: 0.5; }

  ${({ customStyle }) => customStyle}
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
  border-color: transparent ${COLORS.white} ${COLORS.white} ${COLORS.white};
  animation: ${spinAnimation} 2s infinite linear;
`;

export const SaveChangeButton = _SaveChangeButton;