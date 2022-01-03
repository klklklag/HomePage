import React, { useCallback, useState } from 'react';
import Post, { Address } from 'react-daum-postcode';
import { DefaultInputProps, disabledInputCSS, InputText, Modal, useModal } from '@components';
import { COLORS } from '@resources';

const _InputAddress = ({ defaultValue, ...props }: DefaultInputProps) => {
  const [visible, show, hide] = useModal();
  const [value, setValue] = useState<string>(String(defaultValue || ''));
  const onComplete = useCallback((result: Address) => {
    setValue(result.roadAddress);
    hide();
  }, [setValue, hide]);
  return (
    <>
      <InputText
        inputTitle="사업장 주소"
        subtext="도로명 주소를 입력해주세요."
        name="partnerAddress"
        {...props}
        inputTextStyle={inputTextStyle}
        value={value}
        readOnly
        onFocus={show}
        onClick={show}
      />
      
      <Modal type="plain" visible={visible} closeFunc={hide}>
        <Post style={postStyle} onComplete={onComplete} />
      </Modal>
    </>
  );
};

const ratio = 4 / 3;
const postStyle = {
  minWidth: 300,
  maxWidth: 500,
  width: '50vw',
  minHeight: 300 * ratio,
  maxHeight: 500 * ratio,
  height: `${50 * ratio}vw`,
};
const inputTextStyle = `
  &:read-only {
    background-color: ${COLORS.white};
    cursor: pointer;
  }
  &:disabled {
    ${disabledInputCSS}
  }
`;

export const InputAddress = _InputAddress;