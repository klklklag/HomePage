import { useMemo } from 'react';
import styled from 'styled-components';
import { InputRadio, InputUnitNumber, Modal, SaveChangeButton } from '@components';
import { COLORS } from '@resources';
import { InvoiceDetailListItem } from '@api';
import {
  AreaDivider,
  CalculationDivider,
  DataGrid,
  DataGridItem,
  ModalInstanceProps,
  NumberWithUnit,
  PropertyAreaTitle,
  PropertyName,
  PropertyValue,
  RadioRow
} from './base';

const _InvoiceModal = ({
  data,
  ...props
}: {
  data: InvoiceDetailListItem;
} & ModalInstanceProps) => {
  const totalThanksPay = useMemo(() => data?.workerThanksPayList.reduce((prev, curr) => prev + parseInt(curr), 0) || 0, [data?.workerThanksPayList]);
  return (
    <Modal {...props} title="인보이스 상세">
      <PropertyAreaTitle customStyle="margin: 40px 0px 0px">지급 계좌 정보</PropertyAreaTitle>
      
      <DataGrid>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>은행명</PropertyName>
          <PropertyValue>신한은행</PropertyValue>
        </DataGridItem>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>가상 계좌 번호</PropertyName>
          <PropertyValue>123123123123123</PropertyValue>
        </DataGridItem>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>예금주</PropertyName>
          <PropertyValue>{data?.workerName}</PropertyValue>
        </DataGridItem>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>현금 영수증 여부</PropertyName>
          <RadioRow>
            <InputRadio name="asd" text="사용" value="사용" disabled />
            <InputRadio name="asd" text="미사용" value="미사용" defaultChecked disabled />
          </RadioRow>
        </DataGridItem>
      </DataGrid>

      <AreaDivider />

      <PropertyAreaTitle>선지급 급여 총 내역</PropertyAreaTitle>

      <DataGrid>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>이용 건 수</PropertyName>
          <NumberWithUnit value={data?.thanksPayCountByWorker} unit="회" />
        </DataGridItem>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>서비스 수수료</PropertyName>
          <NumberWithUnit value={data?.workerMonthlyServiceFee} />
        </DataGridItem>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>신청 금액</PropertyName>
          <NumberWithUnit value={data?.workerMonthlyThanksPay} />
        </DataGridItem>
        <DataGridItem>
          <PropertyName customStyle={propertyNameStyle}>선 지급 총액</PropertyName>
          <NumberWithUnit value={data?.workerMonthlyPay} />
        </DataGridItem>
      </DataGrid>

      <AreaDivider />

      <PropertyAreaTitle>선지급 급여 건별 내역</PropertyAreaTitle>

      <HistoryRowsWrapper>
        <HistoryRow>
          <HistoryHeaderItem>No.</HistoryHeaderItem>
          <HistoryHeaderItem>지급 날짜</HistoryHeaderItem>
          <HistoryHeaderItem>선지급 급여</HistoryHeaderItem>
          <HistoryHeaderItem>서비스 수수료</HistoryHeaderItem>
          <HistoryHeaderItem>선 지급 총액</HistoryHeaderItem>
        </HistoryRow>

        {
          data?.workerThanksPayList
          .map((workerThanksPay, index) =>
            <HistoryRow key={String(index)}>
              <HistoryItem>{(index + 1).toString(10).padStart(2, '0')}</HistoryItem>
              <HistoryItem>{data?.workerThanksPayDateList[index]}</HistoryItem>
              <HistoryItem>
                <NumberWithUnit value={parseInt(workerThanksPay)} />
              </HistoryItem>
              <HistoryItem>
                <NumberWithUnit value={0} />
                {/* <InputUnitNumber style={unitNumberInputStyle} unit="원" /> */}
              </HistoryItem>
              <HistoryItem>
                <NumberWithUnit value={parseInt(workerThanksPay) + 0} />
              </HistoryItem>
            </HistoryRow>
          )
        }
      </HistoryRowsWrapper>

      <CalculationDivider />

      <HistoryRow>
        <HistoryItem></HistoryItem>
        <HistoryItem></HistoryItem>
        <HistoryItem>
          <NumberWithUnit value={totalThanksPay} />
        </HistoryItem>
        <HistoryItem>
          <NumberWithUnit value={0} />
        </HistoryItem>
        <HistoryItem>
          <NumberWithUnit value={totalThanksPay} />
        </HistoryItem>
      </HistoryRow>

      <SaveChangeButton style="margin: 60px auto 0px;" />
    </Modal>
  )
};

const propertyNameStyle = `
  min-width: 183px;
`;

const propertyUnitStyle = `
  margin: 0px 0px 0px auto;
`;

const unitNumberInputStyle = `
  width: 100%;
`;

const HistoryRowsWrapper = styled.div`
  margin: 30px 0px 0px;
  width: 100%;
  padding: 0px 20px 0px 0px;
  
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HistoryRow = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 20px;
`;

const HistoryItem = styled.div`
  width: 200px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:first-child {
    width: 50px;
    justify-content: flex-start;
  }

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
`;

const HistoryHeaderItem = styled(HistoryItem)`
  font-weight: 600;
  font-size: 17px;
  letter-spacing: -0.68px;
  color: ${COLORS.black};
`;

export const InvoiceModal = _InvoiceModal;