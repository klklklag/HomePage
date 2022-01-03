import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import styled from 'styled-components';
import { AdminScreen } from '@layouts';
import { addIdIndexToTableData, COLORS } from '@resources';
import { AffiliationTable } from '@containers';
import { adminAPI, AffiliationListItem } from '@api';

export const getServerSideProps = async () => {
  const result = await adminAPI.readAffiliationDataAll();

  if ('errors' in result) return { props: { data: [] }};
  return { props: { data: addIdIndexToTableData(result.allPartnershipList) }};
};

const Component = ({ data }: { data: AffiliationListItem[]; }) => {
  return (
    <AdminScreen>
      <AffiliationTable data={data} />
    </AdminScreen>
  );
};

export default Component