import { useCallback, useState } from 'react';
import type { GetServerSideProps } from 'next'
import styled from 'styled-components';
import { AdminScreen } from '@layouts';
import { FAQComponent, SearchBar } from '@containers';
import { BodyHeader, ScreenSubtitle, ScreenTitle } from '@components';
import { COLORS, SVGS } from '@resources';
import { contentAPI, FAQListItem } from '@api';

export const getServerSideProps: GetServerSideProps<{ FAQList: FAQListItem[] }> = async () => {
  const result = await contentAPI.readFAQList({ targetType: 'partner' });

  if ('errors' in result) return { props: { FAQList: [] }};
  return { props: { FAQList: result.FAQList }};
};

const Component = ({ FAQList }: { FAQList: FAQListItem[]; }) => {
  const [selectedId, setSelectedId] = useState<number>(-1);
  const updateSelectedId = useCallback((id: number) => () => setSelectedId(prev => prev === id ? -1 : id), [setSelectedId]);
  return (
    <AdminScreen>
      <BodyHeader>
        <SVGS.NAV_BAR_ICON_HELP fill={COLORS.main} />
        <ScreenTitle customStyle="margin: 0px 0px 0px 10px;">FAQ 관리</ScreenTitle>
        <ScreenSubtitle>기업</ScreenSubtitle>
      </BodyHeader>
      <SearchBar style="margin: 40px 0px;" />

      <FAQWrapper>
      {
        FAQList.map(faq =>
          <FAQComponent
            key={String(faq.faqId)}
            data={faq}
            isSelected={faq.faqId === selectedId}
            onClick={updateSelectedId(faq.faqId)}
          />
        )
      }
      </FAQWrapper>
    </AdminScreen>
  );
};

const FAQWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Component