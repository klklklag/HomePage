import styled from 'styled-components';
import { COLORS } from '@resources';
import { DefaultTextComponentProps } from './base';

const _AddInfoNoticeText = ({
  style = "",
  ...props
}: DefaultTextComponentProps) => {
  return (
    <Text customStyle={style} {...props} />
  )
}

export const Text = styled.div<{ customStyle?: string; }>`
  margin: 30px 0px 0px;
  height: 64px;

  font-weight: 500;
  font-size: 24px;
  line-height: 35px;
  letter-spacing: -0.96px;
  color: ${COLORS.black};

  white-space: pre;

  ${({ customStyle }) => customStyle}
`;

export const AddInfoNoticeText = _AddInfoNoticeText;