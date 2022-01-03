import { DetailedHTMLProps, HTMLAttributes, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { COLORS, SVGS } from '@resources';
import { InputText } from 'components/Input';

type DefaultProps =
  & { style?: string; }
  & Omit<DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'ref' | 'style'>
;

const _UpdateButton = ({
  style,
  ...props
}: DefaultProps) => {
  return (
    <RootWithIcon type="button" {...props} customStyle={style}>
      <SVGS.ICON_UPDATE />
      수정
    </RootWithIcon>
  );
};

const _DeleteButton = ({
  style,
  onClick,
  ...props
}: DefaultProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = useCallback(event => {
    event.stopPropagation();
    setVisible(true);
    ref.current?.focus();
  }, [ref.current]);

  const focusInput = useCallback((event) => {
    ref.current?.focus();
    event.stopPropagation();
  }, [ref.current]);
  return (
    <DeleteButtonWrapper>
      <RootWithIcon type="button" onClick={handleClick} {...props} customStyle={style}>
        <SVGS.ICON_DELETE />
        삭제
      </RootWithIcon>

      <ConfirmDeletePopUp visible={visible} onClick={handleClick}>
        <InputText inputRef={ref} />
      </ConfirmDeletePopUp>
    </DeleteButtonWrapper>
  );
};

const _ConfirmButton = ({
  style,
  ...props
}: DefaultProps) => {
  return (
    <Root type="submit" {...props} customStyle={style}>
      완료
    </Root>
  );
};

const Root = styled.button<{ customStyle?: string; }>`
  width: 60px;
  height: 24px;
  background-color: transparent;
  border: 0px solid;
  padding: 0px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  cursor: pointer;

  font-weight: 300;
  font-size: 13px;
  letter-spacing: -0.39px;
  color: ${COLORS.gray};

  &:hover { opacity: 0.8; }
  &:active { opacity: 0.5; }

  ${({ customStyle }) => customStyle}
`;

const RootWithIcon = styled(Root)`
  padding: 0px 0px 0px 1px;
  justify-content: flex-start;
`;

const DeleteButtonWrapper = styled.div`
  position: relative;
`;

const ConfirmDeletePopUp = styled.div<{ visible: boolean; }>`
  position: absolute;
  top: 100%;
  left: 20px;

  width: 100px;
  height: 100px;
  border: 1px solid;
  background-color: ${COLORS.white};
  box-shadow: 4px 4px 30px 0px rgba(0, 0, 0, 0.2);

  visibility: hidden;
  opacity: 0;

  ${({ visible }) => visible && `
    visibility: visible;
    opacity: 1;
  `}
`;

export const UpdateButton = _UpdateButton;
export const DeleteButton = _DeleteButton;
export const ConfirmButton = _ConfirmButton;