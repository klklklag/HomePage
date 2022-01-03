import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  BottomButton,
  InputCheckbox,
  InputMonth,
  InputFile,
  InputPassword,
  InputPhone,
  InputRadio,
  InputText,
  InputUnitNumber,
  InputWithAPI,
  Select,
  Switch,
  useModal,
  DownloadCSVButton,
  InputYear,
  InputTextarea,
} from '@components';
import { COLORS, getObjectFromForm } from '@resources';
import { DepositModal, PartnerInfoModal, InvoiceModal, WorkerInfoModal, SearchBar, InputBRN, InputSelectBank, InputSelectPartnerType, InputSelectSalaryDay, InputSelectWorkType, InputAddress } from '@containers';

const Components: NextPage = () => {
  const router = useRouter();
  const [visible, show, hide] = useModal();

  const [disabled, setDisabled] = useState<boolean>(false);
  const getDisalbed = useCallback((value: boolean) => setDisabled(value), [setDisabled]);

  const logFormData = useCallback(() => {
    const data = getObjectFromForm(document.getElementsByTagName('form')[0]);
    console.log(data);
  }, []);

  return (
    <>
      <Root>
        <Form>
          <Switch shippingFunc={getDisalbed} />
          <InputText name="email" inputTitle="아이디 (이메일)" disabled={disabled} defaultValue="디폴트" />
          <InputPhone name="phone" inputTitle="담당자 전화번호" disabled={disabled} defaultValue="01052480218" />
          <InputBRN name="BRN" inputTitle="사업자 등록 번호" disabled={disabled} defaultValue="012-34-56789" />
          <InputPassword name="password" inputTitle="비밀번호" subtext="영문 대소문자/숫자/특수문자를 포함하여 8자 이상 입력해 주세요." disabled={disabled} defaultValue="rkskekfkak" />
          <InputFile name="imageFile" inputTitle="사업자 등록증 첨부" subtext="pdf, png, jpg 파일 1개 업로드 가능" downloadable disabled={disabled} />
          <InputWithAPI name="api" buttonText="API 호출" disabled={disabled} />
          <InputUnitNumber unit="명" disabled={disabled} defaultValue="0101010" />
          <InputAddress name="address" disabled={disabled} />
          <InputTextarea />
          <Select name="select" disabled={disabled}>
            {/* <option value="option 1" subtext="1인 이상 ~ 20인 미만 기업 추천">option 1</option>
            <option value="option 2" subtext="10인 이상 ~ 20인 미만 기업 추천">option 2</option>
            <option value="option 3" subtext="20인 이상 ~ 50인 미만 기업 추천">option 3</option>
            <option value="option 4" subtext="50인 이상 ~ 190인 미만 기업 추천">option 4</option>
            <option value="option 5" subtext="100인 이상 ~ 500인 미만 기업 추천">option 5</option> */}
          </Select>
          <InputSelectBank inputTitle="은행" disabled={disabled} />
          <InputSelectPartnerType inputTitle="기업 형태" disabled={disabled} />
          <InputSelectSalaryDay inputTitle="급여일" disabled={disabled} />
          <InputSelectWorkType inputTitle="근무 형태" disabled={disabled} />
          <InputCheckbox name="checkbox" text="마케팅 정보 수신 동의 (선택)" disabled={disabled} >
            <Text><Atag href="#">이용약관</Atag> 및 <Atag href="#">개인정보 처리 방침</Atag>에 동의합니다. (필수)</Text>
          </InputCheckbox>
          <InputCheckbox name="checkbox2" text="마케팅 정보 수신 동의 (선택)" disabled={disabled} />

          <Row>
            <InputRadio name="radio" text="히히" value="히히" disabled={disabled} defaultChecked />
            <InputRadio name="radio" text="헤헤" value="헤헤" disabled={disabled} />
            <InputRadio name="radio" text="하하" value="하하" disabled={disabled} />
            <InputRadio name="radio" text="호호" value="호호" disabled={disabled} />
          </Row>

          <BottomButton
            // style={customButtonStyle}
            type="button"
            onClick={logFormData}
            text="제출"
          />
        </Form>

        <div>
          <button type="button" onClick={show}>모달 열기</button>

          <Row>
            <InputMonth />
            <InputYear name="year-select" />
            <DownloadCSVButton
              columns={[{ accessor: 'glgl', Header: '히히히' }]}
              data={[{ glgl: 0}, { glgl: 1}, { glgl: 2}, { glgl: 3}]}
              fileName="테스트 파일"
            />
          </Row>
          
          <SearchBar />
          
          {/* <PartnerInfoModal visible={visible} closeFunc={hide} /> */}
        </div>
      </Root>
    </>
  );
};

const Root = styled.div`
  width: 100vw;
  height: 2000px;
  padding: 40px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Text = styled.span`
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
`;
const Atag = styled.a`
  color: ${COLORS.blue};
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const customButtonStyle = `
  width: 100px;
  background-color: red;
  color: green;
`;

export default Components;