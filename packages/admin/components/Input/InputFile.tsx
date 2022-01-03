import { BaseSyntheticEvent, useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { COLORS, SVGS } from '@resources';
import { DefaultInputProps, defaultInputCSS, InputWrapper, disabledCheckboxCSS } from './base';
import { FileBuffer } from '@api';

const _InputFile = ({
  inputTitle,
  subtext = 'pdf, png, jpg 파일 1개 업로드 가능',
  style,
  defaultValue,
  downloadable = false,
  ...props
}: {
  downloadable?: boolean;
  // defaultValue?: File | null;
  defaultValue?: FileBuffer;
} & Omit<DefaultInputProps, 'defaultValue'>) => {
  const ref = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>(defaultValue?.name || '');
  const activateInput = useCallback(() => ref.current?.click(), [ref.current]);
  const uploadFile = useCallback(({ target: { files } }: BaseSyntheticEvent) => setFileName(files[0].name), [setFileName]);
  const clearFile = useCallback(() => {
    if (ref.current) { ref.current.value = ""; }
    setFileName('');
  }, [setFileName]);

  const downloadAvailable = useMemo(() => downloadable && !!defaultValue, [downloadable, defaultValue]);
  const downloadFile = useCallback(() => {
    if (!defaultValue) return ;

    const byteArray = new Uint8Array(defaultValue.data);
    const blob = new Blob([byteArray], { type: "application/octet-stream" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = defaultValue.name;
    link.href = href;
    link.target = '_blank';
    link.click();

    URL.revokeObjectURL(href);
  }, [downloadAvailable, defaultValue]);
  return (
    <InputWrapper inputTitle={inputTitle} subtext={subtext} style={style}>
      <Root>
        <FileNameBox>
          <FileNameWrapper>
            <FileNameText>{fileName}</FileNameText>
          </FileNameWrapper>
          {
            (!props.disabled && fileName) && (
              <DeleteFileButton onClick={clearFile}>
                <SVGS.ICON_DELETE_FILE />
              </DeleteFileButton>
            )
          }
        </FileNameBox>
        {
          !(downloadable && props.disabled) && (
            <label>
              <Input {...props} ref={ref} type="file" accept=".pdf, .png, .jpg" onChange={uploadFile} />
              <Button type="button" onClick={activateInput} disabled={props.disabled}>{downloadable ? '업로드' : '파일찾기'}</Button>
            </label>
          )
        }
        {downloadable && <Button type="button" onClick={downloadFile} disabled={!defaultValue}>다운로드</Button>}
      </Root>
    </InputWrapper>
  );
}

const Root = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 10px;
`;

const FileNameBox = styled.div`
  ${defaultInputCSS}
  background-color: ${COLORS.box};

  display: flex;
  align-items: center;
  justify-content: space-between;

  overflow: hidden;
`;

const FileNameWrapper = styled.div`
  max-width: calc(100% - 26px);
`;

const FileNameText = styled.div`
  font-weight: 300;
  font-size: 15px;
  line-height: 40px;
  letter-spacing: -0.45px;
  color: ${COLORS.gray};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeleteFileButton = styled.div`
  margin: 0px 0px 0px 10px;
  width: 16px;
  height: 16px;

  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const Button = styled.button`
  width: 100px;
  min-width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${COLORS.main};
  background-color: ${COLORS.white};
  padding: 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  
  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.main};

  &:hover {
    background-color: ${COLORS.main};
    color: ${COLORS.white};
  }
  &:active {
    background-color: ${COLORS.main};
    color: ${COLORS.white};
    opacity: 0.5;
  }
  &:disabled {
    ${disabledCheckboxCSS}
    &:hover {
      background-color: ${COLORS.white};
      color: ${COLORS.main};
    }
  }
`;

const Text = styled.div`
  height: 18px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.main};
`;

export const InputFile = _InputFile;