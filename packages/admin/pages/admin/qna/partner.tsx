import type { NextPage } from 'next'
import styled from 'styled-components';
import { AdminScreen } from '@layouts';
import { addIdIndexToTableData, COLORS, SVGS } from '@resources';
import { QnATable, SearchBar } from '@containers';
import { BodyHeader, RectButton, ScreenSubtitle, ScreenTitle } from '@components';
import { contentAPI, QnAListItem } from '@api';

export const getServerSideProps = async () => {
  const result = await contentAPI.readQnAList({ targetType: 'partner' });
  if ('errors' in result) {
    return { props: { data: [] } };
  }
  
  return { props: { data: addIdIndexToTableData(result.QnAList) } };
}

const Component = ({ data }: { data: QnAListItem[] }) => {
  return (
    <AdminScreen>
      <BodyHeader>
        <SVGS.NAV_BAR_ICON_QNA fill={COLORS.main} />
        <ScreenTitle customStyle="margin: 0px 0px 0px 10px;">QnA 관리</ScreenTitle>
        <ScreenSubtitle>기업</ScreenSubtitle>
      </BodyHeader>
      <Row>
        <SearchBar />
        <RectButton>질문 등록</RectButton>
      </Row>
      <QnATable data={data} />
    </AdminScreen>
  );
};

const Row = styled.div`
  margin: 40px 0px;

  display: flex;
  align-items: center;
`;

export default Component