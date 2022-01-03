import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import styled from 'styled-components';
import { PartnerScreen, MenuBar } from '@layouts';
import { HistoryTable, PartnerHeader } from '@containers';
import { addIdIndexToTableData, COLORS, decrypt, getCurrentYear } from '@resources';
import { adminAPI, ThanksPayListItem } from '@api';

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const result = await adminAPI.readPartnerThanksPayList({
    partnerLicenseId: decrypt(String(query.partnerId)),
    year: String(query.year || getCurrentYear()),
  });

  if ('errors' in result) return { props: { data: [] }};
  return { props: { data: addIdIndexToTableData(result.partnerThanksPayListByYear.thanksPayList) }};
};

const Component = ({ data } : { data: ThanksPayListItem[]; }) => {
  return (
    <PartnerScreen>
      <MenuBar />
      <Body>
        <PartnerHeader />
        
        <HistoryTable data={data} />
      </Body>
    </PartnerScreen>
  );
};

const Body = styled.div`
  width: 100%;
  padding: 0px 40px 40px;
  border-radius: 4px;
  background-color: ${COLORS.white};
`;

export default Component