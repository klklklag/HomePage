import type { NextPage } from 'next'
import styled from 'styled-components';
import { AdminScreen } from '@layouts';
import { addIdIndexToTableData, COLORS, SVGS } from '@resources';
import { SearchBar, TermTable } from '@containers';
import { BodyHeader, RectButton, ScreenSubtitle, ScreenTitle } from '@components';
import { contentAPI, TermListItem } from '@api';

export const getServerSideProps = async () => {
  const result = await contentAPI.readTermList({ targetType: 'worker', type: 'all' });
  if ('errors' in result) {
    return { props: { data: [] } };
  }
  
  const list: TermListItem[] =
    (result?.requiredTerms || []).concat(result?.optionalTerms || []);
  return { props: { data: addIdIndexToTableData(list) } };
}

const Component = ({ data }: { data: TermListItem[] }) => {
  return (
    <AdminScreen>
      <BodyHeader>
        <SVGS.NAV_BAR_ICON_SELIS fill={COLORS.main} />
        <ScreenTitle customStyle="margin: 0px 0px 0px 10px;">약관 관리</ScreenTitle>
        <ScreenSubtitle>근로자</ScreenSubtitle>
      </BodyHeader>
      <Row>
        <SearchBar />
        <RectButton>약관 등록</RectButton>
      </Row>
      <TermTable data={data} />
    </AdminScreen>
  );
};

const Row = styled.div`
  margin: 40px 0px;

  display: flex;
  align-items: center;
`;

export default Component