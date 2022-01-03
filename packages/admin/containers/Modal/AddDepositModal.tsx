import { FormEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BottomButton, InputText, InputUnitNumber, Modal, Warning } from '@components';
import { COLORS, decrypt, getCurrentYearMonth, getObjectFromForm, refreshPage } from '@resources';
import { RootState } from '@shared-state';
import { adminAPI, AdminAPI_SendDepositFromPartner_Params } from '@api';
import { useForm } from '@hooks';
import { ModalInstanceProps } from './base';

const _AddDepositModal = ({
  bankAccount,
  ...props
}: {
  bankAccount?: string;
} & ModalInstanceProps) => {
  const router = useRouter();
  const partner = useSelector(({ partner }: RootState) => partner);
  const { isSubmitting, handleSubmit } = useForm();

  const onSubmit = useCallback(async () => {
    const target = document.getElementById('depositForm');
    const data = getObjectFromForm(target);
    const result = await adminAPI.sendDepositFromPartner({
      partnerLicenseId: decrypt(String(router.query.partnerId)),
      ...data
    } as AdminAPI_SendDepositFromPartner_Params);
    if ('errors' in result) {
      alert(result.errors.errMsg);
      return;
    }

    refreshPage();
  }, []);
  return (
    <Modal {...props} type="plain">
      <Form onSubmit={handleSubmit(onSubmit)} id="depositForm">
        <TitleRow>
          <TitleText>보증금 입금</TitleText>
          <Warning>* 수동으로 보증금을 입금하기 위한 창입니다.</Warning>
        </TitleRow>
        <DateText>{getCurrentYearMonth()}</DateText>
        <input type="hidden" name="accountHolder" value={partner.partnerCEO} />
        <input type="hidden" name="bankCode" value="020" />
        <InputRow>
          <InputText inputTitle="기업명" style={halfInputStyle} name="" defaultValue={partner.partnerName} readOnly />
          <InputText inputTitle="가상계좌번호" style={halfInputStyle} name="virtualBankAccount" defaultValue={bankAccount} readOnly />
        </InputRow>
        <InputUnitNumber inputTitle="입금 금액" unit="원" name="deposit" placeholder="1,000,000" />
        <ButtonRow>
          <BottomButton type="button" text="취소" style={cancelButtonStyle} onClick={props.closeFunc} />
          <BottomButton type="submit" text="확인" isSubmitting={isSubmitting} />
        </ButtonRow>
      </Form>
    </Modal>
  );
};

const Form = styled.form`
  width: 600px;
  padding: 40px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputRow = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 20px;
`;

const ButtonRow = styled(InputRow)`
  margin: 20px 0px 0px;
`;

const halfInputStyle = `
  flex: 1;
`;

const TitleText = styled.div`
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.96px;
  color: ${COLORS.black};
`;

const DateText = styled.div`
  font-weight: 300;
  font-size: 18px;
  letter-spacing: -0.54px;
  color: ${COLORS.main};
`;

const cancelButtonStyle = `
  background-color: ${COLORS.gray};
`;

export const AddDepositModal = _AddDepositModal;