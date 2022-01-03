import { BaseSyntheticEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { COLORS, SVGS } from '@resources';

export type ModalProps = {
  type?: 'plain' | 'screen';
  visible: boolean;
  closeFunc: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  title?: string;
  children?: any;
};

const _Modal = ({
  type = "screen",
  visible,
  closeFunc,
  title = "title prop",
  children,
}: ModalProps) => {
  const isScreenType = useMemo(() => type === 'screen', [type]);

  const ref = useRef<HTMLDivElement>(null);
  const stopPropagation = useCallback((e: BaseSyntheticEvent) => e.stopPropagation(), []);
  useEffect(() => {
    if (visible) {
      ref.current?.scrollTo(0,0);
    }
  }, [visible]);

  return (
    visible ? (
      <Background ref={ref} visible={visible} onClick={closeFunc}>
        <Foreground onClick={stopPropagation} type={type}>
          {
            isScreenType && (
              <TitleRow>
                <SVGS.ICON_SETTING />
                <TitleText>{title}</TitleText>
              </TitleRow>
            )
          }

          {children}

          {
            isScreenType && (
              <CloseButton onClick={closeFunc}>
                <SVGS.ICON_CLOSE_MODAL />
              </CloseButton>
            )
          }
        </Foreground>
      </Background>
    ) : null
  );
};

const Background = styled.div<{ visible: boolean; }>`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;

  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  padding: 40px;
  background-color: rgba(0,0,0,0.4);

  overflow: scroll;

  ${({ visible }) => visible ? `
    display: flex;
    justify-content: center;
  ` : `
    display: none;
  `}
`;

const Foreground = styled.div<Pick<ModalProps, 'type'>>`
  position: relative;
  margin: auto 0px;
  height: fit-content;
  border-radius: 4px;
  background-color: ${COLORS.white};
  box-shadow: 4px 4px 30px 0px rgba(0, 0, 0, 0.2);

  ${({ type }) => type === 'screen' ? `
    min-width: 1110px;
    padding: 60px 80px 40px;
  ` : `
    padding: 0px;
  `}
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  &:hover { opacity: 0.8 };
  &:active { opacity: 0.5 };
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TitleText = styled.div`
  height: 24px;
  font-weight: 600;
  font-size: 21px;
  letter-spacing: -0.84px;
  color: ${COLORS.black};
`;

export const Modal = _Modal;