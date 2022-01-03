import { BaseSyntheticEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { FAQListItem } from '@api';
import { COLORS, SVGS, TRANSITION_TIME } from '@resources';
import { ConfirmButton, DeleteButton, InputText, InputTextarea, UpdateButton } from '@components';
import { useForm } from '@hooks';

const handleClickButton = (callback?: (callbackEvent: BaseSyntheticEvent) => void) =>
  (event: BaseSyntheticEvent) => {
    event.stopPropagation();
    callback?.(event);
  }
;

const _FAQComponent = ({
  data: {
    faqTitle,
    faqReply,
  },
  isSelected = false,
  onClick,
}: {
  data: FAQListItem;
  isSelected: boolean;
  onClick: (event?: BaseSyntheticEvent) => void;
}) => {
  const { isSubmitting, handleSubmit } = useForm();

  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(ref.current?.clientHeight || 0);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

  const handleClickItem = useCallback((event: BaseSyntheticEvent) => {
    onClick(event);
    setHeight(ref.current?.clientHeight || 0);
  }, [onClick, setHeight, ref.current?.clientHeight]);

  const onClickUpdate = useCallback(() => {
    setIsUpdateMode(true);
  }, []);

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    console.log(event);
  }, []);

  useEffect(() => {
    !isSelected && setIsUpdateMode(false);
  }, [isSelected]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Root onClick={handleClickItem} isSelected={isSelected}>
        <TextQ>Q</TextQ>
        {
          isUpdateMode ?
            <InputText style={inputStyle} defaultValue={faqTitle} inputTextStyle={fontStyle} /> :
            <FAQTitle>{faqTitle}</FAQTitle>
        }
        <RightArea className="faq-right-area">
          <ButtonWrapper className="button-wrapper">
            {
              isUpdateMode ? (
                <ConfirmButton onClick={handleClickButton()} />
              ) : (
                <>
                  <UpdateButton onClick={handleClickButton(onClickUpdate)} />
                  <DeleteButton onClick={handleClickButton()} />
                </>
              )
            }
          </ButtonWrapper>
          <ArrowWrapper className="arrow-wrapper">
            <SVGS.SELECT_ICON_ARROW />
          </ArrowWrapper>
        </RightArea>
      </Root>

      <AnswerWrapper isSelected={isSelected} height={height + 10}>
        <TextA>A</TextA>
        {
          isUpdateMode ?
           <InputTextarea
            style={textareaStyle}
            defaultValue={faqReply}
            height={height + 10 + topCorrection - 2}
            inputTextStyle={fontStyle}
          /> :
           <FAQAnswer ref={ref}>{faqReply}</FAQAnswer>
        }
      </AnswerWrapper>
    </form>
  );
};

const Root = styled.div<{ isSelected: boolean; }>`
  width: 100%;
  height: 80px;
  border-radius: 4px;
  border: 1px solid transparent;
  background-color: ${COLORS.box};
  padding: 0px 40px 0px 20px;

  cursor: pointer;

  display: flex;
  align-items: center;

  ${({ isSelected }) => isSelected && `
    border: 1px solid ${COLORS.border};
    background-color: ${COLORS.box_pale};

    > .faq-right-area {
      > .arrow-wrapper {
        transform: rotateX(180deg);
      }
      > .button-wrapper {
        visibility: visible;
        opacity: 1;
      }
    }
  `}
`;

const ArrowWrapper = styled.div`
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: ${TRANSITION_TIME};
`;

const TextQ = styled.div`
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  font-size: 18px;
  color: ${COLORS.red};
`;

const TextA = styled(TextQ)`
  color: ${COLORS.main};
`;

const fontStyle = `
  font-weight: 300;
  font-size: 18px;
  letter-spacing: -0.54px;
  color: ${COLORS.black};
  line-height: 27px;
`;

const FAQTitle = styled.div`
  margin: 0px 0px 0px 20px;

  ${fontStyle}
`;

const AnswerWrapper = styled.div<{ isSelected: boolean; height: number; }>`
  width: 100%;
  height: 0px;
  border: 1px solid transparent;
  padding: 0px 0px 0px 20px;

  display: flex;
  align-items: flex-start;

  overflow: hidden;

  opacity: 0;

  transition: ${TRANSITION_TIME};
  ${({ isSelected, height }) => isSelected && `
    height: ${height ? height + 20 : 0}px;
    padding: 20px 0px 0px 20px;
    opacity: 1;
  `}
`;

const FAQAnswer = styled(FAQTitle)`
  margin: 0px;
  padding: 0px 0px 0px 20px;
  flex: 1;

  white-space: pre-wrap;
`;

const RightArea = styled.div`
  margin: 0px 0px 0px auto;

  display: flex;
  align-items: center;
  gap: 40px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  visibility: hidden;
  opacity: 0;

  transition: ${TRANSITION_TIME};
`;

const topCorrection = 11;
const inputStyle = `
  margin: 0px 0px 0px 9px;
  flex: 1;
`;
const textareaStyle = inputStyle + `
  position: relative;
  top: ${-topCorrection}px;
`;

export const FAQComponent = _FAQComponent;