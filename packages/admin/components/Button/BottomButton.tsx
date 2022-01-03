import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styled, { keyframes } from 'styled-components';
import { COLORS } from '@resources';

const _BottomButton = ({
  style = '',
  text = '기본 텍스트',
  isSubmitting = false,
  ...props
}: {
  style?: string;
  text: string;
  isSubmitting?: boolean;
} & Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'ref' | 'style'>) => {
  return (
    <Button {...props} customStyle={style}>
      {isSubmitting ? <Spinner /> : <Text>{text}</Text>}
    </Button>
  );
};

const Button = styled.button<{customStyle: string;}>`
  margin: auto 0px 0px 0px;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  border: 0px solid;
  background-color: ${COLORS.main};
  padding: 0px;

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
  
  color: ${COLORS.white};

  ${({ customStyle }: { customStyle: string }) => customStyle}
`;

const Text = styled.div`
  height: 17px;

  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.45px;
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

export const BottomButton = _BottomButton;