import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import styled from 'styled-components';
import { AdminScreen } from '@layouts';
import { addIdIndexToTableData, COLORS } from '@resources';
import { UserTable } from '@containers';
import { adminAPI, WorkerThanksPayListItem } from '@api';

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const result = await adminAPI.readWorkerDataAll();

  if ('errors' in result) return { props: { data: [] }};
  return { props: { data: addIdIndexToTableData(result.allWorkerList) }};
};

const Component = ({ data }: { data: WorkerThanksPayListItem[]; }) => {
  return (
    <AdminScreen>
      <UserTable data={data} />
    </AdminScreen>
  );
};

export default Component