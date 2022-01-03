import styled from 'styled-components';
import { defaultInputCSS, InputWrapper, DefaultTextareaProps } from './base';

const _InputTextarea = ({
  inputTitle,
  subtext,
  style,
  height,
  inputTextStyle,
  ...props
}: {
  height?: number;
} & DefaultTextareaProps) => {
  return (
    <InputWrapper inputTitle={inputTitle} subtext={subtext} style={style}>
      <TextArea
        {...props}
        height={height}
        inputTextStyle={inputTextStyle}
      />
    </InputWrapper>
  );
}

const TextArea = styled.textarea<{
  height?: number; 
  inputTextStyle?: string;
}>`
  ${defaultInputCSS}

  height: ${({ height }) => height || 100}px;
  padding: 10px;

  resize: none;

  ${({ inputTextStyle }) => inputTextStyle}
`;

export const InputTextarea = _InputTextarea;