import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import styled from 'styled-components';
import { PartnerScreen, MenuBar } from '@layouts';
import { WorkerTable, PartnerHeader } from '@containers';
import { addIdIndexToTableData, COLORS, decrypt } from '@resources';
import { adminAPI, WorkerSummaryListItem } from '@api';

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const result = await adminAPI.readPartnerWorkerAll({
    partnerLicenseId: decrypt(String(query.partnerId)),
  });

  if ('errors' in result) return { props: { data: [] }};
  return { props: { data: addIdIndexToTableData(result.workerListByPartner) }};
};

const Component = ({ data }: { data: WorkerSummaryListItem[]; }) => {
  return (
    <PartnerScreen>
      <MenuBar />
      <Body>
        <PartnerHeader />
        
        <WorkerTable data={data} />
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