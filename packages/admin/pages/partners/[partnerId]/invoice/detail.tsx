import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import styled from 'styled-components';
import { PartnerScreen, MenuBar } from '@layouts';
import { InvoiceDetailTable, PartnerHeader } from '@containers';
import { addIdIndexToTableData, COLORS, decrypt } from '@resources';
import { adminAPI, InvoiceDetailListItem } from '@api';

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const result = await adminAPI.readPartnerInvoiceDetail({
    partnerLicenseId: decrypt(String(query.partnerId)),
    yearMonth: String(query.yearMonth),
  })

  if ('errors' in result) return {
    props: {
      data: [],
      checkSendEmail: '-',
      partnerMonthlyReqThanksPay: '0',
      partnerMonthlyServiceFee: '0',
      partnerMonthlyThanksPay: '0',
    }
  };

  const {
    invoiceListDetailByWorker,
    checkSendEmail,
    partnerMonthlyReqThanksPay,
    partnerMonthlyServiceFee,
    partnerMonthlyThanksPay,
  } = result.invoiceListDetail;
  return {
    props: {
      data: addIdIndexToTableData(invoiceListDetailByWorker),
      checkSendEmail,
      partnerMonthlyReqThanksPay,
      partnerMonthlyServiceFee,
      partnerMonthlyThanksPay,
    }
  };
};

const Component = (props: {
  data: InvoiceDetailListItem[];
  checkSendEmail: string;
  partnerMonthlyReqThanksPay: number;
  partnerMonthlyServiceFee: number;
  partnerMonthlyThanksPay: number;
}) => {
  return (
    <PartnerScreen>
      <MenuBar />
      <Body>
        <PartnerHeader />
        
        <InvoiceDetailTable {...props} />
      </Body>
    </PartnerScreen>
  );
};

const Root = styled.div`
  width: 100%;
  padding: 20px 100px 40px;
  
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Body = styled.div`
  width: 100%;
  padding: 0px 40px 40px;
  border-radius: 4px;
  background-color: ${COLORS.white};
`;

export default Component