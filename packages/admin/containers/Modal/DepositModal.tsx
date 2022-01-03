import { InputFile, InputMonth, InputRadio, InputText, InputUnitNumber, Modal, SaveChangeButton, Select } from '@components';
import { COLORS, getCurrentYearMonth } from '@resources';
import { InputSelectBank } from 'containers/Input';
import { useMemo } from 'react';
import styled from 'styled-components';
import {
  AreaDivider,
  DataGrid,
  DataGridItem,
  ModalInstanceProps,
  NumberWithUnit,
  PropertyAreaTitle,
  PropertyName,
  RadioRow
} from './base';

const _DepositModal = ({ data, ...props }: { data: any } & ModalInstanceProps) => {
  const disabled = useMemo(() => data?.yearMonth < getCurrentYearMonth(), [data?.yearMonth]);
  return (
    <Modal {...props} type={undefined} title="보증금 관리">
      {/* <div style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(data, null, 2)}</div> */}
      {/* <InputMonth style={inputMonthStyle} /> */}
      <PropertyAreaTitle customStyle={inputMonthStyle}>{data?.yearMonth}</PropertyAreaTitle>
      <PropertyAreaTitle customStyle="margin: 60px 0px 0px;">가상 계좌 정보</PropertyAreaTitle>
      <DataGrid>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>은행명</PropertyName>
          <InputSelectBank style={propertyInputStyle} defaultValue={data?.partnerVirtualAccountBankCode} disabled={disabled} />
        </DataGridItem>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>가상 계좌 번호</PropertyName>
          <InputText style={propertyInputStyle} defaultValue={data?.partnerVirtualAccount} disabled={disabled} />
        </DataGridItem>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>예금주</PropertyName>
          <InputText style={propertyInputStyle} defaultValue={data?.partnerVirtualAccountHolder} disabled={disabled} />
        </DataGridItem>
        <DataGridItem>
          <InputFileWrapper>
            <PropertyName customStyle={propertyNameStyle}>자동 이체 계약서</PropertyName>
            <InputFile style={propertyInputFileStyle} subtext="" defaultValue={data?.isAutoTransferFile} downloadable disabled={disabled} />
          </InputFileWrapper>
        </DataGridItem>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>자동 이체 여부</PropertyName>
          <RadioRow>
            <InputRadio name="use" value="사용" text="사용" defaultChecked={data?.partnerIsAutoTransfer === 1} disabled={disabled} />
            <InputRadio name="use" value="미사용" text="미사용" defaultChecked={data?.partnerIsAutoTransfer === 0} disabled={disabled} />
          </RadioRow>
        </DataGridItem>
      </DataGrid>

      <AreaDivider />

      <PropertyAreaTitle>정산 관리</PropertyAreaTitle>
      <DataGrid>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>납부 회차</PropertyName>
          <NumberWithUnit value={data?.monthlyDepositCount} unit="" />
        </DataGridItem>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>전월 보증금 총액</PropertyName>
          <NumberWithUnit value={99999999} />
        </DataGridItem>

        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>선지급 총액</PropertyName>
          <NumberWithUnit value={data?.partnerMonthlyPay} />
        </DataGridItem>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle} sign="-">이달 선지급 급여</PropertyName>
          <NumberWithUnit value={data?.partnerMonthlyThanksPay} />
        </DataGridItem>

        <Empty />
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle} sign="-">이달 수수료</PropertyName>
          <NumberWithUnit value={data?.partnerMonthlyServcieFee} />
        </DataGridItem>

        <Empty />
        <SmallDivider />

        <Empty />
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>보증금 잔액</PropertyName>
          <NumberWithUnit value={data?.monthlyDepositBalance} bold />
        </DataGridItem>

        <Empty />
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle + `color: ${COLORS.main}`} sign="+">추가 보증금</PropertyName>
          <InputUnitNumber style={propertyInputStyle} unit="원" defaultValue={data?.addDeposit} disabled={disabled} />
        </DataGridItem>
      </DataGrid>

      <LargeDivider />

      <DataGrid customStyle="margin: 0px;">
        <Empty />
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>정산 후 보증금 총액</PropertyName>
          <NumberWithUnit value={parseInt(data?.monthlyDepositBalance || 0) + parseInt(data?.addDeposit) || 0} bold />
        </DataGridItem>
      </DataGrid>

      <SaveChangeButton style="margin: 60px auto 0px;" />
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

const Empty = styled.div``;

const SmallDivider = styled.div`
  position: relative;
  right: 45px;

  width: calc(100% + 45px);
  height: 1px;
  background-color: ${COLORS.border};
`;

const LargeDivider = styled.div`
  margin: 20px 0px;
  width: 100%;
  height: 1px;
  background-color: ${COLORS.black};
`;

const inputMonthStyle = `
  position: absolute;
  top: 60px;
  right: 80px;
`;

export const DepositModal = _DepositModal;