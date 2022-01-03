import type { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import styled from 'styled-components';
import { AdminScreen } from '@layouts';
import { addIdIndexToTableData, COLORS, getCurrentYearMonth } from '@resources';
import { MonthlyHistoryTable } from '@containers';
import { adminAPI, PartnerThanksPayListItem } from '@api';

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const result = await adminAPI.readPartnerThanksPayAll({ yearMonth: String(query.yearMonth || getCurrentYearMonth())});

  if ('errors' in result) return { props: { data: [] }};
  return { props: { data: addIdIndexToTableData(result.thanksPayListAllPartner) }};
};

const Component = ({ data }: { data: PartnerThanksPayListItem[]; }) => {
  return (
    <AdminScreen>
      <MonthlyHistoryTable data={data} />
    </AdminScreen>
  );
};

export default Component