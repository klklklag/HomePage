import { BaseSyntheticEvent, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { COLORS, SVGS } from '@resources';
import { Select } from '@components';

const _SearchBar = ({
  style,
}: {
  style?: string;
}) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = useCallback(() => inputRef.current?.focus(), [inputRef.current]);
  const handleButtonClick = useCallback((e: BaseSyntheticEvent) => {
    e.stopPropagation();
  }, []);
  return (
    // <Form method="get" customStyle={style}>
    //   <Select type="round" name="search-table" style="width: 140px;" defaultValue="partnerName">
    //     <option value="partnerName">기업명</option>
    //     <option value="workerName">근로자명</option>
    //   </Select>
    //   <SearchBarBox
    //     onClick={focusInput}
    //   >
    //     <Input type="text" name="search-key" placeholder="입력" ref={inputRef} />
    //     <ButtonWrapper>
    //       <Button type="submit" onClick={handleButtonClick}>
    //         <SVGS.ICON_SEARCH />
    //       </Button>
    //     </ButtonWrapper>
    //   </SearchBarBox>
    // </Form>
    null
  );
};

const Form = styled.form<{ customStyle?: string; }>`
  display: flex;
  align-items: center;
  gap: 10px;

  ${({ customStyle }) => customStyle}
`;

const SearchBarBox = styled.div`
  width: 400px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid ${COLORS.border};
  padding: 0px 0px 0px 20px;

  display: flex;
  align-items: center;
  gap: 20px;

  cursor: text;
`;

const Input = styled.input`
  flex: 1;

  border: 0px;
  outline: none;
`;

const ButtonWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  border: 0px solid;
  background-color: ${COLORS.main};
  padding: 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:hover { opacity: 0.8; }
  &:active { opacity: 0.5; }
`;

export const SearchBar = _SearchBar;