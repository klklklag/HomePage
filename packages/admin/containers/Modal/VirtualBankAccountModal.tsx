import { adminAPI } from '@api';
import { InputFile, InputRadio, InputText, InputUnitNumber, Modal, SaveChangeButton } from '@components';
import { useForm } from '@hooks';
import { decrypt, getCurrentYearMonth, getObjectFromForm, refreshPage } from '@resources';
import { InputSelectBank } from 'containers/Input';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import {
  DataGrid,
  DataGridItem,
  ModalInstanceProps,
  PropertyAreaTitle,
  PropertyName,
  RadioRow
} from './base';

const _VirtualBankAccountModal = ({ data, ...props }: { data: any; } & ModalInstanceProps) => {
  const { query } = useRouter();
  const { isSubmitting, handleSubmit } = useForm();
  const disabled = useMemo(() => data?.yearMonth < getCurrentYearMonth(), [data?.yearMonth]);

  const onSubmit = useCallback(async () => {
    const inputData = getObjectFromForm(document.getElementById('virtualAccountForm'));

    const apiToCall =
      !data?.partnerVirtualAccount ?
        adminAPI.registerVirtualAccount :
        adminAPI.updatePartnerData;

    const result = await apiToCall({
      partnerLicenseId: decrypt(String(query.partnerId)),
      ...inputData
    });

    if ('errors' in result) {
      alert(result.errors.errMsg);
      return;
    }

    refreshPage();
  }, [data]);
  return (
    <Modal {...props} type={undefined} title="가상계좌 관리">
      <form id="virtualAccountForm" onSubmit={handleSubmit(onSubmit)}>
        <PropertyAreaTitle customStyle="margin: 60px 0px 0px;">가상 계좌 정보</PropertyAreaTitle>
        <DataGrid>
          <DataGridItem>
            <PropertyName customStyle={propertyNameStyle}>은행명</PropertyName>
            <InputSelectBank name="virtualAccountBankCode" style={propertyInputStyle} defaultValue={data?.partnerVirtualAccountBankCode || '020'} disabled={disabled} />
          </DataGridItem>
          <DataGridItem>
            <PropertyName customStyle={propertyNameStyle}>가상 계좌 번호</PropertyName>
            <InputUnitNumber unit="" name="virtualBankAccount" style={propertyInputStyle} maxLength={14} defaultValue={data?.partnerVirtualAccount} disabled={disabled} />
          </DataGridItem>
          <DataGridItem>
            <PropertyName customStyle={propertyNameStyle}>예금주</PropertyName>
            <InputText name="virtualAccountHolder" style={propertyInputStyle} defaultValue={data?.partnerVirtualAccountHolder} disabled={disabled} />
          </DataGridItem>
        </DataGrid>

        <PropertyAreaTitle customStyle="margin: 60px 0px 0px;">자동 이체 정보</PropertyAreaTitle>
        <DataGrid>
          <DataGridItem>
            <PropertyName customStyle={propertyNameStyle}>자동 이체 여부</PropertyName>
            <RadioRow>
              <InputRadio name="isAutoTransfer" value="1" text="사용" defaultChecked={data?.partnerIsAutoTransfer === 1} disabled={disabled} />
              <InputRadio name="isAutoTransfer" value="0" text="미사용" defaultChecked={!data?.partnerIsAutoTransfer} disabled={disabled} />
            </RadioRow>
          </DataGridItem>
          <DataGridItem>
            <InputFileWrapper>
              <PropertyName customStyle={propertyNameStyle}>자동 이체 계약서</PropertyName>
              <InputFile name="autoTransferFile" style={propertyInputFileStyle} subtext="" defaultValue={data?.isAutoTransferFile} downloadable disabled={disabled} />
            </InputFileWrapper>
          </DataGridItem>
        </DataGrid>

        <SaveChangeButton type="submit" style="margin: 80px auto 0px;" isSubmitting={isSubmitting} />
      </form>
    </Modal>
  )
};

const InputFileWrapper = styled.div`
  position: relative;
  top: 20px;
  width: 100%;
`;

const propertyInputStyle = `
  width: 100%;
`;

const propertyInputFileStyle = `
  ${propertyInputStyle}
  margin: 20px 0px 0px;
`;

const propertyNameStyle = `
  min-width: 150px;
`;

export const VirtualBankAccountModal = _VirtualBankAccountModal;